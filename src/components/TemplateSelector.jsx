// Available resume templates
const TEMPLATES = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern',  label: 'Modern'  },
  { id: 'minimal', label: 'Minimal' },
]

function TemplateSelector({ active, onChange }) {
  return (
    <div className="template-selector">
      <span className="selector-label">Template</span>

      {TEMPLATES.map(t => (
        <button
          key={t.id}
          className={`template-btn ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector