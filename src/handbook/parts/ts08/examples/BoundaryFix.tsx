import { useEffect, useState } from 'react'
import { z } from 'zod'
import { apiGet } from './apiGet.ts'
import { OrderStatusSchema, type Order } from './schemas.ts'

// A schema for what Laravel REALLY sends, which then CONVERTS it into our Order.
const LaravelOrderSchema = z
  .object({
    id: z.number().int(),
    customer_name: z.string(),
    total: z.coerce.number(), // "750000.00" → 750000 (coerce = convert, like (float) in PHP)
    status: OrderStatusSchema,
  })
  // transform runs after the checks: rename snake_case to the app's camelCase/plain names
  .transform(({ customer_name, ...rest }): Order => ({ ...rest, customer: customer_name }))

const LaravelOrdersSchema = z.array(LaravelOrderSchema)

export default function BoundaryFix() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    // Same "drifted" file as in "Types can lie", but fixed ONCE, at the boundary.
    // Everything after this line works with clean, correctly typed Orders.
    apiGet('/handbook-data/ts8/orders-laravel.json', LaravelOrdersSchema)
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer}: {o.total + 1000} (total + 1000)
        </li>
      ))}
    </ul>
  )
}
