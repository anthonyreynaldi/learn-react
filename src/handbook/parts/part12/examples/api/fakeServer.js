// A fake Laravel API that runs in the browser, so the examples work without
// a backend. fakeFetch(url, options) behaves like fetch(): it resolves to a
// Response-like object { ok, status, json() }.
//
// Routes (all JSON, like routes/api.php):
//   POST /api/login                  { email, password } → { token, user } | 422
//   POST /api/logout                 (auth)
//   GET  /api/user                   (auth) → the logged-in user
//   GET  /api/orders                 (auth) → list
//   GET  /api/orders/{id}            (auth) → one order | 404
//   POST /api/orders                 (auth) → 201 | 422 validation errors
//   PUT  /api/orders/{id}/approve    (auth, admin only) → 200 | 403
// Every (auth) route answers 401 without a valid "Authorization: Bearer <token>".

const users = [
  { id: 1, name: 'Budi Santoso', email: 'budi@ptmaju.test', password: 'secret123', role: 'admin' },
  { id: 2, name: 'Sari Wulandari', email: 'sari@ptmaju.test', password: 'secret123', role: 'staff' },
]

const orders = [
  { id: 101, customer: 'PT Maju Jaya', warehouse: 'SBY', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', warehouse: 'JKT', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', warehouse: 'SBY', total: 480000, status: 'pending' },
]
let nextOrderId = 104

// token → user id. Lives in memory, like a sessions/tokens table.
const tokens = new Map()

// Used by the "Simulate expired session" button: every token becomes invalid.
export function expireAllTokens() {
  tokens.clear()
}

const publicUser = ({ password: _password, ...user }) => user // never send the password back

function reply(status, body = null) {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

function validateOrder(data) {
  const errors = {}
  const customer = String(data.customer ?? '').trim()
  if (customer === '') errors.customer = ['The customer field is required.']
  else if (customer.length > 100) errors.customer = ['The customer may not be greater than 100 characters.']
  if (!['SBY', 'JKT'].includes(data.warehouse)) errors.warehouse = ['The selected warehouse is invalid.']
  if (!Number.isInteger(data.total) || data.total < 1) errors.total = ['The total must be an integer of at least 1.']
  return errors
}

function handle(method, path, headers, body) {
  if (method === 'POST' && path === '/api/login') {
    const user = users.find((u) => u.email === body?.email && u.password === body?.password)
    if (!user) {
      return reply(422, {
        message: 'The given data was invalid.',
        errors: { email: ['These credentials do not match our records.'] },
      })
    }
    const token = crypto.randomUUID()
    tokens.set(token, user.id)
    return reply(200, { token, user: publicUser(user) })
  }

  // Everything below requires a valid Bearer token (like the auth:api middleware)
  const token = headers.Authorization?.replace(/^Bearer /, '')
  const user = users.find((u) => u.id === tokens.get(token))
  if (!user) return reply(401, { message: 'Unauthenticated.' })

  if (method === 'POST' && path === '/api/logout') {
    tokens.delete(token)
    return reply(204)
  }
  if (method === 'GET' && path === '/api/user') return reply(200, publicUser(user))
  if (method === 'GET' && path === '/api/orders') return reply(200, orders)

  const match = path.match(/^\/api\/orders\/(\d+)(\/approve)?$/)
  if (match) {
    const order = orders.find((o) => o.id === Number(match[1]))
    if (!order) return reply(404, { message: 'Order not found.' })
    if (method === 'GET' && !match[2]) return reply(200, order)
    if (method === 'PUT' && match[2]) {
      // Server-side authorization: like $this->authorize('approve', $order)
      if (user.role !== 'admin') return reply(403, { message: 'This action is unauthorized.' })
      order.status = 'approved'
      return reply(200, order)
    }
  }

  if (method === 'POST' && path === '/api/orders') {
    const errors = validateOrder(body ?? {})
    if (Object.keys(errors).length > 0) return reply(422, { message: 'The given data was invalid.', errors })
    const order = { id: nextOrderId++, status: 'pending', ...body, customer: body.customer.trim() }
    orders.push(order)
    return reply(201, order)
  }

  return reply(404, { message: 'Not found.' })
}

// Works like fetch(url, { method, headers, body })
export function fakeFetch(url, { method = 'GET', headers = {}, body } = {}) {
  const path = new URL(url, 'http://fake.test').pathname
  const delay = path === '/api/user' ? 800 : 300 // the session check is slower, so "checking" is visible
  return new Promise((resolve) => {
    setTimeout(() => resolve(handle(method, path, headers, body ? JSON.parse(body) : undefined)), delay)
  })
}
