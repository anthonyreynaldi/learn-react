// Sample orders and fake API functions for the routing examples.
// In a real app these would be fetch() calls to Laravel (see "Central API client").

export const orders = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved', date: '2026-09-02' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending', date: '2026-09-05' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'rejected', date: '2026-09-11' },
  { id: 104, customer: 'PT Maju Jaya', total: 2100000, status: 'pending', date: '2026-09-18' },
  { id: 105, customer: 'CV Sinar Abadi', total: 320000, status: 'approved', date: '2026-09-25' },
  { id: 106, customer: 'PT Karya Baru', total: 1640000, status: 'approved', date: '2026-10-02' },
  { id: 107, customer: 'PT Maju Jaya', total: 905000, status: 'pending', date: '2026-10-09' },
  { id: 108, customer: 'CV Sinar Abadi', total: 560000, status: 'rejected', date: '2026-10-16' },
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Like GET /api/orders/{id}: resolves with the order, or null when not found
export async function fakeFetchOrder(id, { delay = 400 } = {}) {
  await wait(delay)
  return orders.find((o) => o.id === id) ?? null
}

let nextId = 109

// Like POST /api/orders: "saves" the order and returns it with a new id
export async function fakeSaveOrder(data, { delay = 600 } = {}) {
  await wait(delay)
  const order = { id: nextId++, status: 'pending', date: new Date().toISOString().slice(0, 10), ...data }
  orders.push(order)
  return order
}
