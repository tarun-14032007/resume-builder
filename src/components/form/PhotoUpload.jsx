function PhotoUpload({ photo, onUpload }) {
  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = event => onUpload(event.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="photo-upload">
      <div className="photo-preview-box">
        {photo
          ? <img src={photo} alt="Profile" className="photo-thumb" />
          : <div className="photo-placeholder">📷</div>
        }
      </div>
      <div className="photo-actions">
        <label htmlFor="photo-input" className="photo-label">
          {photo ? 'Change Photo' : 'Add Photo'}
        </label>
        <input
          id="photo-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        {photo && (
          <button className="remove-btn" onClick={() => onUpload(null)}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default PhotoUpload
