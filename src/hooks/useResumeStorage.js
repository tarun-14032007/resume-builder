import { useState, useEffect } from 'react'

// Tiny unique ID generator — avoids pulling in uuid just for this
function uid() {
  return Math.random().toString(36).slice(2, 9)
}

const DEFAULT_DATA = {
  name:      '',
  jobTitle:  '',           // e.g. "Software Engineer" — shown under name
  email:     '',
  phone:     '',
  summary:   '',
  photo:     null,         // base64 string once uploaded
  education: '',
  skills:    [],           // array so the UI can show chips
  links: {
    linkedin:  '',
    github:    '',
    portfolio: '',
  },
  experience:     [],      // [{ id, company, role, duration, description }]
  projects:       [],      // [{ id, name, techStack, description, githubLink }]
  certifications: [],      // ['AWS Cloud Foundations', ...]
}

// ── Resume Strength Score ────────────────────────────────────
// Max 100 pts — used by ResumeScore component.
export function computeScore(data) {
  let score  = 0
  const tips = []

  // Name  (10 pts)
  if (data.name.trim()) {
    score += 10
  } else {
    tips.push('Add your full name')
  }

  // Email + Phone  (10 pts: 5 each)
  if (data.email.trim()) { score += 5 } else { tips.push('Add your email') }
  if (data.phone.trim()) { score += 5 } else { tips.push('Add your phone') }

  // Summary  (15 pts: 5 for any, +10 for 100+ chars)
  if (data.summary.trim()) {
    score += 5
    if (data.summary.length >= 100) {
      score += 10
    } else {
      tips.push('Expand summary to 100+ characters')
    }
  } else {
    tips.push('Write a professional summary')
  }

  // Skills  (15 pts: 5 for 1+, 10 for 5+)
  if (data.skills.length >= 5) {
    score += 15
  } else if (data.skills.length >= 1) {
    score += 5
    tips.push('Add at least 5 skills for a higher score')
  } else {
    tips.push('Add skills (React, Python, etc.)')
  }

  // Experience  (15 pts)
  if (data.experience.length > 0) {
    score += 15
  } else {
    tips.push('Add work or internship experience')
  }

  // Projects  (15 pts)
  if (data.projects.length > 0) {
    score += 15
  } else {
    tips.push('Add at least one project')
  }

  // Education  (10 pts)
  if (data.education.trim()) {
    score += 10
  } else {
    tips.push('Fill in your education')
  }

  // Links  (5 pts: at least one)
  const filledLinks = Object.values(data.links).filter(Boolean).length
  if (filledLinks >= 1) {
    score += 5
  } else {
    tips.push('Add a LinkedIn or GitHub link')
  }

  return { score, tips }
}

// ── Main hook ────────────────────────────────────────────────
export function useResumeStorage() {
  const [resumeData,     setResumeData]     = useState(DEFAULT_DATA)
  const [activeTemplate, setActiveTemplate] = useState('classic')
  const [theme,          setTheme]          = useState('light')

  // Load whatever the user saved last time
  useEffect(() => {
    const saved         = localStorage.getItem('resumeData')
    const savedTemplate = localStorage.getItem('resumeTemplate')
    const savedTheme    = localStorage.getItem('resumeTheme')

    if (saved)         setResumeData(JSON.parse(saved))
    if (savedTemplate) setActiveTemplate(savedTemplate)
    if (savedTheme)    setTheme(savedTheme)
  }, [])

  // Auto-save whenever content changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  useEffect(() => {
    localStorage.setItem('resumeTemplate', activeTemplate)
  }, [activeTemplate])

  // Keep the HTML [data-theme] attribute in sync so CSS vars kick in
  useEffect(() => {
    localStorage.setItem('resumeTheme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // ── Scalar fields (name, email, phone, summary, education, photo, jobTitle)
  function updateField(field, value) {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }

  // ── Links
  function updateLink(platform, value) {
    setResumeData(prev => ({
      ...prev,
      links: { ...prev.links, [platform]: value },
    }))
  }

  // ── Skills
  function addSkill(skill) {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
  }
  function removeSkill(index) {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  // ── Experience
  function addExperience() {
    const blank = { id: uid(), company: '', role: '', duration: '', description: '' }
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, blank] }))
  }
  function updateExperience(id, field, value) {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    }))
  }
  function removeExperience(id) {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id),
    }))
  }

  // ── Projects
  function addProject() {
    const blank = { id: uid(), name: '', techStack: '', description: '', githubLink: '' }
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, blank] }))
  }
  function updateProject(id, field, value) {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
    }))
  }
  function removeProject(id) {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }))
  }

  // ── Certifications
  function addCertification() {
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, ''] }))
  }
  function updateCertification(index, value) {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((c, i) => i === index ? value : c),
    }))
  }
  function removeCertification(index) {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  // ── Theme
  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return {
    resumeData,
    activeTemplate,
    theme,
    setActiveTemplate,
    toggleTheme,
    updateField,
    updateLink,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
  }
}
