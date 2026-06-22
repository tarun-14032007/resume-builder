function CertificationsForm({ certifications, onAdd, onUpdate, onRemove }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3 className="form-section-label">Certifications</h3>
        <button className="add-btn" onClick={onAdd}>+ Add</button>
      </div>

      {certifications.map((cert) => (
        <div key={cert.id} className="cert-card">
          <div className="cert-card-header">
            <span className="entry-num">Cert</span>
            <button className="remove-btn" onClick={() => onRemove(cert.id)}>Remove</button>
          </div>

          <div className="form-group">
            <label>Certificate Name</label>
            <input
              placeholder="e.g. AWS Cloud Practitioner"
              value={cert.name}
              onChange={e => onUpdate(cert.id, 'name', e.target.value)}
            />
          </div>

          <div className="cert-grid">
            <div className="form-group">
              <label>Issuer</label>
              <input
                placeholder="e.g. Amazon"
                value={cert.issuer}
                onChange={e => onUpdate(cert.id, 'issuer', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                placeholder="e.g. 2024"
                value={cert.year}
                onChange={e => onUpdate(cert.id, 'year', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Credential URL <span className="hint">(optional)</span></label>
            <input
              type="url"
              placeholder="https://www.credly.com/badges/..."
              value={cert.credentialUrl}
              onChange={e => onUpdate(cert.id, 'credentialUrl', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CertificationsForm
