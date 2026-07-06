import { useCallback, useState } from 'react'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  sources?: Array<{ content: string; source: string; title: string; similarity: number }>
}

export type ChatStatus = 'idle' | 'streaming' | 'error'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const updateLastMessage = useCallback((content: string) => {
    setMessages((prev) => {
      const next = [...prev]
      if (next.length === 0) return prev
      next[next.length - 1] = { ...next[next.length - 1], content }
      return next
    })
  }, [])

  const setMessageSources = useCallback((sources: ChatMessage['sources']) => {
    setMessages((prev) => {
      const next = [...prev]
      if (next.length === 0) return prev
      next[next.length - 1] = { ...next[next.length - 1], sources }
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setMessages([])
    setStatus('idle')
    setError(null)
  }, [])

  return {
    messages,
    status,
    error,
    addMessage,
    updateLastMessage,
    setMessageSources,
    setStatus,
    setError,
    clear,
  }
}
