import { useEffect, useState } from 'react'

type Order = { id: number; customer: string }

// You have been using generic types all along. The <...> fills in their type parameter.

// Array<T>: an array of T. string[] is a shortcut for Array<string>.
const cities: Array<string> = ['Surabaya', 'Jakarta']

// Promise<T>: a Promise that will resolve to a T (TS Part 3).
async function fetchOrders(): Promise<Order[]> {
  return [{ id: 101, customer: 'PT Maju Jaya' }]
}

export function OrdersList() {
  // useState<T>: the state holds a T.
  // With [] alone TypeScript can't know what the array will contain,
  // so say it: useState<Order[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders().then(setOrders) // ✓ Promise<Order[]> matches the state type
  }, [])

  return (
    <>
      <p>Warehouses: {cities.join(', ')}</p>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>{o.customer}</li> // o: Order
        ))}
      </ul>
    </>
  )
}

// Others you'll meet: useRef<HTMLInputElement>(null), Map<number, Order>,
// Record<OrderStatus, string>, useReducer's state and action types.
