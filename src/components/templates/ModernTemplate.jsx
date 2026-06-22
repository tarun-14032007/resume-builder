import { LINK_META } from './ClassicTemplate'

function ModernTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="modern">
      <header className="mo-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="mo-photo" />
        )}
        <div>
          <h1 className="mo-name">{data.name}</h1>
          {data.jobTitle && <p className="mo-title">{data.jobTitle}</p>}
        </div>
      </header>

      <div className="mo-body">
        <aside className="mo-sidebar">
          <div className="mo-sb-section">
            <h3 className="mo-sb-heading">Contact</h3>
            {data.email && (
              <p className="mo-sb-item">📧 {data.email}</p>
            )}
            {data.phone && (
              <p className="mo-sb-item">📱 {data.phone}</p>
            )}
          </div>

          {filledLinks.length > 0 && (
            <div className="mo-sb-section">
              <h3 className="mo-sb-heading">Links</h3>
              {filledLinks.map(([key, url]) => (
                <a key={key} href={url} className="mo-sb-link" target="_blank" rel="noreferrer">
                  {LINK_META[key].icon} {LINK_META[key].label}
                </a>
              ))}
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="mo-sb-section">
              <h3 className="mo-sb-heading">Skills</h3>
              <div className="mo-skills">
                {data.skills.map((s, i) => (
                  <span key={i} className="mo-skill-chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div className="mo-sb-section">
              <h3 className="mo-sb-heading">Education</h3>
              <p className="mo-sb-item">{data.education}</p>
            </div>
          )}
        </aside>

        <main className="mo-main">
          {data.summary && (
            <section className="mo-section">
              <h2 className="mo-heading">About Me</h2>
              <p className="mo-para">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mo-section">
              <h2 className="mo-heading">Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mo-entry">
                  <div className="mo-entry-top">
                    <strong className="mo-entry-company">{exp.company}</strong>
                    {exp.duration && <span className="mo-entry-date">{exp.duration}</span>}
                  </div>
                  {exp.role        && <p className="mo-entry-role">{exp.role}</p>}
                  {exp.description && <p className="mo-para">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="mo-section">
              <h2 className="mo-heading">Projects</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="mo-entry">
                  <div className="mo-entry-top">
                    <strong className="mo-entry-company">{proj.name}</strong>
                  </div>
                  {proj.techStack && (
                    <div className="mo-tech-row">
                      {proj.techStack.split(',').map(t => (
                        <span key={t} className="mo-tech-chip">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && <p className="mo-para">{proj.description}</p>}
                  <div className="mo-entry-links">
                    {proj.githubLink && (
                      <a href={proj.githubLink} className="mo-entry-link" target="_blank" rel="noreferrer">
                        🐙 GitHub
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={proj.liveLink} className="mo-entry-link" target="_blank" rel="noreferrer">
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {data.certifications.filter(c => c.name).length > 0 && (
            <section className="mo-section">
              <h2 className="mo-heading">Certifications</h2>
              <ul className="mo-cert-list">
                {data.certifications.filter(c => c.name).map(c => (
                  <li key={c.id}>
                    {c.name}
                    {(c.issuer || c.year) && (
                      <span className="mo-cert-meta"> — {[c.issuer, c.year].filter(Boolean).join(', ')}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default ModernTemplate
