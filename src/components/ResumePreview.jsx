import { useRef } from 'react'
import { downloadResumeAsPDF } from '../utils/downloadPDF'
import ClassicTemplate   from './templates/ClassicTemplate'
import ModernTemplate    from './templates/ModernTemplate'
import MinimalTemplate   from './templates/MinimalTemplate'
import DeveloperTemplate from './templates/DeveloperTemplate'

// Map template ID → component
const TEMPLATE_MAP = {
  classic:   ClassicTemplate,
  modern:    ModernTemplate,
  minimal:   MinimalTemplate,
  developer: DeveloperTemplate,
}

// ATS note per template
const ATS_BADGE = {
  classic:   { ok: true,  text: 'ATS Friendly ✓'        },
  modern:    { ok: false, text: 'Sidebar may skip ATS ⚠' },
  minimal:   { ok: true,  text: 'ATS Friendly ✓'        },
  developer: { ok: true,  text: 'ATS Friendly ✓'        },
}

function ResumePreview({ data, template }) {
  const pageRef = useRef(null)

  const hasContent  = data.name || data.email || data.phone
  const TemplateComp = TEMPLATE_MAP[template] || ClassicTemplate
  const atsBadge    = ATS_BADGE[template]

  return (
    <div className="preview-panel">
      {/* ── Toolbar ── */}
      <div className="preview-toolbar">
        <span className={`ats-badge ${atsBadge.ok ? 'ats-ok' : 'ats-warn'}`}>
          {atsBadge.text}
        </span>

        <button
          className="download-btn"
          disabled={!hasContent}
          title={!hasContent ? 'Fill in your name first' : 'Download as PDF'}
          onClick={() => downloadResumeAsPDF(pageRef)}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* ── Scrollable area around the A4 page ── */}
      <div className="preview-scroll">
        {!hasContent ? (
          <div className="preview-empty">
            <p>Start filling in the form to see your resume here ✨</p>
          </div>
        ) : (
          /*
           * .resume-page is exactly 794 × min-1123 px (A4 at 96 dpi).
           * html2canvas captures only this div, so the PDF always looks
           * like a real A4 sheet — no UI chrome bleeds in.
           */
          <div ref={pageRef} className="resume-page">
            <TemplateComp data={data} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview
