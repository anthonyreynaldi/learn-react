import { useEffect, useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

export default function OrderListFetch() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // The effect itself can't be async, so define an async function inside it...
    async function loadOrders() {
      try {
        // A REAL request: open DevTools → Network to see it.
        const response = await fetch('/handbook-data/orders.json')
        // fetch only rejects on network failure; a 404 or 500 still "succeeds".
        // So check response.ok yourself.
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`)
        }
        const data = await response.json()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        // Runs after success AND after an error
        setLoading(false)
      }
    }
    // ...and call it.
    loadOrders()
    // (For requests that can overlap, add an ignore flag: see "Race conditions".)
  }, [])

  // Early returns for each state, before the "happy path"
  if (loading) return <p>Loading orders…</p>
  if (error) return <p style={{ color: 'red' }}>Could not load orders: {error}</p>
  if (orders.length === 0) return <p>No orders yet.</p>

  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer}: {formatRupiah(o.total)} ({o.status})
        </li>
      ))}
    </ul>
  )
}
