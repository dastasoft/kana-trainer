import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

export default function useDarkSide(): [
  'light' | 'dark',
  Dispatch<SetStateAction<'light' | 'dark'>>
] {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    window.localStorage.setItem('theme', theme)
  }, [theme, colorTheme])

  return [colorTheme, setTheme]
}
