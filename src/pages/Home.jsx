import Navbar          from '../components/Navbar'
import ResumeForm      from '../components/ResumeForm'
import ResumePreview   from '../components/ResumePreview'

function Home(props) {
  const {
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
  } = props

  // Bundle all mutation handlers so ResumeForm gets one clean prop
  const handlers = {
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

  return (
    <div className="app-wrapper">
      <Navbar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* ── Side-by-side editor ── */}
      {/* On desktop: form (380 px) | preview (fills rest)  */}
      {/* On mobile : stacked vertically                    */}
      <div className="editor-layout">
        <ResumeForm data={resumeData} handlers={handlers} />
        <ResumePreview data={resumeData} template={activeTemplate} />
      </div>
    </div>
  )
}

export default Home
