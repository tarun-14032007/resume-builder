import Navbar from '../components/Navbar'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'

function Home({ resumeData, onChange, activeTemplate, setActiveTemplate }) {
  return (
    <div className="app-wrapper">
      <Navbar
        activeTemplate={activeTemplate}
        setActiveTemplate={setActiveTemplate}
      />

      {/* Split layout: form on left, live preview on right */}
      <main className="editor-layout">
        <ResumeForm data={resumeData} onChange={onChange} />
        <ResumePreview data={resumeData} template={activeTemplate} />
      </main>
    </div>
  )
}

export default Home