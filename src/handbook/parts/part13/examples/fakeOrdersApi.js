// A fake orders API for the TanStack Query example.
// Real app: fetch('/api/orders?status=...') to Laravel, through the API client (Part 12).

const orders = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'pending' },
  { id: 104, customer: 'PT Maju Jaya', total: 2100000, status: 'pending' },
  { id: 105, customer: 'CV Sinar Abadi', total: 320000, status: 'approved' },
  { id: 106, customer: 'PT Karya Baru', total: 1640000, status: 'rejected' },
]

// --- A request counter the UI can subscribe to (useSyncExternalStore, Part 11) ---
let requestCount = 0
const listeners = new Set()

function countRequest() {
  requestCount += 1
  listeners.forEach((listener) => listener())
}

export function subscribeToRequests(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getRequestCount() {
  return requestCount
}

// --- The "endpoints" ---

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    // TanStack Query passes an AbortSignal; a real fetch(url, { signal }) would cancel itself
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

// GET /api/orders?status=pending
export async function fetchOrders({ status, signal }) {
  countRequest()
  await wait(800, signal)
  const list = status === 'all' ? orders : orders.filter((o) => o.status === status)
  return structuredClone(list) // a fresh copy, like JSON from a server
}

// PUT /api/orders/{id}/approve
export async function approveOrder(id) {
  countRequest()
  await wait(600)
  const order = orders.find((o) => o.id === id)
  order.status = 'approved'
  return structuredClone(order)
}
