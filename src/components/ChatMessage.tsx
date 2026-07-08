import { useState } from 'react'
import type { ChatMessage as ChatMessageType } from '../hooks/useChat'
import { ChatSources } from './ChatSources'

interface Props {
  message: ChatMessageType
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
  const [showSources, setShowSources] = useState(false)

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 gap-2`}>
      {!isUser && (
        <img
          src="/avatar.png"
          alt="AI"
          className="w-7 h-7 rounded-full object-cover mt-1 flex-shrink-0"
        />
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-ink text-cream' : 'bg-line/40 text-ink'
        }`}
      >
        <div className="text-[0.95rem] leading-[1.5] whitespace-pre-wrap">
          {(message.role === 'assistant'
            ? message.content.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/<think>[\s\S]*$/, '').trim()
            : message.content
          ) || (message.role === 'assistant' ? '...' : '')}
        </div>
        {message.sources && message.sources.length > 0 && (
          <button
            onClick={() => setShowSources(!showSources)}
            className="mt-2 text-[0.75rem] opacity-70 hover:opacity-100 underline"
          >
            📎 参考 {message.sources.length} 段资料 {showSources ? '↑' : '↓'}
          </button>
        )}
        {showSources && message.sources && (
          <ChatSources sources={message.sources} />
        )}
      </div>
    </div>
  )
}
