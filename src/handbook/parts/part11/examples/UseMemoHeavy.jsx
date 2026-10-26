import { useMemo, useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { generateOrders } from './generateOrders.js'

const bigOrders = generateOrders(20000)

// The expensive calculation. It measures ITSELF and returns the timing
// together with the result, so nothing has to be stored during render.
function filterAndSort(orders, search, status) {
  const start = performance.now()
  const q = search.trim().toLowerCase()
  const rows = orders
    .filter((o) => (status === 'all' || o.status === status) && o.customer.toLowerCase().includes(q))
    .toSorted((a, b) => b.total - a.total)
  const ms = performance.now() - start
  const finished = new Date()
  const at = `${finished.toLocaleTimeString('id-ID')}.${String(finished.getMilliseconds()).padStart(3, '0')}`
  return { rows, ms, at }
}

export default function UseMemoHeavy() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [useMemoEnabled, setUseMemoEnabled] = useState(true)
  const [clicks, setClicks] = useState(0)

  // Hooks can't be called inside an if, so useMemo ALWAYS runs. It only
  // recalculates when search or status changed; otherwise it returns the cached result.
  const memoResult = useMemo(() => filterAndSort(bigOrders, search, status), [search, status])

  // With the checkbox off, we ignore the cache and calculate on EVERY render
  const result = useMemoEnabled ? memoResult : filterAndSort(bigOrders, search, status)

  return (
    <div>
      <p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by customer" />{' '}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </p>
      <p>
        <label>
          <input type="checkbox" checked={useMemoEnabled} onChange={(e) => setUseMemoEnabled(e.target.checked)} /> Use
          useMemo
        </label>{' '}
        <button onClick={() => setClicks(clicks + 1)}>Unrelated re-render ({clicks})</button>
      </p>
      <p>
        <strong>
          {result.rows.length.toLocaleString('id-ID')} of {bigOrders.length.toLocaleString('id-ID')} orders
        </strong>{' '}
        — calculation took {result.ms.toFixed(1)} ms, finished at {result.at}
      </p>
      <ol>
        {result.rows.slice(0, 5).map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer} ({o.status}) {formatRupiah(o.total)}
          </li>
        ))}
      </ol>
    </div>
  )
}
