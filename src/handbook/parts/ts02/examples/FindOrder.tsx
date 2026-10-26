import { useState } from 'react'

type Order = { id: number; customer: string; total: number }

const orders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000 },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000 },
  { id: 103, customer: 'PT Karya Baru', total: 480000 },
]

const box = { border: '1px solid #ddd', borderRadius: 6, padding: 8, minWidth: 180 }

// (Typing props like { order: Order | undefined } is covered in a later TS part.)

// 1. An if check: inside the if, TypeScript knows order is an Order ("narrowing")
function WithIfCheck({ order }: { order: Order | undefined }) {
  if (!order) {
    return <p>Not found</p>
  }
  return <p>{order.customer}</p> // ✓ order is Order here
}

// 2. Optional chaining: order?.customer is undefined when order is undefined
function WithOptionalChaining({ order }: { order: Order | undefined }) {
  return <p>Customer: {order?.customer}</p> // shows nothing when not found
}

// 3. ?? gives a fallback for undefined (and null)
function WithFallback({ order }: { order: Order | undefined }) {
  return <p>{order?.customer ?? 'Not found'}</p>
}

export default function FindOrder() {
  const [idText, setIdText] = useState('101')

  // find returns Order | undefined: there may be no match
  const order = orders.find((o) => o.id === Number(idText))

  return (
    <div>
      <label>
        Order id <input value={idText} onChange={(e) => setIdText(e.target.value)} style={{ width: 80 }} />
      </label>{' '}
      <small>(try 101, 102, 103 or 999)</small>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
        <div style={box}>
          <strong>if check</strong>
          <WithIfCheck order={order} />
        </div>
        <div style={box}>
          <strong>?.</strong>
          <WithOptionalChaining order={order} />
        </div>
        <div style={box}>
          <strong>?? "Not found"</strong>
          <WithFallback order={order} />
        </div>
      </div>
    </div>
  )
}
