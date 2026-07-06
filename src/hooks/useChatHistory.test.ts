import { describe, it, expect, beforeEach } from 'vitest'
import { loadHistory, saveHistory, clearHistory } from './useChatHistory'
import type { ChatMessage } from './useChat'

describe('chat history localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array when no history', () => {
    expect(loadHistory()).toEqual([])
  })

  it('saves and loads history', () => {
    const msgs: ChatMessage[] = [
      { id: '1', role: 'user', content: 'hi' },
      { id: '2', role: 'assistant', content: 'hello' },
    ]
    saveHistory(msgs)
    expect(loadHistory()).toEqual(msgs)
  })

  it('keeps only last 12 messages (6 turns)', () => {
    const msgs = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      role: 'user' as const,
      content: `msg ${i}`,
    }))
    saveHistory(msgs)
    const loaded = loadHistory()
    expect(loaded.length).toBe(12)
    expect(loaded[0].id).toBe('8')
  })

  it('clear works', () => {
    saveHistory([{ id: '1', role: 'user', content: 'x' }])
    clearHistory()
    expect(loadHistory()).toEqual([])
  })

  it('handles corrupted storage gracefully', () => {
    localStorage.setItem('pm-portfolio-chat-history', 'not-json{{{')
    expect(loadHistory()).toEqual([])
  })
})
