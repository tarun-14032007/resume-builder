function CertificationsForm({ certifications, onAdd, onUpdate, onRemove }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3 className="form-section-label">Certifications</h3>
        <button className="add-btn" onClick={onAdd}>+ Add</button>
      </div>

      {certifications.map((cert, i) => (
        <div key={i} className="cert-row">
          <input
            placeholder="e.g. AWS Cloud Foundations"
            value={cert}
            onChange={e => onUpdate(i, e.target.value)}
          />
          <button className="remove-btn" onClick={() => onRemove(i)}>×</button>
        </div>
      ))}
    </div>
  )
}

export default CertificationsForm
