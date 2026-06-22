import { computeScore } from '../hooks/useResumeStorage'

function ResumeScore({ data }) {
  const { score, tips } = computeScore(data)

  // Colour shifts from red → amber → green as the score rises
  const color =
    score >= 75 ? '#22c55e' :
    score >= 45 ? '#f59e0b' :
                  '#ef4444'

  const label =
    score >= 75 ? 'Strong 🎉' :
    score >= 45 ? 'Fair — keep going' :
                  'Just getting started'

  return (
    <div className="score-card">
      <div className="score-top">
        <span className="score-title">Resume Strength</span>
        <span className="score-pct" style={{ color }}>{score}%</span>
      </div>

      {/* Progress bar */}
      <div className="score-bar-bg">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      <span className="score-label-text" style={{ color }}>{label}</span>

      {/* Up to 3 tips so the card stays compact */}
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
