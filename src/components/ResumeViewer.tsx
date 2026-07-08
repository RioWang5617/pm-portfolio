import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// 配置 worker（Vite 直接 import worker）
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const RESUME_URL =
  'https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf'

export default function ResumeViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<{ canvas: HTMLCanvasElement; pageNum: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: RESUME_URL,
          // 强制走 supabase CORS
          withCredentials: false,
        })
        loadingTask.onProgress = (p: { loaded: number; total: number }) => {
          if (cancelled) return
          if (p.total) setProgress(Math.round((p.loaded / p.total) * 100))
        }

        const pdf = await loadingTask.promise
        const rendered: { canvas: HTMLCanvasElement; pageNum: number }[] = []

        // 移动端用更小缩放；桌面端 1.5x 更清楚
        const isMobile = window.innerWidth < 768
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const scale = (isMobile ? 1.2 : 1.5) * dpr

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.className = 'block w-full h-auto rounded-lg shadow-sm border border-line/60 bg-white'
          canvas.style.maxWidth = '100%'

          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          await page.render({ canvasContext: ctx, viewport, canvas }).promise
          rendered.push({ canvas, pageNum: i })
        }

        if (cancelled) return
        setPages(rendered)
        setLoading(false)
      } catch (e: any) {
        if (cancelled) return
        console.error('PDF load error:', e)
        setError(e?.message || '加载失败')
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // 渲染完后挂 canvas 到 DOM
  useEffect(() => {
    if (!containerRef.current) return
    const c = containerRef.current
    c.innerHTML = ''
    pages.forEach((p) => c.appendChild(p.canvas))
  }, [pages])

  return (
    <div className="relative">
      {loading && (
        <div className="rounded-2xl border border-line bg-white p-12 text-center">
          <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-line/40">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-muted">简历加载中… {progress}%</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-800">简历加载失败：{error}</p>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm underline"
          >
            直接打开 PDF →
          </a>
        </div>
      )}

      <div
        ref={containerRef}
        className="space-y-6"
        style={{ display: loading || error ? 'none' : 'block' }}
      />
    </div>
  )
}
