import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Grabs the preview div, turns it into a canvas, then saves as PDF.
// Using scale: 2 so the PDF doesn't look blurry on hi-res screens.
export async function downloadResumeAsPDF(previewRef, filename = 'my-resume.pdf') {
  const element = previewRef.current
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    })

    const imgData = canvas.toDataURL('image/png')

    // Standard A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = (canvas.height * pageWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight)
    pdf.save(filename)
  } catch (err) {
    console.error('PDF export failed:', err)
    alert('Could not generate PDF. Please try again.')
  }
}