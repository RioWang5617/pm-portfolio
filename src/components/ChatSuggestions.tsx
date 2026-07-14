interface Props {
  onSelect: (q: string) => void
}

const SUGGESTIONS = [
  '你这 4 年最大的成长是什么？',
  '车企 AI 售后那个项目，怎么从 0 做到月销 300 万的？',
  'AI CRM 真能替代微软 Copilot 吗？',
  '你平时用什么 AI 工具帮自己干活？',
  '聊聊你踩过最深的坑？',
  '怎么联系你？',
]

export function ChatSuggestions({ onSelect }: Props) {
  return (
    <div className="p-6 space-y-2">
      <p className="text-[0.78rem] text-muted mb-3">随便聊聊 ↓</p>
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="block w-full text-left px-4 py-3 bg-card-bg hover:bg-card-border/40 border border-line/40 rounded-lg text-[0.9rem] text-ink transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
