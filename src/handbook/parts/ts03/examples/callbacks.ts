type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; total: number; status: string }

const orders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'pending' },
]

export default function run(log: Log) {
  // No annotations on o, sum, etc.: TypeScript knows orders is Order[],
  // so it knows what each callback receives. That's CONTEXTUAL TYPING.

  const names = orders.map((o) => o.customer) // o: Order → names: string[]
  log('map:', names)

  const pending = orders.filter((o) => o.status === 'pending') // pending: Order[]
  log('filter:', pending.map((o) => o.id))

  const big = orders.find((o) => o.total > 1000000) // big: Order | undefined
  log('find:', big?.customer)

  const total = orders.reduce((sum, o) => sum + o.total, 0) // sum: number, o: Order → total: number
  log('reduce:', total)

  // And mistakes inside callbacks are caught too:
  // orders.map((o) => o.custmer)
  // ✗ Property 'custmer' does not exist on type 'Order'. Did you mean 'customer'?
}
