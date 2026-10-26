// Handbook shell — uses concepts from later parts (useState, useEffect). You don't need to understand it yet.
//
// Light/dark mode. Adds the "dark" class to <html> (Tailwind's dark: variant
// reads it) and remembers the user's choice in localStorage.
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'react-handbook-theme'

function initialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }

  return { theme, toggleTheme }
}
