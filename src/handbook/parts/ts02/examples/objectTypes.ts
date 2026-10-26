type Log = (...values: unknown[]) => void

// A type alias describes the SHAPE of an object: which properties, which types.
// Like a PHP class with typed properties, but only for checking; no code is generated.
type Order = {
  id: number
  customer: string
  total: number
  status: string
}

export default function run(log: Log) {
  const orders: Order[] = [
    { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
    { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  ]

  // A missing property:
  // const bad: Order = { id: 103, customer: 'PT Karya Baru', total: 480000 }
  // ✗ Property 'status' is missing in type '{ id: number; customer: string; total: number; }'
  //   but required in type 'Order'.

  // A typo:
  // const typo: Order = { id: 104, custmer: 'PT Maju Jaya', total: 2100000, status: 'pending' }
  // ✗ Object literal may only specify known properties, but 'custmer' does not exist
  //   in type 'Order'. Did you mean to write 'customer'?

  for (const order of orders) {
    log(`#${order.id} ${order.customer}: ${order.total} (${order.status})`)
  }
}
