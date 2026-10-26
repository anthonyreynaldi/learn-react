type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string }
type Customer = { id: number; name: string; city: string }

// T extends { id: number } is a CONSTRAINT: T can be any type, as long as it
// has an `id` that is a number. Without the constraint, item.id would be an error,
// because TypeScript can't know that every T has an id:
//   ✗ Property 'id' does not exist on type 'T'.
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id)
}

export default function run(log: Log) {
  const orders: Order[] = [
    { id: 101, customer: 'PT Maju Jaya' },
    { id: 102, customer: 'CV Sinar Abadi' },
  ]
  const customers: Customer[] = [
    { id: 1, name: 'PT Maju Jaya', city: 'Jakarta' },
    { id: 2, name: 'CV Sinar Abadi', city: 'Bandung' },
  ]

  const order = findById(orders, 102) // T = Order → Order | undefined
  const customer = findById(customers, 1) // T = Customer → Customer | undefined
  log(order?.customer, '|', customer?.city) // full types kept: customer has city

  // Strings have no id, so they don't satisfy the constraint:
  // findById(['PT Maju Jaya', 'CV Sinar Abadi'], 1)
  // ✗ Type 'string' is not assignable to type '{ id: number; }'.
}
