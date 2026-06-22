import PhotoUpload         from './form/PhotoUpload'
import BasicInfoForm       from './form/BasicInfoForm'
import SummaryForm         from './form/SummaryForm'
import SkillTags           from './form/SkillTags'
import LinksForm           from './form/LinksForm'
import ExperienceForm      from './form/ExperienceForm'
import ProjectsForm        from './form/ProjectsForm'
import CertificationsForm  from './form/CertificationsForm'
import ResumeScore         from './ResumeScore'

// This component is intentionally thin — each section is its own file,
// so adding/removing a section is one line here, not a 400-line hunt.
function ResumeForm({ data, handlers }) {
  return (
    <div className="form-panel">
      <div className="form-panel-header">
        <h2 className="panel-title">Your Details</h2>
      </div>

      <div className="form-panel-body">
        {/* Resume strength indicator at the top of the form */}
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
            placeholder="e.g. B.Tech CSE — VIT Vellore (2021–2025)"
            value={data.education}
            onChange={e => handlers.updateField('education', e.target.value)}
          />
        </div>

        <ExperienceForm
          experience={data.experience}
          onAdd={handlers.addExperience}
          onUpdate={handlers.updateExperience}
          onRemove={handlers.removeExperience}
        />

        <ProjectsForm
          projects={data.projects}
          onAdd={handlers.addProject}
          onUpdate={handlers.updateProject}
          onRemove={handlers.removeProject}
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
