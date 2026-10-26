import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { orders } from './orders.js'

export default function OrderReport() {
  // Only the filter SETTINGS are state...
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sortBy, setSortBy] = useState('id')

  // ...the visible list and the total are DERIVED on every render.
  // Like SQL: WHERE customer LIKE ... AND status = ...
  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.trim().toLowerCase()) &&
      (status === 'all' || o.status === status),
  )

  // ORDER BY. toSorted() returns a NEW array ([...filtered].sort() works too).
  // Never call .sort() directly on state or props: it changes the original.
  const visible =
    sortBy === 'total'
      ? filtered.toSorted((a, b) => b.total - a.total) // highest first
      : filtered.toSorted((a, b) => a.id - b.id)

  const grandTotal = visible.reduce((sum, o) => sum + o.total, 0)

  return (
    <div>
      <p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Customer name" />{' '}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>{' '}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">Sort by id</option>
          <option value="total">Sort by total (highest first)</option>
        </select>
      </p>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty state: show a message instead of an empty table */}
          {visible.length === 0 ? (
            <tr>
              <td colSpan={4}>No orders match your filter.</td>
            </tr>
          ) : (
            visible.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.status}</td>
                <td>{formatRupiah(o.total)}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Grand total ({visible.length} orders)</th>
            <th>{formatRupiah(grandTotal)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
