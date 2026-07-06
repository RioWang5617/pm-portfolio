import { ResumeHeader } from '../components/ResumeHeader'
import {
  ResumeSummary,
  ResumeExperience,
  ResumeEducation,
  ResumeSkills,
  ResumeSelectedWork,
} from '../components/ResumeSection'

export default function Resume() {
  return (
    <article>
      <ResumeHeader />
      <ResumeSummary />
      <ResumeExperience />
      <ResumeEducation />
      <ResumeSkills />
      <ResumeSelectedWork />
    </article>
  )
}
