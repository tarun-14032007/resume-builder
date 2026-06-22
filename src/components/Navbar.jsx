const TEMPLATES = [
  { id: 'classic',   label: 'Classic'   },
  { id: 'modern',    label: 'Modern'    },
  { id: 'minimal',   label: 'Minimal'   },
  { id: 'developer', label: 'Developer' },
]

function Navbar({ activeTemplate, onTemplateChange, theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <span className="brand-icon">📄</span>
        <span className="brand-name">ResumeForge</span>
      </div>

      {/* Template switcher — each button is visually distinct when active */}
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

      {/* Dark / Light toggle */}
      <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  )
}

export default Navbar
