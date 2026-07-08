import { profile } from '../data/profile'

export default function About() {
  return (
    <article>
      {/* HERO */}
      <section className="mx-auto max-w-wide px-6 md:px-10 pt-20 md:pt-32 pb-12">
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
                href="/resume.pdf"
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

      {/* 简历 PDF 在线预览 */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-12 border-t border-line/60">
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
              加载慢的话可以 <a href="/resume.pdf" className="underline decoration-line underline-offset-4 hover:decoration-ink">下载 PDF</a> 离线看。
            </p>
          </div>
        </div>

        {/* PDF viewer（iframe + 移动端 fallback） */}
        <div className="rounded-2xl overflow-hidden border border-line bg-white shadow-sm">
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
            title="王天阳 · 简历"
            className="w-full block"
            style={{ height: 'min(85vh, 1100px)' }}
          />
        </div>

        {/* 移动端 fallback：直接显示下载按钮 */}
        <div className="mt-4 md:hidden">
          <a
            href="/resume.pdf"
            className="block text-center px-6 py-3 bg-ink text-paper rounded-full"
          >
            在新窗口打开 PDF
          </a>
        </div>
      </section>
    </article>
  )
}
