import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function BasicInfoForm({ data, onChange }) {
  const [touched, setTouched] = useState({ email: false, phone: false })

  function touch(field) {
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
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Alex Johnson"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
        />
      </div>

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

      <div className={`form-group ${emailError ? 'has-error' : ''}`}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="e.g. alex@example.com"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
          onBlur={() => touch('email')}
        />
        {emailError && <span className="field-error">{emailError}</span>}
      </div>

      <div className={`form-group ${phoneError ? 'has-error' : ''}`}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. +1 (555) 123-4567"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value)}
          onBlur={() => touch('phone')}
        />
        {phoneError && <span className="field-error">{phoneError}</span>}
      </div>
    </>
  )
}

export default BasicInfoForm
