interface WorkCoverImageProps {
  className?: string
  title: string
  gradient: string
}

export function WorkCoverImage({ className = '', title, gradient }: WorkCoverImageProps) {
  return (
    <div className={`relative bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${title}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm" />
      </div>
    </div>
  )
}

interface PlaceholderImageProps {
  className?: string
  text?: string
}

export function PlaceholderImage({ className = '', text = '' }: PlaceholderImageProps) {
  return (
    <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400 text-sm font-mono">{text || 'Image'}</span>
      </div>
    </div>
  )
}
