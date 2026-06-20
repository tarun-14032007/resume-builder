import TemplateSelector from './TemplateSelector'

function Navbar({ activeTemplate, setActiveTemplate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">📄</span>
        <h1 className="brand-name">ResumeForge</h1>
      </div>

      <TemplateSelector
        active={activeTemplate}
        onChange={setActiveTemplate}
      />
    </nav>
  )
}

export default Navbar