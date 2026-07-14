import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// 配置 worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

export default function ResumeViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch('/resume.pdf')
        if (!response.ok) throw new Error(`加载失败 (${response.status})`)
        const arrayBuffer = await response.arrayBuffer()

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const isMobile = window.innerWidth < 768
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const scale = (isMobile ? 1.2 : 1.5) * dpr

        const container = containerRef.current
        if (!container || cancelled) return
        container.innerHTML = ''

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.className = 'block w-full h-auto'
          canvas.style.maxWidth = '100%'

          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          await page.render({ canvas: ctx as unknown as HTMLCanvasElement, viewport }).promise
          container.appendChild(canvas)
        }

        if (!cancelled) setLoading(false)
      } catch (e: any) {
        if (!cancelled) {
          console.error('PDF load error:', e)
          setError(e?.message || '加载失败')
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-800">简历加载失败：{error}</p>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline text-accent">
          直接打开 PDF →
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      {loading && (
        <div className="rounded-lg border border-line bg-white p-12 text-center">
          <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-line/40 animate-pulse" />
          <p className="mt-4 text-sm text-muted">简历加载中…</p>
        </div>
      )}
      <div ref={containerRef} className="space-y-4" style={{ display: loading ? 'none' : 'block' }} />
    </div>
  )
}
