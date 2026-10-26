import { useState } from 'react'

type Order = { id: number; customer: string }

// A DISCRIMINATED UNION: three shapes, each with a different `status` value.
// status is the "discriminant": checking it tells TypeScript which shape you have.
type OrdersState =
  | { status: 'loading' }
  | { status: 'success'; orders: Order[] }
  | { status: 'error'; message: string }

const sampleOrders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya' },
  { id: 102, customer: 'CV Sinar Abadi' },
]

function OrdersView({ state }: { state: OrdersState }) {
  switch (state.status) {
    case 'loading':
      return <p>Loading orders…</p> // here: only { status: 'loading' }, no orders, no message
    case 'error':
      return <p style={{ color: 'red' }}>Error: {state.message}</p> // here: message exists
    case 'success':
      // here: orders exists (state.message would be an error:
      // Property 'message' does not exist on type '{ status: "success"; orders: Order[]; }')
      return (
        <ul>
          {state.orders.map((o) => (
            <li key={o.id}>
              #{o.id} {o.customer}
            </li>
          ))}
        </ul>
      )
  }
}

export default function OrdersStateView() {
  const [state, setState] = useState<OrdersState>({ status: 'loading' })

  return (
    <div>
      <p>
        <button onClick={() => setState({ status: 'loading' })}>Loading</button>{' '}
        <button onClick={() => setState({ status: 'success', orders: sampleOrders })}>Success</button>{' '}
        <button onClick={() => setState({ status: 'error', message: 'Server responded with 500' })}>Error</button>
      </p>
      <OrdersView state={state} />
      <small>state: {JSON.stringify(state)}</small>
    </div>
  )
}
