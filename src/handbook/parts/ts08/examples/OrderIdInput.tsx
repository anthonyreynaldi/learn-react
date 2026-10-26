import { useState } from 'react'
import { z } from 'zod'

// Form values and URL params are always STRINGS. This schema converts AND checks:
// coerce.number(): "102" → 102 (and "abc" → NaN, which fails), int(): no decimals, positive(): > 0
const OrderIdSchema = z.coerce.number().int().positive()

export default function OrderIdInput() {
  const [text, setText] = useState('102')

  // Validation result is DERIVED from the input (Part 9 client-side validation)
  const result = OrderIdSchema.safeParse(text)

  return (
    <div>
      <label>
        Order id <input value={text} onChange={(e) => setText(e.target.value)} style={{ width: 80 }} />
      </label>{' '}
      <small>(try 102, abc, -5, 1.5)</small>
      {result.success ? (
        // result.data is a number here
        <p style={{ color: 'green' }}>
          Valid: {result.data} (typeof {typeof result.data}) → fetch /api/orders/{result.data}
        </p>
      ) : (
        <p style={{ color: '#b91c1c' }}>{result.error.issues[0]?.message}</p>
      )}
    </div>
  )
}
