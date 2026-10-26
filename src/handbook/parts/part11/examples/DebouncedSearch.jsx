import { useEffect, useState } from 'react'
import { useDebouncedValue } from './hooks/useDebouncedValue.js'
import { fakeSearchCustomers } from './fakeCustomerSearch.js'

export default function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [keystrokes, setKeystrokes] = useState(0)
  const [results, setResults] = useState([])
  const [requestLog, setRequestLog] = useState([])

  // The input updates instantly; the debounced value waits for a 400 ms pause
  const debouncedQuery = useDebouncedValue(query, 400)

  function handleChange(e) {
    setQuery(e.target.value)
    setKeystrokes((k) => k + 1)
  }

  // Search only when the DEBOUNCED value changes: one request per pause, not per key
  useEffect(() => {
    if (debouncedQuery.trim() === '') return
    let ignore = false
    fakeSearchCustomers(debouncedQuery, { delay: 500 })
      .then((response) => response.json())
      .then((data) => {
        // Log every request when its answer arrives (also outdated ones)
        setRequestLog((prev) => [...prev, { n: prev.length + 1, query: debouncedQuery, count: data.length, ignored: ignore }])
        if (!ignore) setResults(data)
      })
    return () => {
      ignore = true
    }
  }, [debouncedQuery])

  // Derived: no results to show for an empty search
  const visibleResults = query.trim() === '' ? [] : results

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Type a customer name, e.g. maju" />
      <p>
        Keystrokes: <strong>{keystrokes}</strong> · Debounced value: <code>{JSON.stringify(debouncedQuery)}</code> ·
        Requests sent: <strong>{requestLog.length}</strong>
      </p>
      <ul>
        {visibleResults.map((c) => (
          <li key={c.id}>
            {c.name} ({c.city})
          </li>
        ))}
      </ul>
      <h3>Request log</h3>
      <ol>
        {requestLog.map((r) => (
          <li key={r.n}>
            search={JSON.stringify(r.query)} → {r.count} results{r.ignored && ' (outdated, ignored)'}
          </li>
        ))}
      </ol>
    </div>
  )
}
