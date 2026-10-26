import { useEffect, useState } from 'react'

type Order = { id: number; customer: string; total: number; status: string }

// A TRUSTING helper (TS Part 5): `as T` promises the data matches. Nothing checks it.
async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path)
  return (await response.json()) as T
}

export default function TypesCanLie() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // The JSON really contains customer_name and total as STRINGS like "750000.00",
    // but we told TypeScript it's Order[]. So it believes us.
    apiGet<Order[]>('/handbook-data/ts8/orders-laravel.json').then(setOrders)
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Customer</th>
          <th>Total + 1000 (shipping)</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>#{o.id}</td>
            {/* o.customer is "string" to TypeScript, undefined in reality → empty cell */}
            <td>{o.customer}</td>
            {/* o.total is "number" to TypeScript, "750000.00" in reality → "750000.001000" */}
            <td>{o.total + 1000}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
