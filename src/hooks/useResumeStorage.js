import { useState, useEffect } from 'react'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

const DEFAULT_DATA = {
  name:      '',
  jobTitle:  '',
  email:     '',
  phone:     '',
  summary:   '',
  photo:     null,
  education: '',
  skills:    [],
  links: {
    linkedin:  '',
    github:    '',
    portfolio: '',
  },
  experience:     [],
  projects:       [],
  certifications: [],
}

export function computeScore(data) {
  let score  = 0
  const tips = []

  if (data.name.trim()) {
    score += 10
  } else {
    tips.push('Add your full name')
  }

  if (data.email.trim()) { score += 5 } else { tips.push('Add your email') }
  if (data.phone.trim()) { score += 5 } else { tips.push('Add your phone') }

  if (data.summary.trim()) {
    score += 5
    if (data.summary.length >= 100) {
      score += 10
    } else {
      tips.push('Expand summary to at least 100 characters')
    }
  } else {
    tips.push('Write a professional summary')
  }

  if (data.skills.length >= 5) {
    score += 15
  } else if (data.skills.length >= 1) {
    score += 5
    tips.push('Add at least 5 skills for a better score')
  } else {
    tips.push('Add your key skills')
  }

  if (data.experience.length > 0) {
    score += 15
  } else {
    tips.push('Add work or internship experience')
  }

  if (data.projects.length > 0) {
    score += 15
  } else {
    tips.push('Add at least one project')
  }

  if (data.education.trim()) {
    score += 10
  } else {
    tips.push('Fill in your education')
  }

  const filledLinks = Object.values(data.links).filter(Boolean).length
  if (filledLinks >= 1) {
    score += 5
  } else {
    tips.push('Add a LinkedIn or GitHub link')
  }

  // Bonus for photo
  if (data.photo) score += 5
  else if (tips.length < 4) tips.push('Add a profile photo')

  return { score: Math.min(score, 100), tips }
}

export function useResumeStorage() {
  const [resumeData,     setResumeData]     = useState(DEFAULT_DATA)
  const [activeTemplate, setActiveTemplate] = useState('classic')
  const [theme,          setTheme]          = useState('light')
  const [savedAt,        setSavedAt]        = useState(null)

  useEffect(() => {
    try {
      const saved         = localStorage.getItem('resumeData')
      const savedTemplate = localStorage.getItem('resumeTemplate')
      const savedTheme    = localStorage.getItem('resumeTheme')

      if (saved)         setResumeData(JSON.parse(saved))
      if (savedTemplate) setActiveTemplate(savedTemplate)
      if (savedTheme)    setTheme(savedTheme)
    } catch {
      // corrupted storage — start fresh
    }
  }, [])

  useEffect(() => {
    try {
      // Skip saving photo to localStorage to avoid quota issues
      const dataToSave = { ...resumeData, photo: null }
      localStorage.setItem('resumeData', JSON.stringify(dataToSave))
      setSavedAt(Date.now())
    } catch {
      // localStorage quota exceeded — silently continue
    }
  }, [resumeData])

  useEffect(() => {
    localStorage.setItem('resumeTemplate', activeTemplate)
  }, [activeTemplate])

  useEffect(() => {
    localStorage.setItem('resumeTheme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function updateField(field, value) {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }

  function updateLink(platform, value) {
    setResumeData(prev => ({
      ...prev,
      links: { ...prev.links, [platform]: value },
    }))
  }

  function addSkill(skill) {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
  }
  function removeSkill(index) {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

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
  function moveExperience(id, direction) {
    setResumeData(prev => {
      const arr = [...prev.experience]
      const idx = arr.findIndex(e => e.id === id)
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= arr.length) return prev
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return { ...prev, experience: arr }
    })
  }

  function addProject() {
    const blank = { id: uid(), name: '', techStack: '', description: '', githubLink: '', liveLink: '' }
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
  function moveProject(id, direction) {
    setResumeData(prev => {
      const arr = [...prev.projects]
      const idx = arr.findIndex(p => p.id === id)
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= arr.length) return prev
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return { ...prev, projects: arr }
    })
  }

  // Certifications are now objects: { id, name, issuer, year, credentialUrl }
  function addCertification() {
    const blank = { id: uid(), name: '', issuer: '', year: '', credentialUrl: '' }
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, blank] }))
  }
  function updateCertification(id, field, value) {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c),
    }))
  }
  function removeCertification(id) {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }))
  }

  function clearForm() {
    setResumeData(DEFAULT_DATA)
    localStorage.removeItem('resumeData')
  }

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return {
    resumeData,
    activeTemplate,
    theme,
    savedAt,
    setActiveTemplate,
    toggleTheme,
    clearForm,
    updateField,
    updateLink,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    moveExperience,
    addProject,
    updateProject,
    removeProject,
    moveProject,
    addCertification,
    updateCertification,
    removeCertification,
  }
}
