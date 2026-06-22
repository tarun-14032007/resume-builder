import { computeScore } from '../hooks/useResumeStorage'

function ResumeScore({ data }) {
  const { score, tips } = computeScore(data)

  const color =
    score >= 80 ? '#22c55e' :
    score >= 50 ? '#f59e0b' :
                  '#ef4444'

  const label =
    score >= 80 ? 'Excellent 🎉' :
    score >= 50 ? 'Looking good, keep going' :
    score >= 25 ? 'Just getting started' :
                  'Fill in the basics first'

  return (
    <div className="score-card">
      <div className="score-top">
        <span className="score-title">Resume Strength</span>
        <span className="score-pct" style={{ color }}>{score}%</span>
      </div>

      <div className="score-bar-bg">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      <span className="score-label-text" style={{ color }}>{label}</span>

      {tips.length > 0 && (
        <ul className="score-tips">
          {tips.slice(0, 3).map((tip, i) => (
            <li key={i}>○ {tip}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ResumeScore
