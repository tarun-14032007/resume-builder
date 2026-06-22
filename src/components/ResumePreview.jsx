import { useRef, useState } from 'react'
import { downloadResumeAsPDF } from '../utils/downloadPDF'
import ClassicTemplate   from './templates/ClassicTemplate'
import ModernTemplate    from './templates/ModernTemplate'
import MinimalTemplate   from './templates/MinimalTemplate'
import DeveloperTemplate from './templates/DeveloperTemplate'
import CorporateTemplate from './templates/CorporateTemplate'
import StudentTemplate   from './templates/StudentTemplate'

const TEMPLATE_MAP = {
  classic:   ClassicTemplate,
  modern:    ModernTemplate,
  minimal:   MinimalTemplate,
  developer: DeveloperTemplate,
  corporate: CorporateTemplate,
  student:   StudentTemplate,
}

const ATS_NOTES = {
  classic:   { ok: true,  text: 'ATS Friendly ✓'        },
  modern:    { ok: false, text: 'Sidebar may skip ATS ⚠' },
  minimal:   { ok: true,  text: 'ATS Friendly ✓'        },
  developer: { ok: true,  text: 'ATS Friendly ✓'        },
  corporate: { ok: false, text: 'Sidebar may skip ATS ⚠' },
  student:   { ok: true,  text: 'ATS Friendly ✓'        },
}

function ResumePreview({ data, template }) {
  const pageRef    = useRef(null)
  const [loading, setLoading] = useState(false)

  const hasContent   = data.name || data.email || data.phone
  const TemplateComp = TEMPLATE_MAP[template] || ClassicTemplate
  const ats          = ATS_NOTES[template]

  async function handleDownload() {
    setLoading(true)
    await downloadResumeAsPDF(pageRef)
    setLoading(false)
  }

  return (
    <div className="preview-panel">
      <div className="preview-toolbar">
        <span className={`ats-badge ${ats.ok ? 'ats-ok' : 'ats-warn'}`}>
          {ats.text}
        </span>

        <button
          className="download-btn"
          disabled={!hasContent || loading}
          title={!hasContent ? 'Fill in your name first' : 'Download as PDF'}
          onClick={handleDownload}
        >
          {loading ? (
            <>
              <span className="download-spinner" />
              Generating...
            </>
          ) : (
            '⬇ Download PDF'
          )}
        </button>
      </div>

      <div className="preview-scroll">
        {!hasContent ? (
          <div className="preview-empty">
            <div className="preview-empty-icon">📝</div>
            <p>Start filling in the form to see your resume</p>
          </div>
        ) : (
          <div ref={pageRef} className="resume-page">
            <TemplateComp data={data} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview
