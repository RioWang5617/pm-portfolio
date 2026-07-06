import { resume } from '../data/resume'

function Divider() {
  return (
    <div className="my-16 flex items-center gap-1" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="h-px w-8 bg-line" />
      ))}
    </div>
  )
}

export function ResumeSummary() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-4">Summary</h2>
      <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.6] max-w-prose text-pretty">
        {resume.summary}
      </p>
      <Divider />
    </section>
  )
}

export function ResumeExperience() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-8">Experience</h2>
      <ol className="relative border-l border-line ml-3 space-y-12">
        {resume.experience.map((e, i) => (
          <li key={i} className="pl-8 relative">
            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-ink" />
            <div className="text-[0.78rem] uppercase tracking-[0.18em] text-muted num">{e.period}</div>
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] mt-1">
              {e.role}
              <span className="text-muted font-sans text-[0.85em]"> · {e.company}</span>
            </h3>
            <p className="text-[0.85rem] text-muted mt-1">{e.location}</p>
            <ul className="mt-4 space-y-2 text-[0.95rem] leading-[1.55]">
              {e.highlights.map((h, j) => (
                <li key={j} className="flex gap-3">
                  <span className="text-vermilion mt-1">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <Divider />
    </section>
  )
}

export function ResumeEducation() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Education</h2>
      <ul className="space-y-4">
        {resume.education.map((e, i) => (
          <li key={i} className="text-[0.95rem]">
            <span className="font-display text-[1.15rem]">{e.school}</span>
            <span className="text-muted ml-3">{e.degree}</span>
            <span className="text-muted ml-3 num">{e.period}</span>
            {e.notes && <p className="text-muted text-[0.85rem] mt-1">{e.notes}</p>}
          </li>
        ))}
      </ul>
      <Divider />
    </section>
  )
}

export function ResumeSkills() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Skills</h2>
      <div className="space-y-4">
        {resume.skills.map((s, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
            <div className="text-[0.78rem] uppercase tracking-[0.18em] text-muted md:w-20 shrink-0">
              {s.group}
            </div>
            <div className="flex flex-wrap gap-2 text-[0.9rem]">
              {s.items.map((it) => (
                <span key={it} className="px-2.5 py-1 border border-line rounded-full text-ink/80 font-mono text-[0.78rem]">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </section>
  )
}

export function ResumeSelectedWork() {
  return (
    <section className="mx-auto max-w-wide px-6 md:px-10 pb-24">
      <h2 className="font-display text-[1.8rem] md:text-[2.4rem] mb-6">Selected Work</h2>
      <ul className="space-y-3">
        {resume.selectedProjects.map((p) => (
          <li key={p.slug}>
            <a
              href={`/works/${p.slug}`}
              className="group flex items-baseline justify-between border-b border-line py-3 hover:border-ink transition-colors"
            >
              <span className="font-display text-[1.1rem] md:text-[1.25rem] group-hover:text-vermilion transition-colors">
                {p.title}
              </span>
              <span className="text-[0.78rem] text-muted num">{p.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
