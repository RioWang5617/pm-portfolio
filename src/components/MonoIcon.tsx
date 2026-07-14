/**
 * Monochrome icon set — all icons use `currentColor` so they
 * automatically follow the active theme's text colour.
 */
export type IconName =
  | 'chat' | 'dna' | 'mask' | 'bulb' | 'clipboard' | 'paperclip'
  | 'satellite' | 'link' | 'robot' | 'search' | 'star' | 'pencil'
  | 'sliders' | 'question' | 'check' | 'upload' | 'file' | 'users'
  | 'target' | 'chart' | 'brain' | 'shield' | 'database' | 'clock'
  | 'down' | 'zap' | 'filter' | 'layers' | 'refresh' | 'send'
  | 'lock' | 'globe' | 'sparkle' | 'arrow' | 'leaf' | 'sun' | 'moon'

const paths: Record<IconName, string> = {
  chat:      'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  dna:       'M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M7 3v4M17 3v4M7 17v4M17 17v4',
  mask:      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 9.5C7 8.12 8.12 7 9.5 7S12 8.12 12 9.5 10.88 12 9.5 12 7 10.88 7 9.5zM14.5 12c1.38 0 2.5-1.12 2.5-2.5S15.88 7 14.5 7 12 8.12 12 9.5 13.12 12 14.5 12zM12 18c-2.28 0-4.22-1.22-5.25-3h10.5c-1.03 1.78-2.97 3-5.25 3z',
  bulb:      'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
  clipboard: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z',
  paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
  satellite: 'M13 7L9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M12 16l-4 4',
  link:      'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  robot:     'M12 8V4H8M2 12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM10 16v2M14 16v2M12 20h0',
  search:    'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.35-4.35',
  star:      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  pencil:    'M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z',
  sliders:   'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  question:  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',
  check:     'M20 6L9 17l-5-5',
  upload:    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  file:      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6',
  users:     'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  target:    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  chart:     'M18 20V10M12 20V4M6 20v-6',
  brain:     'M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6l1 6h6l1-6c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7zM9 22h6',
  shield:    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  database:  'M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zM2 6.5C2 8.99 6.48 11 12 11s10-2.01 10-4.5M2 12c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5',
  clock:     'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  down:      'M12 5v14M5 12l7 7 7-7',
  zap:       'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
  filter:    'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  layers:    'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  refresh:   'M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15',
  send:      'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  lock:      'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  globe:     'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z',
  sparkle:   'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z',
  arrow:     'M5 12h14M13 6l6 6-6 6',
  leaf:      'M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  sun:       'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  moon:      'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
}

interface MonoIconProps {
  name: IconName
  className?: string
}

export default function MonoIcon({ name, className = '' }: MonoIconProps) {
  const d = paths[name] ?? paths.arrow
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full bg-ink/[0.04] backdrop-blur-sm border border-line ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block"
      >
        <path d={d} />
      </svg>
    </span>
  )
}
