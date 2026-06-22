function ProjectsForm({ projects, onAdd, onUpdate, onRemove }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3 className="form-section-label">Projects</h3>
        <button className="add-btn" onClick={onAdd}>+ Add</button>
      </div>

      {projects.map((proj, idx) => (
        <div key={proj.id} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-num">Project {idx + 1}</span>
            <button className="remove-btn" onClick={() => onRemove(proj.id)}>Remove</button>
          </div>

          <div className="form-group">
            <label>Project Name</label>
            <input
              placeholder="e.g. ResumeForge"
              value={proj.name}
              onChange={e => onUpdate(proj.id, 'name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tech Stack</label>
            <input
              placeholder="e.g. React, Node.js, MongoDB"
              value={proj.techStack}
              onChange={e => onUpdate(proj.id, 'techStack', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={2}
              placeholder="What does it do?"
              value={proj.description}
              onChange={e => onUpdate(proj.id, 'description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>GitHub Link <span className="hint">(optional)</span></label>
            <input
              type="url"
              placeholder="https://github.com/username/project"
              value={proj.githubLink}
              onChange={e => onUpdate(proj.id, 'githubLink', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsForm
