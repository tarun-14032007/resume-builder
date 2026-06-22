import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Captures the resume page element and exports it as a proper A4 PDF.
 *
 * Key fixes over v2:
 *  - Forces white background so dark-mode UI doesn't bleed into PDF
 *  - Scales to scale:2 for crisp text on hi-dpi screens
 *  - Handles resumes taller than one A4 page by splitting into multiple pages
 */
export async function downloadResumeAsPDF(previewRef, filename = 'resume.pdf') {
  const el = previewRef.current
  if (!el) return

  try {
    // Capture at 2× for sharpness — the PDF renderer scales it back down
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      // Tell html2canvas the element is 794px wide (A4 at 96dpi)
      // even if the parent container is narrower on a small screen
      windowWidth: 794,
    })

    const pdf       = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageW     = pdf.internal.pageSize.getWidth()   // 210mm
    const pageH     = pdf.internal.pageSize.getHeight()  // 297mm

    // How many mm does the full canvas height convert to?
    const ratio     = pageW / canvas.width               // mm per pixel
    const totalImgH = canvas.height * ratio              // full image height in mm

    // Slice the canvas into A4-height chunks and add one PDF page per chunk
    let yOffsetMm = 0

    while (yOffsetMm < totalImgH) {
      const sliceH    = Math.min(pageH, totalImgH - yOffsetMm)  // mm this slice covers
      const slicePx   = sliceH / ratio                          // matching canvas pixels

      // Draw just this slice of the original canvas onto a temp canvas
      const strip     = document.createElement('canvas')
      strip.width     = canvas.width
      strip.height    = Math.ceil(slicePx)
      const ctx       = strip.getContext('2d')
      ctx.drawImage(canvas, 0, -(yOffsetMm / ratio))

      if (yOffsetMm > 0) pdf.addPage()
      pdf.addImage(strip.toDataURL('image/png'), 'PNG', 0, 0, pageW, sliceH)

      yOffsetMm += sliceH
    }

    pdf.save(filename)
  } catch (err) {
    console.error('PDF export failed:', err)
    alert('Could not generate PDF. Please try again.')
  }
}
