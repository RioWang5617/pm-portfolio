import { useState, useRef, KeyboardEvent } from 'react'

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  const send = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="border-t border-line bg-cream/95 p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="问我任何问题... (Enter 发送，Shift+Enter 换行)"
          rows={1}
          className="flex-1 resize-none bg-transparent outline-none text-[0.95rem] leading-[1.4] text-ink placeholder:text-muted disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={disabled || !value.trim()}
          className="px-4 py-2 bg-ink text-cream text-[0.85rem] rounded-full hover:bg-vermilion transition-colors disabled:opacity-30 disabled:hover:bg-ink"
        >
          发送
        </button>
      </div>
    </div>
  )
}
