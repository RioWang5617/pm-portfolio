interface Props {
  onSelect: (q: string) => void
}

const SUGGESTIONS = [
  '你最近在做什么？',
  'AI Agent 项目里最难的决策是什么？',
  '你怎么定义"好的 AI 产品"？',
  '能讲讲 RAG 那个项目的复盘吗？',
]

export function ChatSuggestions({ onSelect }: Props) {
  return (
    <div className="p-6 space-y-2">
      <p className="text-[0.8rem] text-muted mb-3">试试问：</p>
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="block w-full text-left px-4 py-3 bg-line/30 hover:bg-line/60 rounded-lg text-[0.9rem] text-ink transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
