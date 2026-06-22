import { useState } from 'react'

function SkillTags({ skills, onAdd, onRemove }) {
  const [input, setInput] = useState('')

  function commit() {
    const skill = input.trim()
    if (skill && !skills.includes(skill)) onAdd(skill)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    }
    // Backspace on an empty input removes the last chip
    if (e.key === 'Backspace' && input === '' && skills.length > 0) {
      onRemove(skills.length - 1)
    }
  }

  return (
    <div className="form-group">
      <label>Skills</label>
      <div className="tags-box">
        {skills.map((skill, i) => (
          <span key={i} className="form-tag">
            {skill}
            <button type="button" className="tag-x" onClick={() => onRemove(i)}>×</button>
          </span>
        ))}
        <input
          className="tags-input"
          placeholder={skills.length === 0 ? 'Type a skill, press Enter' : '+ add more'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
        />
      </div>
    </div>
  )
}

export default SkillTags
