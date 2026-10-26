// A fake orders API shared by all TanStack parts. No real network: the "database"
// is an in-memory array, and every call waits a little, like a request to Laravel.
// Real app: fetch('/api/orders?status=…') through your API client (React Part 12).
import { z } from 'zod'

// ── Schemas and types (TS Part 8: validate at the boundary) ─────────────────
export const OrderStatusSchema = z.enum(['pending', 'approved', 'rejected'])
export type OrderStatus = z.infer<typeof OrderStatusSchema>

export const OrderSchema = z.object({
  id: z.number().int(),
  customer: z.string(),
  total: z.number(),
  status: OrderStatusSchema,
})
export type Order = z.infer<typeof OrderSchema>
const OrdersSchema = z.array(OrderSchema)

// What the "create order" form sends (no id or status yet)
export const NewOrderSchema = z.object({
  customer: z.string().trim().min(1, 'Please enter a customer.').max(100, 'At most 100 characters.'),
  total: z.number({ error: 'Please enter a total.' }).int('Whole rupiah only.').min(1000, 'At least Rp 1.000.'),
})
export type NewOrder = z.infer<typeof NewOrderSchema>

// ── ~40 sample orders (deterministic, so every page load is the same) ────────
const customers = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru', 'CV Berkah Jaya', 'PT Sentosa Abadi', 'UD Makmur']
const statuses: OrderStatus[] = ['pending', 'approved', 'rejected']

export const seedOrders: Order[] = Array.from({ length: 40 }, (_, i) => ({
  id: 1001 + i,
  customer: customers[(i * 7) % customers.length],
  total: (((i * 37) % 48) + 2) * 50000, // Rp 100.000 – 2.450.000
  status: statuses[(i * 5) % 7 === 0 ? 2 : (i * 3) % 4 === 0 ? 1 : 0],
}))

const database: Order[] = structuredClone(seedOrders)
let nextId = 1041

// ── A request counter the UI can subscribe to (useSyncExternalStore) ────────
let requestCount = 0
const listeners = new Set<() => void>()
export function subscribeToRequests(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export function getRequestCount() {
  return requestCount
}

async function request<T>(schema: z.ZodType<T>, produce: () => unknown, delay = 700): Promise<T> {
  requestCount += 1
  listeners.forEach((listener) => listener())
  await new Promise((resolve) => setTimeout(resolve, delay))
  // structuredClone: the "JSON" is a fresh copy; parse: we validate it like real API data
  return schema.parse(structuredClone(produce()))
}

// ── Endpoints ────────────────────────────────────────────────────────────────

// GET /api/orders?status=pending
export function fetchOrders(status: OrderStatus | 'all'): Promise<Order[]> {
  return request(OrdersSchema, () => (status === 'all' ? database : database.filter((o) => o.status === status)))
}

// PUT /api/orders/{id}/approve
export function approveOrder(id: number): Promise<Order> {
  return request(
    OrderSchema,
    () => {
      const order = database.find((o) => o.id === id)
      if (!order) throw new Error(`Order #${id} not found`)
      order.status = 'approved'
      return order
    },
    500,
  )
}

// POST /api/orders
export function createOrder(data: NewOrder): Promise<Order> {
  return request(
    OrderSchema,
    () => {
      const order: Order = { id: nextId++, customer: data.customer.trim(), total: data.total, status: 'pending' }
      database.unshift(order) // newest first
      return order
    },
    600,
  )
}
