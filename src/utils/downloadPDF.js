import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Export the resume preview section as a downloadable A4 PDF
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