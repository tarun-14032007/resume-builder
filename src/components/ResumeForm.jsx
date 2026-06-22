import PhotoUpload        from './form/PhotoUpload'
import BasicInfoForm      from './form/BasicInfoForm'
import SummaryForm        from './form/SummaryForm'
import SkillTags          from './form/SkillTags'
import LinksForm          from './form/LinksForm'
import ExperienceForm     from './form/ExperienceForm'
import ProjectsForm       from './form/ProjectsForm'
import CertificationsForm from './form/CertificationsForm'
import ResumeScore        from './ResumeScore'

function ResumeForm({ data, handlers, onClear }) {
  function handleClear() {
    if (window.confirm('Clear all form data? This cannot be undone.')) {
      onClear()
    }
  }

  return (
    <div className="form-panel">
      <div className="form-panel-header">
        <h2 className="panel-title">Your Details</h2>
        <button className="clear-btn" onClick={handleClear} title="Clear all fields">
          Reset
        </button>
      </div>

      <div className="form-panel-body">
        <ResumeScore data={data} />

        <PhotoUpload
          photo={data.photo}
          onUpload={photo => handlers.updateField('photo', photo)}
        />

        <BasicInfoForm data={data} onChange={handlers.updateField} />

        <SummaryForm
          summary={data.summary}
          onChange={val => handlers.updateField('summary', val)}
        />

        <SkillTags
          skills={data.skills}
          onAdd={handlers.addSkill}
          onRemove={handlers.removeSkill}
        />

        <LinksForm links={data.links} onUpdate={handlers.updateLink} />

        <div className="form-group">
          <label htmlFor="education">Education</label>
          <textarea
            id="education"
            rows={3}
            placeholder="e.g. B.Tech Computer Science — State University (2021–2025)"
            value={data.education}
            onChange={e => handlers.updateField('education', e.target.value)}
          />
        </div>

        <ExperienceForm
          experience={data.experience}
          onAdd={handlers.addExperience}
          onUpdate={handlers.updateExperience}
          onRemove={handlers.removeExperience}
          onMove={handlers.moveExperience}
        />

        <ProjectsForm
          projects={data.projects}
          onAdd={handlers.addProject}
          onUpdate={handlers.updateProject}
          onRemove={handlers.removeProject}
          onMove={handlers.moveProject}
        />

        <CertificationsForm
          certifications={data.certifications}
          onAdd={handlers.addCertification}
          onUpdate={handlers.updateCertification}
          onRemove={handlers.removeCertification}
        />
      </div>
    </div>
  )
}

export default ResumeForm
