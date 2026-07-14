interface Source {
  content: string
  source: string
  title: string
  similarity: number
}

interface Props {
  sources: Source[]
}

export function ChatSources({ sources }: Props) {
  return (
    <div className="mt-3 space-y-2 text-[0.8rem]">
      {sources.map((s, i) => (
        <div
          key={i}
          className="border-l-2 border-line pl-3 py-1 bg-page/50 rounded"
        >
          <div className="text-muted">
            [{i + 1}] <span className="font-mono">{s.title}</span>
            <span className="ml-2 text-[0.7rem]">相似度 {s.similarity.toFixed(2)}</span>
          </div>
          <div className="mt-1 text-ink/80 line-clamp-3">{s.content}</div>
        </div>
      ))}
    </div>
  )
}
