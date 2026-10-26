type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; status: 'pending' | 'approved' }

const database: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', status: 'pending' },
  { id: 102, customer: 'CV Sinar Abadi', status: 'approved' },
]

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

// An async function ALWAYS returns a Promise, so the return type is Promise<Order>:
// "a Promise that will eventually give you an Order".
async function fakeFetchOrder(id: number): Promise<Order> {
  await wait(400) // pretend network delay (no real request)
  const order = database.find((o) => o.id === id)
  if (!order) throw new Error(`Order #${id} not found`)
  // In a real app this would come from Laravel as JSON. We TRUST that it matches
  // the Order type. TypeScript doesn't check it at runtime (TS Part 8 covers validation).
  return { ...order }
}

// Promise<void>: it finishes, but gives back no value
async function approveOrder(id: number): Promise<void> {
  await wait(300)
  const order = database.find((o) => o.id === id)
  if (order) order.status = 'approved'
}

export default async function run(log: Log) {
  const promise = fakeFetchOrder(101) // type: Promise<Order>
  log('without await:', promise)

  const order = await promise // await unwraps it → type: Order
  log('with await:', order)

  await approveOrder(101)
  log('after approving:', await fakeFetchOrder(101))

  try {
    await fakeFetchOrder(999)
  } catch (err) {
    // err is `unknown` in strict mode (anything can be thrown), so check it first
    log('error:', err instanceof Error ? err.message : err)
  }
}
