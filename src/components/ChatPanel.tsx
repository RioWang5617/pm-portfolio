import { useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import { parseSSEStream } from '../hooks/useStreaming'
import { clearHistory } from '../hooks/useChatHistory'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatSuggestions } from './ChatSuggestions'

interface Props {
  open: boolean
  onClose: () => void
}

export function ChatPanel({ open, onClose }: Props) {
  const chat = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  // 每次打开都重新开始新对话，显示问候语
  useEffect(() => {
    if (open && chat.messages.length === 0) {
      chat.addMessage({
        id: `greeting-${Date.now()}`,
        role: 'assistant',
        content:
          '您好！我是王天阳的数字分身 👋\n\n有什么问题欢迎和我交流～',
      })
    }
  }, [open])

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat.messages])



  const send = async (text: string) => {
    chat.addMessage({ id: `user-${Date.now()}`, role: 'user', content: text })
    chat.addMessage({ id: `ai-${Date.now()}`, role: 'assistant', content: '' })
    chat.setStatus('streaming')

    try {
      const history = chat.messages.slice(0, -2).map((m) => ({
        role: m.role,
        content: m.content,
      }))
      await parseSSEStream(
        '/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
        },
        (event) => {
          if (event.type === 'sources' && event.sources) {
            chat.setMessageSources(event.sources)
          } else if (event.type === 'token' && event.content) {
            const last = chat.messages[chat.messages.length - 1]
            chat.updateLastMessage((last?.content || '') + event.content)
          } else if (event.type === 'done') {
            chat.setStatus('idle')
          }
        },
      )
    } catch (e: any) {
      chat.setError(e?.message || '网络错误')
      chat.setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-cream border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      role="dialog"
      aria-label="跟我聊"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div className="flex items-center gap-3">
          <img
            src="/avatar.png"
            alt="AI 替身"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h2 className="font-display text-[1.15rem]">跟我聊</h2>
            <p className="text-[0.75rem] text-muted">AI 替身 · 基于真实作品回答</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {chat.messages.length > 0 && (
            <button
              onClick={() => {
                chat.clear()
                clearHistory()
              }}
              className="text-[0.75rem] text-muted hover:text-ink"
              title="清空对话"
            >
              清空
            </button>
          )}
          <button
            onClick={onClose}
            className="text-muted hover:text-ink text-[1.2rem] leading-none"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {chat.messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {/* 只有打招呼时仍展示建议 */}
        {chat.messages.length <= 1 && chat.messages[0]?.role === 'assistant' && (
          <div className="mt-4">
            <ChatSuggestions onSelect={send} />
          </div>
        )}
        {chat.status === 'error' && (
          <div className="text-center text-[0.85rem] text-vermilion py-4">
            {chat.error} · <button onClick={() => chat.setStatus('idle')} className="underline">重试</button>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={send} disabled={chat.status === 'streaming'} />
    </div>
  )
}
