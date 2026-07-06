import { describe, it, expect, vi } from 'vitest'
import { parseSSEStream } from './useStreaming'

function mockFetchWithSSE(events: Array<Record<string, unknown>>) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      for (const e of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`))
      }
      controller.close()
    },
  })
  return vi.fn().mockResolvedValue({
    ok: true,
    body: stream,
  })
}

describe('parseSSEStream', () => {
  it('parses multiple events from SSE stream', async () => {
    const events = [
      { type: 'sources', sources: [] },
      { type: 'token', content: '你好' },
      { type: 'token', content: '世界' },
      { type: 'done' },
    ]
    const fetchMock = mockFetchWithSSE(events)
    global.fetch = fetchMock as any

    const received: any[] = []
    await parseSSEStream('/api/chat', { method: 'POST', body: '{}' }, (e) => {
      received.push(e)
    })

    expect(received).toHaveLength(4)
    expect(received[0].type).toBe('sources')
    expect(received[1].content).toBe('你好')
    expect(received[2].content).toBe('世界')
    expect(received[3].type).toBe('done')
  })

  it('stops on done event', async () => {
    const events = [
      { type: 'token', content: 'a' },
      { type: 'done' },
      { type: 'token', content: 'b' },  // 不应该被处理
    ]
    const fetchMock = mockFetchWithSSE(events)
    global.fetch = fetchMock as any

    const received: any[] = []
    await parseSSEStream('/api/chat', { method: 'POST' }, (e) => {
      received.push(e)
    })
    expect(received).toHaveLength(2)
  })

  it('throws on non-ok response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    global.fetch = fetchMock as any

    await expect(
      parseSSEStream('/api/chat', { method: 'POST' }, () => {})
    ).rejects.toThrow('HTTP 500')
  })
})
