import { useFetch } from './hooks/useFetch.ts'
import { formatRupiah, type Order } from './types.ts'

export default function FetchOrdersDemo() {
  // T = Order[]: data is Order[] | null. A REAL fetch of public/handbook-data/orders.json.
  const { data: orders, error, loading } = useFetch<Order[]>('/handbook-data/orders.json')

  if (loading) return <p>Loading orders…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (!orders) return null // narrowing: below, orders is Order[]

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
