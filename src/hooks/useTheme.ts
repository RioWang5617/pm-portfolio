import { useState, useEffect } from 'react'

export type Theme = 'warm' | 'light' | 'dark'

const themes: Record<Theme, Record<string, string>> = {
  warm: {
    '--bg': '#F4EFE6',
    '--text': '#0E0E0C',
    '--muted': '#6B6760',
    '--line': '#DCD6C7',
    '--accent': '#B8431F',
    '--card-bg': '#FFFFFF',
    '--card-border': '#DCD6C7',
  },
  light: {
    '--bg': '#FFFFFF',
    '--text': '#111827',
    '--muted': '#6B7280',
    '--line': '#E5E7EB',
    '--accent': '#2563EB',
    '--card-bg': '#F9FAFB',
    '--card-border': '#E5E7EB',
  },
  dark: {
    '--bg': '#111827',
    '--text': '#F9FAFB',
    '--muted': '#9CA3AF',
    '--line': '#374151',
    '--accent': '#60A5FA',
    '--card-bg': '#1F2937',
    '--card-border': '#374151',
  },
}

const themeLabels: Record<Theme, string> = {
  warm: '暖色',
  light: '白色',
  dark: '暗夜',
}

const themeIcons: Record<Theme, string> = {
  warm: '🎨',
  light: '☀️',
  dark: '🌙',
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'warm'
    }
    return 'warm'
  })

  useEffect(() => {
    const root = document.documentElement
    const themeVars = themes[theme]
    
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycleTheme = () => {
    setTheme(prev => {
      const themeOrder: Theme[] = ['warm', 'light', 'dark']
      const currentIndex = themeOrder.indexOf(prev)
      return themeOrder[(currentIndex + 1) % themeOrder.length]
    })
  }

  return { theme, setTheme, cycleTheme, themeLabels, themeIcons }
}