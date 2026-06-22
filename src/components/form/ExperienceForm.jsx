function ExperienceForm({ experience, onAdd, onUpdate, onRemove }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3 className="form-section-label">Experience</h3>
        <button className="add-btn" onClick={onAdd}>+ Add</button>
      </div>

      {experience.map((exp, idx) => (
        <div key={exp.id} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-num">Entry {idx + 1}</span>
            <button className="remove-btn" onClick={() => onRemove(exp.id)}>Remove</button>
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              placeholder="e.g. Google"
              value={exp.company}
              onChange={e => onUpdate(exp.id, 'company', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              placeholder="e.g. Software Engineering Intern"
              value={exp.role}
              onChange={e => onUpdate(exp.id, 'role', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              placeholder="e.g. May 2025 – Jul 2025"
              value={exp.duration}
              onChange={e => onUpdate(exp.id, 'duration', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={2}
              placeholder="What did you work on?"
              value={exp.description}
              onChange={e => onUpdate(exp.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExperienceForm
