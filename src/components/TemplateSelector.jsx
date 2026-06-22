// Visual descriptions help recruiters understand what they're picking
const TEMPLATES = [
  {
    id: 'classic',
    label: 'Classic',
    desc: 'Centered header · Serif name · Single column',
    preview: '≡',
  },
  {
    id: 'modern',
    label: 'Modern',
    desc: 'Colored sidebar · Two-column · Bold header',
    preview: '▐',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    desc: 'Lots of whitespace · Thin dividers · Clean',
    preview: '─',
  },
  {
    id: 'developer',
    label: 'Developer',
    desc: 'GitHub style · Code chips · Tech-forward',
    preview: '</>',
  },
]

function TemplateSelector({ active, onChange }) {
  return (
    <div className="template-selector">
      {TEMPLATES.map(t => (
        <button
          key={t.id}
          className={`template-card ${active === t.id ? 'template-card-active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="template-preview-icon">{t.preview}</span>
          <span className="template-card-label">{t.label}</span>
          <span className="template-card-desc">{t.desc}</span>
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector
