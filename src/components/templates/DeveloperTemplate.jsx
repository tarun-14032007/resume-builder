import { LINK_META } from './ClassicTemplate'

// ── Developer Template ───────────────────────────────────────
// GitHub README aesthetic — designed to appeal to technical recruiters.
// • Name is bold sans-serif with a horizontal rule below
// • Section headings styled like `## Heading` with a code-bar accent
// • Skills displayed as `chip` backtick-style tags
// • Each experience / project entry prefixed with a ▶ arrow
// • Tech stacks in a monospace pill row
function DeveloperTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="developer">
      {/* ── Header ── */}
      <header className="dv-header">
        <div className="dv-header-left">
          {data.photo && (
            <img src={data.photo} alt="Profile" className="dv-photo" />
          )}
          <div>
            <h1 className="dv-name">{data.name}</h1>
            {data.jobTitle && (
              <p className="dv-title">
                <span className="dv-prompt">&gt;</span> {data.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contact row */}
        <div className="dv-contact">
          {data.email && (
            <span className="dv-contact-item">✉ {data.email}</span>
          )}
          {data.phone && (
            <span className="dv-contact-item">📱 {data.phone}</span>
          )}
          {filledLinks.map(([key, url]) => (
            <a key={key} href={url} className="dv-contact-link"
               target="_blank" rel="noreferrer">
              {LINK_META[key].icon} {LINK_META[key].label}
            </a>
          ))}
        </div>
      </header>

      <div className="dv-rule" />

      {/* ── About ── */}
      {data.summary && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> About</h2>
          <p className="dv-para">{data.summary}</p>
        </section>
      )}

      {/* ── Skills ── */}
      {data.skills.length > 0 && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> Skills</h2>
          <div className="dv-skills">
            {data.skills.map((s, i) => (
              <code key={i} className="dv-skill-chip">{s}</code>
            ))}
          </div>
        </section>
      )}

      {/* ── Experience ── */}
      {data.experience.length > 0 && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="dv-entry">
              <div className="dv-entry-top">
                <span className="dv-entry-company">
                  <span className="dv-arrow">▶</span> {exp.company}
                </span>
                {exp.duration && (
                  <code className="dv-entry-date">{exp.duration}</code>
                )}
              </div>
              {exp.role        && <p className="dv-entry-role">{exp.role}</p>}
              {exp.description && <p className="dv-para">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── Projects ── */}
      {data.projects.length > 0 && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="dv-entry">
              <div className="dv-entry-top">
                <span className="dv-entry-company">
                  <span className="dv-arrow">▶</span> {proj.name}
                </span>
                {proj.githubLink && (
                  <a href={proj.githubLink} className="dv-entry-link"
                     target="_blank" rel="noreferrer">↗ GitHub</a>
                )}
              </div>
              {proj.techStack && (
                <div className="dv-tech-row">
                  {proj.techStack.split(',').map(t => (
                    <code key={t} className="dv-tech-chip">{t.trim()}</code>
                  ))}
                </div>
              )}
              {proj.description && <p className="dv-para">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── Education ── */}
      {data.education && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> Education</h2>
          <p className="dv-para">{data.education}</p>
        </section>
      )}

      {/* ── Certifications ── */}
      {data.certifications.filter(Boolean).length > 0 && (
        <section className="dv-section">
          <h2 className="dv-heading"><span className="dv-hash">##</span> Certifications</h2>
          <ul className="dv-cert-list">
            {data.certifications.filter(Boolean).map((c, i) => (
              <li key={i}><span className="dv-cert-check">✓</span> {c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default DeveloperTemplate
