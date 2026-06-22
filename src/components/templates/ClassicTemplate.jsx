// ── Shared link metadata used across all templates ───────────
export const LINK_META = {
  linkedin:  { icon: '🔗', label: 'LinkedIn'  },
  github:    { icon: '🐙', label: 'GitHub'    },
  portfolio: { icon: '🌐', label: 'Portfolio' },
}

// ── Classic Template ─────────────────────────────────────────
// Traditional one-column resume.
// • Name is large and centered
// • Contact info and links in a centered row underneath
// • ALL-CAPS section headings with a thin bottom border
// • Skills displayed as "React · Node.js · Python" inline text
function ClassicTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="classic">
      {/* ── Header ── */}
      <header className="cl-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="cl-photo" />
        )}
        <h1 className="cl-name">{data.name}</h1>
        {data.jobTitle && <p className="cl-job-title">{data.jobTitle}</p>}

        <div className="cl-contact">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="cl-dot">·</span>}
          {data.phone && <span>{data.phone}</span>}
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

      {/* ── About ── */}
      {data.summary && (
        <section className="cl-section">
          <h2 className="cl-heading">About Me</h2>
          <p className="cl-para">{data.summary}</p>
        </section>
      )}

      {/* ── Education ── */}
      {data.education && (
        <section className="cl-section">
          <h2 className="cl-heading">Education</h2>
          <p className="cl-para">{data.education}</p>
        </section>
      )}

      {/* ── Skills ── */}
      {data.skills.length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Skills</h2>
          <p className="cl-para cl-skills-inline">
            {data.skills.join(' · ')}
          </p>
        </section>
      )}

      {/* ── Experience ── */}
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

      {/* ── Projects ── */}
      {data.projects.length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="cl-entry">
              <div className="cl-entry-top">
                <strong className="cl-entry-company">{proj.name}</strong>
                {proj.githubLink && (
                  <a href={proj.githubLink} className="cl-entry-link"
                     target="_blank" rel="noreferrer">GitHub ↗</a>
                )}
              </div>
              {proj.techStack   && <p className="cl-entry-role">{proj.techStack}</p>}
              {proj.description && <p className="cl-para">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── Certifications ── */}
      {data.certifications.filter(Boolean).length > 0 && (
        <section className="cl-section">
          <h2 className="cl-heading">Certifications</h2>
          <ul className="cl-cert-list">
            {data.certifications.filter(Boolean).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate
