import { useRef } from 'react'
import { downloadResumeAsPDF } from '../utils/downloadPDF'

function ResumePreview({ data, template }) {
  const previewRef = useRef(null)

  // Turn the skills string into a proper array, dropping any empty entries
  const skillList = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : []

  // Don't show the download button until the user has typed something
  const hasContent = data.name || data.email || data.phone

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2 className="panel-title">Live Preview</h2>
        <button
          className="download-btn"
          disabled={!hasContent}
          title={!hasContent ? 'Add your name first to enable download' : 'Download as PDF'}
          onClick={() => downloadResumeAsPDF(previewRef)}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* This div is what gets captured and exported as a PDF */}
      <div ref={previewRef} className={`resume-sheet template-${template}`}>
        {!hasContent ? (
          <p className="empty-state">
            Start typing on the left to see your resume here ✨
          </p>
        ) : (
          <>
            <div className="resume-header">
              {data.name && <h1 className="resume-name">{data.name}</h1>}
              <div className="resume-contact">
                {data.email && <span>{data.email}</span>}
                {data.email && data.phone && <span className="dot">·</span>}
                {data.phone && <span>{data.phone}</span>}
              </div>
            </div>

            {data.education && (
              <div className="resume-section">
                <h3 className="section-title">Education</h3>
                <p className="section-content">{data.education}</p>
              </div>
            )}

            {skillList.length > 0 && (
              <div className="resume-section">
                <h3 className="section-title">Skills</h3>
                <div className="skills-grid">
                  {skillList.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ResumePreview