import { useEffect, useState } from 'react'

// Part 11's useFetch, now generic: the caller says what the data is.
//   const { data } = useFetch<Order[]>('/handbook-data/orders.json')   → data: Order[] | null
export type FetchResult<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function useFetch<T>(url: string): FetchResult<T> {
  const [result, setResult] = useState<{ url: string | null; data: T | null; error: string | null }>({
    url: null,
    data: null,
    error: null,
  })

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Server responded with ${response.status}`)
        // `as T` TRUSTS the JSON: TypeScript can't check it (TS Part 8 adds validation).
        const data = (await response.json()) as T
        if (!ignore) setResult({ url, data, error: null })
      } catch (err) {
        if (!ignore) setResult({ url, data: null, error: err instanceof Error ? err.message : String(err) })
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [url])

  const loading = result.url !== url
  return { data: loading ? null : result.data, error: loading ? null : result.error, loading }
}
