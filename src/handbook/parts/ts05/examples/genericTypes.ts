type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; total: number }

// A GENERIC TYPE: the shape of Laravel's paginate() JSON, for ANY kind of item.
//   return Order::paginate(15);   →   { data: [...], current_page: 1, last_page: 4, ... }
type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

// A generic discriminated union (TS Part 4): the state of loading ANY data.
type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

export default function run(log: Log) {
  // Fill in T = Order: data is now Order[]
  const page: Paginated<Order> = {
    data: [
      { id: 101, customer: 'PT Maju Jaya', total: 750000 },
      { id: 102, customer: 'CV Sinar Abadi', total: 1250000 },
    ],
    current_page: 1,
    last_page: 4,
    per_page: 2,
    total: 8,
  }
  log(`Page ${page.current_page} of ${page.last_page} (${page.total} orders)`)
  log(page.data.map((o) => o.customer)) // o: Order

  // The same RequestState type for different data:
  const ordersState: RequestState<Order[]> = { status: 'success', data: page.data }
  const countState: RequestState<number> = { status: 'error', message: 'Timeout' }

  if (ordersState.status === 'success') log('orders loaded:', ordersState.data.length) // data: Order[]
  if (countState.status === 'error') log('count failed:', countState.message)
}
