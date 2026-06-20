import { useState, useEffect } from 'react'

// Default empty state — one place to update if we ever add new fields
const DEFAULT_DATA = {
  name: '',
  email: '',
  phone: '',
  education: '',
  skills: '',
}

export function useResumeStorage() {
  const [resumeData, setResumeData] = useState(DEFAULT_DATA)
  const [activeTemplate, setActiveTemplate] = useState('classic')

  // Load whatever was saved last time the user visited
  useEffect(() => {
    const saved = localStorage.getItem('resumeData')
    const savedTemplate = localStorage.getItem('resumeTemplate')

    if (saved) setResumeData(JSON.parse(saved))
    if (savedTemplate) setActiveTemplate(savedTemplate)
  }, [])

  // Auto-save any time the resume content changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  // Save template choice separately so they're independent
  useEffect(() => {
    localStorage.setItem('resumeTemplate', activeTemplate)
  }, [activeTemplate])

  // Single update function — avoids spreading in every onChange handler
  function updateField(field, value) {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }

  return { resumeData, updateField, activeTemplate, setActiveTemplate }
}