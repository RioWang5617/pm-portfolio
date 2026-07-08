import { useState, useEffect } from 'react'
import { ChatPanel } from './ChatPanel'

export function ChatLauncher() {
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(false)

  // 3 秒后开始呼吸动画
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Cmd/Ctrl + K 全局唤起
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // 监听 open-chat 事件（导航栏 / 首页卡片触发）
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden ${
          pulse && !open ? 'animate-pulse' : ''
        }`}
        aria-label="跟我聊"
      >
        <img
          src="/avatar.png"
          alt="跟我聊"
          className="w-full h-full object-cover"
        />
      </button>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}
