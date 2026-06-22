import { useState } from 'react'

// Simple regex — good enough for UX feedback, not for security
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function BasicInfoForm({ data, onChange }) {
  // Track which fields the user has "touched" so we only show
  // errors after they've actually tried to type something
  const [touched, setTouched] = useState({ email: false, phone: false })

  function blur(field) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const emailError = touched.email && data.email && !EMAIL_RE.test(data.email)
    ? 'Enter a valid email address'
    : null

  const phoneError = touched.phone && data.phone && data.phone.replace(/\D/g, '').length < 7
    ? 'Phone number seems too short'
    : null

  return (
    <>
      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Tarun TS"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
        />
      </div>

      {/* Job Title — appears right under the name in every template */}
      <div className="form-group">
        <label htmlFor="jobTitle">Job Title / Role</label>
        <input
          id="jobTitle"
          type="text"
          placeholder="e.g. Software Engineer"
          value={data.jobTitle}
          onChange={e => onChange('jobTitle', e.target.value)}
        />
      </div>

      {/* Email with validation */}
      <div className={`form-group ${emailError ? 'has-error' : ''}`}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="e.g. tarun@gmail.com"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
          onBlur={() => blur('email')}
        />
        {emailError && <span className="field-error">{emailError}</span>}
      </div>

      {/* Phone with validation */}
      <div className={`form-group ${phoneError ? 'has-error' : ''}`}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. 9876543210"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value)}
          onBlur={() => blur('phone')}
        />
        {phoneError && <span className="field-error">{phoneError}</span>}
      </div>
    </>
  )
}

export default BasicInfoForm
