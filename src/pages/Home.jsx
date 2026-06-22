import Navbar        from '../components/Navbar'
import ResumeForm    from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'

function Home(props) {
  const {
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
  } = props

  const handlers = {
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

  return (
    <div className="app-wrapper">
      <Navbar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        theme={theme}
        onToggleTheme={toggleTheme}
        savedAt={savedAt}
      />

      <div className="editor-layout">
        <ResumeForm data={resumeData} handlers={handlers} onClear={clearForm} />
        <ResumePreview data={resumeData} template={activeTemplate} />
      </div>
    </div>
  )
}

export default Home
