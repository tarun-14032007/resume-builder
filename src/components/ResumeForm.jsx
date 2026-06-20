function ResumeForm({ data, onChange }) {
  return (
    <div className="form-panel">
      <h2 className="panel-title">Your Details</h2>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Tarun TS"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="e.g. tarun@gmail.com"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. 9876543210"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="education">Education</label>
        <textarea
          id="education"
          rows={3}
          placeholder="e.g. B.Tech CSE — VIT Vellore (2021–2025)"
          value={data.education}
          onChange={e => onChange('education', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="skills">
          Skills <span className="hint">(comma separated)</span>
        </label>
        <textarea
          id="skills"
          rows={3}
          placeholder="e.g. React, JavaScript, C++, Node.js"
          value={data.skills}
          onChange={e => onChange('skills', e.target.value)}
        />
      </div>
    </div>
  )
}

export default ResumeForm