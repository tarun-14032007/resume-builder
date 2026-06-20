import Home from './pages/Home'
import { useResumeStorage } from './hooks/useResumeStorage'

function App() {
  const { resumeData, updateField, activeTemplate, setActiveTemplate } = useResumeStorage()

  return (
    <Home
      resumeData={resumeData}
      onChange={updateField}
      activeTemplate={activeTemplate}
      setActiveTemplate={setActiveTemplate}
    />
  )
}

export default App