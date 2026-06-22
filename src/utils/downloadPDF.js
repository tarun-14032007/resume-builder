import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function downloadResumeAsPDF(previewRef, filename = 'resume.pdf') {
  const el = previewRef.current
  if (!el) return

  // Force white background so dark-mode UI doesn't bleed into the PDF
  const originalBg = el.style.background
  el.style.background = '#ffffff'

  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794,
      onclone: (doc) => {
        // Make sure the cloned element is also white
        const clonedEl = doc.querySelector('.resume-page')
        if (clonedEl) clonedEl.style.background = '#ffffff'
      },
    })

    const pdf   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()   // 210mm
    const pageH = pdf.internal.pageSize.getHeight()  // 297mm

    const ratio     = pageW / canvas.width
    const totalImgH = canvas.height * ratio

    let yOffsetMm = 0

    while (yOffsetMm < totalImgH) {
      const sliceH  = Math.min(pageH, totalImgH - yOffsetMm)
      const slicePx = sliceH / ratio

      const strip = document.createElement('canvas')
      strip.width  = canvas.width
      strip.height = Math.ceil(slicePx)

      const ctx = strip.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, strip.width, strip.height)
      ctx.drawImage(canvas, 0, -(yOffsetMm / ratio))

      if (yOffsetMm > 0) pdf.addPage()
      pdf.addImage(strip.toDataURL('image/png'), 'PNG', 0, 0, pageW, sliceH)

      yOffsetMm += sliceH
    }

    pdf.save(filename)
  } catch (err) {
    console.error('PDF export failed:', err)
    alert('Could not generate PDF. Please try again.')
  } finally {
    el.style.background = originalBg
  }
}
