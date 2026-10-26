// Handbook shell — uses concepts from later parts (useState, useEffect). You don't need to understand it yet.
//
// Returns true while a CSS media query matches, e.g. useMediaQuery('(min-width: 1280px)').
import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}
