import { LINK_META } from './ClassicTemplate'

// ── Minimal Template ─────────────────────────────────────────
// Ultra-clean. Lots of breathing room.
// • Name is large and light-weight (font-weight 300)
// • No color anywhere — black, white, and one thin accent rule
// • Section headings are small, spaced, upper-case with a thin line
// • Skills as outlined chips (no fill, just a border)
// • Each experience / project is spaced apart so it breathes
function MinimalTemplate({ data }) {
  const filledLinks = Object.entries(data.links).filter(([, url]) => url)

  return (
    <div className="minimal">
      {/* ── Header ── */}
      <header className="mn-header">
        {data.photo && (
          <img src={data.photo} alt="Profile" className="mn-photo" />
        )}
        <h1 className="mn-name">{data.name}</h1>
        {data.jobTitle && <p className="mn-title">{data.jobTitle}</p>}

        <div className="mn-contact">
          {[data.email, data.phone, ...filledLinks.map(([k]) => LINK_META[k].label)]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i} className="mn-contact-item">
                {item}
                {i < arr.length - 1 && <span className="mn-sep"> · </span>}
              </span>
            ))
          }
        </div>
      </header>

      {/* ── Sections ── */}
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
                {proj.githubLink && (
                  <a href={proj.githubLink} className="mn-entry-link"
                     target="_blank" rel="noreferrer">↗ View</a>
                )}
              </div>
              {proj.techStack   && <p className="mn-entry-role">{proj.techStack}</p>}
              {proj.description && <p className="mn-para">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.filter(Boolean).length > 0 && (
        <section className="mn-section">
          <h2 className="mn-heading">Certifications</h2>
          <ul className="mn-cert-list">
            {data.certifications.filter(Boolean).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default MinimalTemplate
