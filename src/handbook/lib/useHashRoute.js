// Handbook shell — uses concepts from later parts (useState, useEffect). You don't need to understand it yet.
//
// Keeps the selected topic in the URL hash, e.g. #part03/jsx-rules.
// Navigation uses plain <a href="#..."> links, so refresh and the Back button just work.
import { useEffect, useState } from 'react'

function readHash() {
  const [partId = '', topicId = ''] = window.location.hash.slice(1).split('/')
  return { partId, topicId }
}

export function topicHref(partId, topicId) {
  return `#${partId}/${topicId}`
}

export function useHashRoute() {
  const [route, setRoute] = useState(readHash)

  useEffect(() => {
    const onChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
