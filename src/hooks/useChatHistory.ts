import type { ChatMessage } from './useChat'

const STORAGE_KEY = 'pm-portfolio-chat-history'
const MAX_MESSAGES = 12

export function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveHistory(messages: ChatMessage[]) {
  const trimmed = messages.slice(-MAX_MESSAGES)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch (e) {
    // quota exceeded, ignore
  }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}
