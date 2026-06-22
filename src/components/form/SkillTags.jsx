import { useState } from 'react'

const SUGGESTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'C++', 'MongoDB', 'PostgreSQL', 'Git',
  'Docker', 'AWS', 'Next.js', 'GraphQL', 'Figma',
]

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
    if (e.key === 'Backspace' && input === '' && skills.length > 0) {
      onRemove(skills.length - 1)
    }
  }

  const unusedSuggestions = SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 8)

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

      {unusedSuggestions.length > 0 && (
        <div className="skill-suggestions">
          {unusedSuggestions.map(s => (
            <button
              key={s}
              type="button"
              className="skill-suggestion-chip"
              onClick={() => onAdd(s)}
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillTags
