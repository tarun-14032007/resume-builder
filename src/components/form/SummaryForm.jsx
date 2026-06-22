const MAX_CHARS = 300

function SummaryForm({ summary, onChange }) {
  const count   = summary.length
  const isClose = count >= 250
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
        placeholder="e.g. First-year CSE student at VIT passionate about Full Stack and AI."
        value={summary}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default SummaryForm
