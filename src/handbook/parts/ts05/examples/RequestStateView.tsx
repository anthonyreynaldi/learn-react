import { useState } from 'react'

type Order = { id: number; customer: string }

// The generic type from the previous example: works for any data type T
type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

const sampleOrders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya' },
  { id: 102, customer: 'CV Sinar Abadi' },
]

// Here T = Order[]: in the success case, state.data is Order[]
function OrdersView({ state }: { state: RequestState<Order[]> }) {
  if (state.status === 'loading') return <p>Loading orders…</p>
  if (state.status === 'error') return <p style={{ color: 'red' }}>Error: {state.message}</p>
  return (
    <ul>
      {state.data.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer}
        </li>
      ))}
    </ul>
  )
}

export default function RequestStateView() {
  const [state, setState] = useState<RequestState<Order[]>>({ status: 'loading' })

  return (
    <div>
      <p>
        <button onClick={() => setState({ status: 'loading' })}>Loading</button>{' '}
        <button onClick={() => setState({ status: 'success', data: sampleOrders })}>Success</button>{' '}
        <button onClick={() => setState({ status: 'error', message: 'Server responded with 500' })}>Error</button>
      </p>
      <OrdersView state={state} />
    </div>
  )
}
