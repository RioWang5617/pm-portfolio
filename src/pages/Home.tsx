export default function Home() {
  return (
    <section className="relative h-[calc(100vh-5rem)] flex flex-col items-center text-center px-6 overflow-hidden home-hero">
      {/* 浮动光斑背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      {/* 主内容 — 居中 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 -translate-y-[5%] w-full">
          <div className="max-w-wide mx-auto grid grid-cols-12 items-start gap-6 px-4">
            {/* 左 meta 列 */}
            <div className="col-span-2 hidden md:flex flex-col items-start pl-8">
              <div className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">PORTFOLIO</div>
              <div className="text-[0.72rem] uppercase tracking-[0.22em] text-muted mt-2">2025</div>
            </div>

            {/* 右侧大标题区，使用你的排版结构（已按要求保留字号与负 margin） */}
            <div className="col-span-12 md:col-span-10 relative overflow-visible">
              <div className="typography-container">
                <div className="artistic-title">
                  <div className="cluster-left">
                    <div className="char-yi">一</div>
                    <div className="char-qi">起</div>
                    <div className="char-zuodian">做点</div>
                  </div>

                  <div className="cluster-right">
                    <div className="char-huge char-you">有</div>
                    <div className="cluster-mid-small">
                      <span>意</span>
                      <span>思</span>
                      <span>的</span>
                    </div>
                    <div className="char-huge char-chan">产</div>
                    <div className="char-huge char-pin">品</div>
                  </div>
                </div>

                <div className="structured-subtitle">
                  <div>把模糊的需求，</div>
                  <div>变成可上线的产品。</div>
                </div>
              </div>

              {/* 按钮组（保持原有行为与样式） */}
              <div className="hero-cta mt-8 flex items-center gap-4 w-full">
                <a
                  href="https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group ml-auto inline-flex items-center gap-3 px-6 py-3 rounded-full text-[0.95rem] tracking-wide border border-ink text-ink hover:bg-ink hover:text-cream transition-all duration-300"
                >
                  查看我的简历
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="relative z-10 pb-6 text-[0.75rem] text-muted/60 tracking-wider">
        © 我没有token了
      </div>
    </section>
  )
}
