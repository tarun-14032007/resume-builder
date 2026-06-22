// Icon + display-name for each platform
const PLATFORMS = [
  { key: 'linkedin',  icon: '🔗', label: 'LinkedIn',  placeholder: 'https://linkedin.com/in/username' },
  { key: 'github',    icon: '🐙', label: 'GitHub',    placeholder: 'https://github.com/username'      },
  { key: 'portfolio', icon: '🌐', label: 'Portfolio', placeholder: 'https://yoursite.com'             },
]

function LinksForm({ links, onUpdate }) {
  return (
    <div className="form-section">
      <h3 className="form-section-label">Links</h3>

      {PLATFORMS.map(({ key, icon, label, placeholder }) => (
        <div className="form-group" key={key}>
          <label htmlFor={`link-${key}`}>
            {icon} {label}
          </label>
          <input
            id={`link-${key}`}
            type="url"
            placeholder={placeholder}
            value={links[key]}
            onChange={e => onUpdate(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

export default LinksForm
