function PhotoUpload({ photo, onUpload }) {
  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return

    // Resize to max 400px before storing — keeps it small enough for memory
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 400
      const scale = Math.min(1, MAX / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width  = img.width  * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      onUpload(canvas.toDataURL('image/jpeg', 0.85))
      URL.revokeObjectURL(url)
    }
    img.src = url
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
