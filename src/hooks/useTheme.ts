import { useState, useEffect } from 'react'

export type Theme = 'warm' | 'light' | 'dark'

const themes: Record<Theme, Record<string, string>> = {
  warm: {
    // ── 柔和灰绿 ──────────────────────────────
    '--page': '#DDE5DA',            // 柔和灰绿背景（低饱和，不刺眼）
    '--page-rgb': '221, 229, 218',
    '--ink': '#1B2E22',             // 深森林绿文字
    '--ink-rgb': '27, 46, 34',
    '--muted': '#4D6E5C',           // 中灰绿
    '--muted-rgb': '77, 110, 92',
    '--line': '#B5C9BC',            // 柔和绿灰边框
    '--line-rgb': '181, 201, 188',
    '--accent': '#2D5A3D',          // 森林绿主色
    '--accent-rgb': '45, 90, 61',
    '--vermilion': '#A04634',       // 稳重砖红
    '--vermilion-rgb': '160, 70, 52',
    '--card-bg': '#EDF2EE',         // 浅灰绿卡片
    '--card-bg-rgb': '237, 242, 238',
    '--card-border': '#B5C9BC',
    '--card-border-rgb': '181, 201, 188',
    '--surface': '#EDF2EE',
    '--surface-rgb': '237, 242, 238',
    '--surface-variant': '#D4DDD6',
    '--surface-variant-rgb': '212, 221, 214',
    '--primary': '#2D5A3D',
    '--primary-rgb': '45, 90, 61',
    '--secondary': '#4D6E5C',
    '--secondary-rgb': '77, 110, 92',
  },
  light: {
    // ── 清爽白色 ──────────────────────────────
    '--page': '#F8FAF9',            // 极淡绿白
    '--page-rgb': '248, 250, 249',
    '--ink': '#1B2E22',
    '--ink-rgb': '27, 46, 34',
    '--muted': '#4D6E5C',
    '--muted-rgb': '77, 110, 92',
    '--line': '#C5D6CB',
    '--line-rgb': '197, 214, 203',
    '--accent': '#2D5A3D',
    '--accent-rgb': '45, 90, 61',
    '--vermilion': '#A04634',
    '--vermilion-rgb': '160, 70, 52',
    '--card-bg': '#FFFFFF',
    '--card-bg-rgb': '255, 255, 255',
    '--card-border': '#C5D6CB',
    '--card-border-rgb': '197, 214, 203',
    '--surface': '#FFFFFF',
    '--surface-rgb': '255, 255, 255',
    '--surface-variant': '#EEF2EF',
    '--surface-variant-rgb': '238, 242, 239',
    '--primary': '#2D5A3D',
    '--primary-rgb': '45, 90, 61',
    '--secondary': '#4D6E5C',
    '--secondary-rgb': '77, 110, 92',
  },
  dark: {
    // ── 深邃森林 ──────────────────────────────
    '--page': '#0D1B12',            // 深森林绿背景
    '--page-rgb': '13, 27, 18',
    '--ink': '#D9E8DE',             // 浅薄荷文字
    '--ink-rgb': '217, 232, 222',
    '--muted': '#7FA38E',
    '--muted-rgb': '127, 163, 142',
    '--line': '#243D2E',
    '--line-rgb': '36, 61, 46',
    '--accent': '#5C9E7A',          // 亮森林绿
    '--accent-rgb': '92, 158, 122',
    '--vermilion': '#E06B58',
    '--vermilion-rgb': '224, 107, 88',
    '--card-bg': '#142B1C',
    '--card-bg-rgb': '20, 43, 28',
    '--card-border': '#243D2E',
    '--card-border-rgb': '36, 61, 46',
    '--surface': '#142B1C',
    '--surface-rgb': '20, 43, 28',
    '--surface-variant': '#1B2E22',
    '--surface-variant-rgb': '27, 46, 34',
    '--primary': '#5C9E7A',
    '--primary-rgb': '92, 158, 122',
    '--secondary': '#7FA38E',
    '--secondary-rgb': '127, 163, 142',
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