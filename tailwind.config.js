/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 用 rgba(...) 而不是 rgb(... / alpha)，因为 useTheme.ts 里
        // --page-rgb 等变量是逗号分隔（"221, 229, 218"），modern rgb()
        // 不支持逗号和斜杠混用，会被浏览器回退成透明。
        page: 'rgba(var(--page-rgb), <alpha-value>)',    // 主题页面背景
        cream: 'rgb(245 240 235 / <alpha-value>)',        // 固定暖白：深色背景上的文字
        ink: 'rgba(var(--ink-rgb), <alpha-value>)',        // 深色文字
        muted: 'rgba(var(--muted-rgb), <alpha-value>)',
        line: 'rgba(var(--line-rgb), <alpha-value>)',
        accent: 'rgba(var(--accent-rgb), <alpha-value>)',
        vermilion: 'rgba(var(--vermilion-rgb, 227, 66, 52), <alpha-value>)',
        'card-bg': 'rgba(var(--card-bg-rgb), <alpha-value>)',
        'card-border': 'rgba(var(--card-border-rgb), <alpha-value>)',
        surface: 'rgba(var(--surface-rgb), <alpha-value>)',
        'surface-variant': 'rgba(var(--surface-variant-rgb), <alpha-value>)',
        primary: 'rgba(var(--primary-rgb), <alpha-value>)',
        secondary: 'rgba(var(--secondary-rgb), <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '640px',
        editorial: '720px',
        wide: '1200px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        tight: '-0.01em',
      },
    },
  },
  plugins: [],
}
