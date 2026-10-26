import { useEffect, useState } from 'react'

// Loads JSON from a URL and returns { data, error, loading }.
// Everything from Part 8 (response.ok, errors, race conditions) in one hook.
export function useFetch(url) {
  // Remember WHICH url the stored result belongs to
  const [result, setResult] = useState({ url: null, data: null, error: null })

  useEffect(() => {
    if (!url) return
    let ignore = false // race-condition guard (Part 8)

    async function load() {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Server responded with ${response.status}`)
        // Vite answers a missing file with index.html and status 200
        // (single-page-app fallback), so also check that we really got JSON.
        // A Laravel API would send a proper 404 instead.
        if (!response.headers.get('content-type')?.includes('json')) {
          throw new Error('Not found (the server did not return JSON)')
        }
        const data = await response.json()
        if (!ignore) setResult({ url, data, error: null })
      } catch (err) {
        if (!ignore) setResult({ url, data: null, error: err.message })
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [url])

  // Derived: we are loading while the stored result is for a different url
  const loading = url !== null && result.url !== url
  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  }
}
