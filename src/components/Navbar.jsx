const TEMPLATES = [
  { id: 'classic',   label: 'Classic'   },
  { id: 'modern',    label: 'Modern'    },
  { id: 'minimal',   label: 'Minimal'   },
  { id: 'developer', label: 'Dev'       },
  { id: 'corporate', label: 'Corporate' },
  { id: 'student',   label: 'Student'   },
]

function Navbar({ activeTemplate, onTemplateChange, theme, onToggleTheme, savedAt }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">📄</span>
        <span className="brand-name">ResumeForge</span>
      </div>

      <div className="template-tabs">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${activeTemplate === t.id ? 'tab-active' : ''}`}
            onClick={() => onTemplateChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="navbar-controls">
        {savedAt && (
          <div className="save-indicator" title="Changes saved automatically">
            <div className="save-dot" />
            <span>Saved</span>
          </div>
        )}

        <button className="theme-toggle" onClick={onToggleTheme} title="Toggle dark/light mode">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
