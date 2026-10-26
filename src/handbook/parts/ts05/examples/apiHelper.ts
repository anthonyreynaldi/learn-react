type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; total: number }
type Paginated<T> = { data: T[]; current_page: number; last_page: number; per_page: number; total: number }

// --- A fake server (no real network). Real app: fetch() to Laravel. ---
const orders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000 },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000 },
]
const routes: { [path: string]: unknown } = {
  '/api/orders': orders,
  '/api/orders?page=1': { data: orders, current_page: 1, last_page: 4, per_page: 2, total: 8 },
}
async function fakeFetch(path: string) {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const body = routes[path]
  return { ok: body !== undefined, status: body !== undefined ? 200 : 404, json: async (): Promise<unknown> => body }
}

// --- The generic helper ---
// The CALLER says what it expects: apiGet<Order[]>('/api/orders').
async function apiGet<T>(path: string): Promise<T> {
  const response = await fakeFetch(path)
  if (!response.ok) throw new Error(`GET ${path} failed with ${response.status}`)
  // `as T` TRUSTS the server: nothing checks that the JSON really is a T.
  // If Laravel changes its response, TypeScript won't notice. TS Part 8 adds validation.
  return (await response.json()) as T
}

export default async function run(log: Log) {
  const list = await apiGet<Order[]>('/api/orders') // list: Order[]
  log('orders:', list.map((o) => `#${o.id} ${o.customer}`))

  const page = await apiGet<Paginated<Order>>('/api/orders?page=1') // page: Paginated<Order>
  log(`page ${page.current_page}/${page.last_page}, first customer: ${page.data[0]?.customer}`)

  // page.data[0]?.custmer
  // ✗ Property 'custmer' does not exist on type 'Order'. Did you mean 'customer'?

  try {
    await apiGet<Order[]>('/api/invoices')
  } catch (err) {
    log('error:', err instanceof Error ? err.message : err)
  }
}
