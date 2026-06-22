const MAX_CHARS = 500

function SummaryForm({ summary, onChange }) {
  const count   = summary.length
  const isClose = count >= 400
  const isOver  = count >= MAX_CHARS

  return (
    <div className="form-group">
      <div className="label-row">
        <label htmlFor="summary">Summary / About Me</label>
        <span className={`char-count ${isClose ? 'close' : ''} ${isOver ? 'over' : ''}`}>
          {count} / {MAX_CHARS}
        </span>
      </div>
      <textarea
        id="summary"
        rows={4}
        maxLength={MAX_CHARS}
        placeholder="e.g. Full-stack developer with 2 years of experience building scalable web apps. Passionate about clean code and great UX."
        value={summary}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default SummaryForm
