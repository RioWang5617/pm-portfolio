import { useState, useEffect } from 'react'

export type Theme = 'warm' | 'light' | 'dark'

const themes: Record<Theme, Record<string, string>> = {
  warm: {
    '--bg': '#F2F1ED',
    '--text': '#1C1C1A',
    '--muted': '#7B7970',
    '--line': '#DDD9CF',
    '--accent': '#5B7553',
    '--vermilion': '#C45D3E',
    '--card-bg': '#FFFFFF',
    '--card-border': '#DDD9CF',
  },
  light: {
    '--bg': '#FFFFFF',
    '--text': '#111827',
    '--muted': '#6B7280',
    '--line': '#E5E7EB',
    '--accent': '#2563EB',
    '--vermilion': '#DC2626',
    '--card-bg': '#F9FAFB',
    '--card-border': '#E5E7EB',
  },
  dark: {
    '--bg': '#111827',
    '--text': '#F9FAFB',
    '--muted': '#9CA3AF',
    '--line': '#374151',
    '--accent': '#60A5FA',
    '--vermilion': '#F87171',
    '--card-bg': '#1F2937',
    '--card-border': '#374151',
  },
}

const themeLabels: Record<Theme, string> = {
  warm: '森系',
  light: '白色',
  dark: '暗夜',
}

const themeIcons: Record<Theme, string> = {
  warm: 'leaf',
  light: 'sun',
  dark: 'moon',
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