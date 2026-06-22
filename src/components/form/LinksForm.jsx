import { useState } from 'react'

const PLATFORMS = [
  { key: 'linkedin',  icon: '🔗', label: 'LinkedIn',  placeholder: 'https://linkedin.com/in/username' },
  { key: 'github',    icon: '🐙', label: 'GitHub',    placeholder: 'https://github.com/username'      },
  { key: 'portfolio', icon: '🌐', label: 'Portfolio', placeholder: 'https://yoursite.com'             },
]

function isValidUrl(val) {
  if (!val) return true
  try {
    new URL(val)
    return true
  } catch {
    return false
  }
}

function LinksForm({ links, onUpdate }) {
  const [touched, setTouched] = useState({})

  function touch(key) {
    setTouched(prev => ({ ...prev, [key]: true }))
  }

  return (
    <div className="form-section">
      <h3 className="form-section-label" style={{ marginBottom: '10px' }}>Links</h3>

      {PLATFORMS.map(({ key, icon, label, placeholder }) => {
        const invalid = touched[key] && !isValidUrl(links[key])
        return (
          <div className={`form-group ${invalid ? 'has-error' : ''}`} key={key}>
            <label htmlFor={`link-${key}`}>{icon} {label}</label>
            <input
              id={`link-${key}`}
              type="url"
              placeholder={placeholder}
              value={links[key]}
              onChange={e => onUpdate(key, e.target.value)}
              onBlur={() => touch(key)}
            />
            {invalid && (
              <span className="field-error">Enter a valid URL (include https://)</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default LinksForm
