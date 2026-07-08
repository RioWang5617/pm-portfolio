import { profile } from '../data/profile'
import ResumeViewer from '../components/ResumeViewer'
import { SidebarNav } from '../components/SidebarNav'

const RESUME_URL =
  'https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf'

export default function About() {
  const sidebarSections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: '经历' },
    { id: 'skills', label: '技能' },
    { id: 'resume', label: 'Resume' },
  ]

  return (
    <article>
      <SidebarNav sections={sidebarSections} />
      {/* HERO */}
      <section id="about" className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              About
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="font-display text-[3rem] md:text-[5rem] leading-[0.95] tracking-tightest text-balance">
              <em>我是 {profile.nameZh}。</em>
            </h1>
            <p className="mt-6 text-[1.05rem] md:text-[1.18rem] text-muted">
              {profile.title} · 4 年工作经验 · {profile.location}
            </p>
            <p className="mt-12 max-w-prose text-[1.18rem] md:text-[1.32rem] leading-[1.6] text-pretty">
              <em>{profile.pitch}</em>
            </p>

            {/* 联系方式 */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {profile.email}
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                下载 PDF 简历
              </a>
            </div>

            {/* 能力标签 */}
            <div className="mt-10 flex flex-wrap gap-2">
              {profile.capabilities.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 text-[0.78rem] uppercase tracking-[0.12em] border border-line rounded-full text-ink/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 工作经历 */}
      <section id="experience" className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24 border-t border-line/60">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Experience
            </p>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-[2rem] md:text-[2.6rem] tracking-tightest leading-[1.1] text-balance">
              <em>工作经历</em>
            </h2>
            <div className="mt-10 space-y-10">
              {profile.experience.map((exp, i) => (
                <div key={i} className="grid md:grid-cols-12 gap-4 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="text-[0.85rem] text-muted num">{exp.period}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tightest">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-[0.95rem] text-muted">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-[1rem] text-ink/80 leading-[1.6] pl-4 border-l-2 border-line">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 专业技能 */}
      <section id="skills" className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24 border-t border-line/60">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Skills
            </p>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-[2rem] md:text-[2.6rem] tracking-tightest leading-[1.1] text-balance">
              <em>专业技能</em>
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(profile.skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-[0.85rem] uppercase tracking-[0.15em] text-muted mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-[0.85rem] bg-ink/5 rounded-full text-ink/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 简历 PDF 在线翻阅 - PDF.js 渲染成可滚动图文 */}
      <section id="resume" className="mx-auto max-w-wide px-6 md:px-10 py-12 border-t border-line/60">
        <div className="grid md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-2">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Resume
            </p>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-[2rem] md:text-[2.6rem] tracking-tightest leading-[1.1] text-balance">
              <em>完整简历 · 在线翻阅</em>
            </h2>
            <p className="mt-3 text-[0.95rem] text-muted">
              包含完整工作经历、项目细节、教育背景与专业技能。
              想离线看可以 <a href={RESUME_URL} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">下载 PDF</a>。
            </p>
          </div>
        </div>

        <ResumeViewer />
      </section>
    </article>
  )
}
