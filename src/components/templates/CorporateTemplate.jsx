import { LINK_META } from './ClassicTemplate'

function CorporateTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="corporate">
      <header className="corp-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="corp-photo" />
        )}
        <div className="corp-header-text">
          <h1 className="corp-name">{data.name}</h1>
          {data.jobTitle && <p className="corp-title">{data.jobTitle}</p>}
          <div className="corp-contact-row">
            {data.email && (
              <span className="corp-contact-item">📧 {data.email}</span>
            )}
            {data.phone && (
              <span className="corp-contact-item">📱 {data.phone}</span>
            )}
            {filledLinks.map(([key, url]) => (
              <a key={key} href={url} className="corp-contact-link" target="_blank" rel="noreferrer">
                {LINK_META[key].icon} {LINK_META[key].label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="corp-body">
        <aside className="corp-sidebar">
          {data.education && (
            <div className="corp-sb-section">
              <h3 className="corp-sb-heading">Education</h3>
              <p className="corp-sb-para">{data.education}</p>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="corp-sb-section">
              <h3 className="corp-sb-heading">Skills</h3>
              <div className="corp-skills">
                {data.skills.map((s, i) => (
                  <span key={i} className="corp-skill-chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.certifications.filter(c => c.name).length > 0 && (
            <div className="corp-sb-section">
              <h3 className="corp-sb-heading">Certifications</h3>
              <ul className="corp-cert-list">
                {data.certifications.filter(c => c.name).map(c => (
                  <li key={c.id}>
                    {c.name}
                    {(c.issuer || c.year) && (
                      <span className="corp-cert-meta">
                        {[c.issuer, c.year].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main className="corp-main">
          {data.summary && (
            <section className="corp-section">
              <h2 className="corp-heading">Professional Summary</h2>
              <p className="corp-para">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="corp-section">
              <h2 className="corp-heading">Work Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="corp-entry">
                  <div className="corp-entry-top">
                    <strong className="corp-entry-company">{exp.company}</strong>
                    {exp.duration && <span className="corp-entry-date">{exp.duration}</span>}
                  </div>
                  {exp.role        && <p className="corp-entry-role">{exp.role}</p>}
                  {exp.description && <p className="corp-para">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="corp-section">
              <h2 className="corp-heading">Projects</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="corp-entry">
                  <div className="corp-entry-top">
                    <strong className="corp-entry-company">{proj.name}</strong>
                  </div>
                  {proj.techStack && (
                    <div className="corp-tech-row">
                      {proj.techStack.split(',').map(t => (
                        <span key={t} className="corp-tech-chip">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && <p className="corp-para">{proj.description}</p>}
                  <div className="corp-entry-links">
                    {proj.githubLink && (
                      <a href={proj.githubLink} className="corp-entry-link" target="_blank" rel="noreferrer">
                        GitHub ↗
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={proj.liveLink} className="corp-entry-link" target="_blank" rel="noreferrer">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default CorporateTemplate
