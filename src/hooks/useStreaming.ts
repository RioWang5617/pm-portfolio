export interface SSEEvent {
  type: 'token' | 'sources' | 'done'
  content?: string
  sources?: Array<{ content: string; source: string; title: string; similarity: number }>
}

export async function parseSSEStream(
  url: string,
  init: RequestInit,
  onEvent: (event: SSEEvent) => void,
): Promise<void> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const parts = buffer.split('\n\n')
    buffer = parts.pop() || ''

    for (const part of parts) {
      const line = part.trim()
      if (!line.startsWith('data: ')) continue
      const payload = line.slice(6)
      try {
        const event = JSON.parse(payload) as SSEEvent
        onEvent(event)
        if (event.type === 'done') return
      } catch (e) {
        console.error('Failed to parse SSE event:', payload, e)
      }
    }
  }
}
