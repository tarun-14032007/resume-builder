import { LINK_META } from './ClassicTemplate'

function MinimalTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  const contactItems = [
    data.email && { label: data.email, icon: '📧' },
    data.phone && { label: data.phone, icon: '📱' },
    ...filledLinks.map(([k]) => ({ label: LINK_META[k].label, icon: LINK_META[k].icon })),
  ].filter(Boolean)

  return (
    <div className="minimal">
      <header className="mn-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="mn-photo" />
        )}
        <h1 className="mn-name">{data.name}</h1>
        {data.jobTitle && <p className="mn-title">{data.jobTitle}</p>}

        <div className="mn-contact">
          {contactItems.map((item, i) => (
            <span key={i} className="mn-contact-item">
              {item.icon} {item.label}
              {i < contactItems.length - 1 && <span className="mn-sep"> · </span>}
            </span>
          ))}
        </div>
      </header>

      {data.summary && (
        <section className="mn-section">
          <h2 className="mn-heading">Profile</h2>
          <p className="mn-para">{data.summary}</p>
        </section>
      )}

      {data.education && (
        <section className="mn-section">
          <h2 className="mn-heading">Education</h2>
          <p className="mn-para">{data.education}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mn-section">
          <h2 className="mn-heading">Skills</h2>
          <div className="mn-skills">
            {data.skills.map((s, i) => (
              <span key={i} className="mn-skill-chip">{s}</span>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mn-section">
          <h2 className="mn-heading">Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mn-entry">
              <div className="mn-entry-top">
                <span className="mn-entry-company">{exp.company}</span>
                {exp.duration && <span className="mn-entry-date">{exp.duration}</span>}
              </div>
              {exp.role        && <p className="mn-entry-role">{exp.role}</p>}
              {exp.description && <p className="mn-para">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mn-section">
          <h2 className="mn-heading">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="mn-entry">
              <div className="mn-entry-top">
                <span className="mn-entry-company">{proj.name}</span>
              </div>
              {proj.techStack && (
                <div className="mn-tech-row">
                  {proj.techStack.split(',').map(t => (
                    <span key={t} className="mn-tech-chip">{t.trim()}</span>
                  ))}
                </div>
              )}
              {proj.description && <p className="mn-para">{proj.description}</p>}
              <div className="mn-entry-links">
                {proj.githubLink && (
                  <a href={proj.githubLink} className="mn-entry-link" target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
                {proj.liveLink && (
                  <a href={proj.liveLink} className="mn-entry-link" target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.certifications.filter(c => c.name).length > 0 && (
        <section className="mn-section">
          <h2 className="mn-heading">Certifications</h2>
          <ul className="mn-cert-list">
            {data.certifications.filter(c => c.name).map(c => (
              <li key={c.id}>
                {c.name}
                {(c.issuer || c.year) && (
                  <span className="mn-cert-meta"> · {[c.issuer, c.year].filter(Boolean).join(', ')}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default MinimalTemplate
