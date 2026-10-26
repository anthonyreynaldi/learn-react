// The handbook's log function: log(...values) prints one line
type Log = (...values: unknown[]) => void

// No type annotations below except on `run`: TypeScript INFERS every type
// from the value. Hover a variable in your editor to see what it inferred.
export default function run(log: Log) {
  let qty = 3 // number
  let customer = 'PT Maju Jaya' // string
  const status = 'pending' // "pending": a const can never change, so its type is that exact value
  log(qty, customer, status, '→', typeof qty, typeof customer, typeof status)

  qty = qty + 1 // ✓ still a number
  customer = customer.toUpperCase() // ✓ still a string
  // qty = 'four'   ✗ Type 'string' is not assignable to type 'number'.
  log(qty, customer)

  // { id: number; customer: string; total: number }[]  (an array of objects)
  const orders = [
    { id: 101, customer: 'PT Maju Jaya', total: 750000 },
    { id: 102, customer: 'CV Sinar Abadi', total: 1250000 },
  ]
  log(orders)

  const names = orders.map((o) => o.customer) // string[]  (map returns what the callback returns)
  log(names)

  const grandTotal = orders.reduce((sum, o) => sum + o.total, 0) // number
  log('grandTotal:', grandTotal)

  // { id: number; customer: string; total: number } | undefined
  // find can return nothing, and TypeScript knows it.
  const found = orders.find((o) => o.id === 999)
  log('found?.customer:', found?.customer) // ?. is required: found may be undefined
}
