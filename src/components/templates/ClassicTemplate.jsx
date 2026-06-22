export const LINK_META = {
  linkedin:  { icon: '🔗', label: 'LinkedIn'  },
  github:    { icon: '🐙', label: 'GitHub'    },
  portfolio: { icon: '🌐', label: 'Portfolio' },
}

function ClassicTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="classic">
      <header className="cl-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="cl-photo" />
        )}
        <h1 className="cl-name">{data.name}</h1>
        {data.jobTitle && <p className="cl-job-title">{data.jobTitle}</p>}

        <div className="cl-contact">
          {data.email && (
            <span className="cl-contact-item">📧 {data.email}</span>
          )}
          {data.email && data.phone && <span className="cl-dot">·</span>}
          {data.phone && (
            <span className="cl-contact-item">📱 {data.phone}</span>
          )}
        </div>

        {filledLinks.length > 0 && (
          <div className="cl-links">
            {filledLinks.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer">
                {LINK_META[key].icon} {LINK_META[key].label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="cl-rule" />

      {data.summary && (
        <section className="cl-section">
          <h2 className="cl-heading">About Me</h2>
          <p className="cl-para">{data.summary}</p>
        </section>
      )}

      {data.education && (
        <section className="cl-section">
          <h2 className="cl-heading">Education</h2>
          <p className="cl-para">{data.education}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Skills</h2>
          <div className="cl-skills">
            {data.skills.map((s, i) => (
              <span key={i} className="cl-skill-chip">{s}</span>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="cl-entry">
              <div className="cl-entry-top">
                <strong className="cl-entry-company">{exp.company}</strong>
                {exp.duration && <span className="cl-entry-date">{exp.duration}</span>}
              </div>
              {exp.role        && <p className="cl-entry-role">{exp.role}</p>}
              {exp.description && <p className="cl-para">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="cl-entry">
              <div className="cl-entry-top">
                <strong className="cl-entry-company">{proj.name}</strong>
              </div>
              {proj.techStack && (
                <div className="cl-tech-row">
                  {proj.techStack.split(',').map(t => (
                    <span key={t} className="cl-tech-chip">{t.trim()}</span>
                  ))}
                </div>
              )}
              {proj.description && <p className="cl-para">{proj.description}</p>}
              <div className="cl-entry-links">
                {proj.githubLink && (
                  <a href={proj.githubLink} className="cl-entry-link" target="_blank" rel="noreferrer">
                    🐙 GitHub
                  </a>
                )}
                {proj.liveLink && (
                  <a href={proj.liveLink} className="cl-entry-link" target="_blank" rel="noreferrer">
                    🌐 Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.certifications.filter(c => c.name).length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Certifications</h2>
          <ul className="cl-cert-list">
            {data.certifications.filter(c => c.name).map(c => (
              <li key={c.id}>
                <span>{c.name}</span>
                {(c.issuer || c.year) && (
                  <span className="cl-cert-meta"> — {[c.issuer, c.year].filter(Boolean).join(', ')}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate
