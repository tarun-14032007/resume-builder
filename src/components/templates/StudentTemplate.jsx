import { LINK_META } from './ClassicTemplate'

function StudentTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="student">
      <header className="st-header">
        <div className="st-top-row">
          {data.photo && (
            <img src={data.photo} alt="Profile" className="st-photo" />
          )}
          <div>
            <h1 className="st-name">{data.name}</h1>
            {data.jobTitle && <p className="st-title">{data.jobTitle}</p>}
          </div>
        </div>

        <div className="st-contact-row">
          {data.email && (
            <span className="st-contact-item">📧 {data.email}</span>
          )}
          {data.email && data.phone && <span className="st-dot">·</span>}
          {data.phone && (
            <span className="st-contact-item">📱 {data.phone}</span>
          )}
          {filledLinks.map(([key, url]) => (
            <a key={key} href={url} className="st-contact-link" target="_blank" rel="noreferrer">
              {LINK_META[key].icon} {LINK_META[key].label}
            </a>
          ))}
        </div>
      </header>

      <div className="st-rule" />

      {/* Education first — that's the whole point of this template */}
      {data.education && (
        <section className="st-section">
          <h2 className="st-heading">Education</h2>
          <div className="st-edu-card">
            <p className="st-edu-title">{data.education}</p>
          </div>
        </section>
      )}

      {data.summary && (
        <section className="st-section">
          <h2 className="st-heading">About Me</h2>
          <p className="st-para">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="st-section">
          <h2 className="st-heading">Skills</h2>
          <div className="st-skills">
            {data.skills.map((s, i) => (
              <span key={i} className="st-skill-chip">{s}</span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="st-section">
          <h2 className="st-heading">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="st-entry">
              <div className="st-entry-top">
                <strong className="st-entry-company">{proj.name}</strong>
              </div>
              {proj.techStack && (
                <div className="st-tech-row">
                  {proj.techStack.split(',').map(t => (
                    <span key={t} className="st-tech-chip">{t.trim()}</span>
                  ))}
                </div>
              )}
              {proj.description && <p className="st-para">{proj.description}</p>}
              <div className="st-entry-links">
                {proj.githubLink && (
                  <a href={proj.githubLink} className="st-entry-link" target="_blank" rel="noreferrer">
                    🐙 GitHub
                  </a>
                )}
                {proj.liveLink && (
                  <a href={proj.liveLink} className="st-entry-link" target="_blank" rel="noreferrer">
                    🌐 Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="st-section">
          <h2 className="st-heading">Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="st-entry">
              <div className="st-entry-top">
                <strong className="st-entry-company">{exp.company}</strong>
                {exp.duration && <span className="st-entry-date">{exp.duration}</span>}
              </div>
              {exp.role        && <p className="st-entry-role">{exp.role}</p>}
              {exp.description && <p className="st-para">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.filter(c => c.name).length > 0 && (
        <section className="st-section">
          <h2 className="st-heading">Certifications</h2>
          <ul className="st-cert-list">
            {data.certifications.filter(c => c.name).map(c => (
              <li key={c.id}>
                {c.name}
                {(c.issuer || c.year) && (
                  <span className="st-cert-meta"> · {[c.issuer, c.year].filter(Boolean).join(', ')}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default StudentTemplate
