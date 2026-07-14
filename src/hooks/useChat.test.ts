import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useChat } from './useChat'

describe('useChat', () => {
  it('starts with empty messages and idle status', () => {
    const { result } = renderHook(() => useChat())
    expect(result.current.messages).toEqual([])
    expect(result.current.status).toBe('idle')
  })

  it('addMessage appends to messages', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.addMessage({ id: '1', role: 'user', content: 'hi' })
    })
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].content).toBe('hi')
  })

  it('updateLastMessage updates the last message content', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.addMessage({ id: '1', role: 'assistant', content: '' })
    })
    act(() => {
      result.current.updateLastMessage('hello')
    })
    expect(result.current.messages[0].content).toBe('hello')
  })

  it('updateLastMessage does nothing when no messages', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.updateLastMessage('x')
    })
    expect(result.current.messages).toEqual([])
  })

  it('setMessageSources sets sources on last message', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.addMessage({ id: '1', role: 'assistant', content: 'x' })
    })
    const sources = [{ content: 'c', source: 's', title: 't', similarity: 0.9 }]
    act(() => {
      result.current.setMessageSources(sources)
    })
    expect(result.current.messages[0].sources).toEqual(sources)
  })

  it('clear resets state', () => {
    const { result } = renderHook(() => useChat())
    act(() => {
      result.current.addMessage({ id: '1', role: 'user', content: 'x' })
      result.current.setStatus('error')
      result.current.setError('oops')
    })
    act(() => {
      result.current.clear()
    })
    expect(result.current.messages).toEqual([])
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBe(null)
  })
})
