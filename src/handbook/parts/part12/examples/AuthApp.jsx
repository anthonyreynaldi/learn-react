import { useEffect, useState } from 'react'
import { Link, MemoryRouter, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router'
import { formatRupiah } from '../../../../utils/format'
import AddressBar from './router/AddressBar.jsx'
import { api, ApiError } from './api/client.js'
import { expireAllTokens } from './api/fakeServer.js'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import RequireAuth from './auth/RequireAuth.jsx'

const navStyle = ({ isActive }) => ({ marginRight: 12, fontWeight: isActive ? 'bold' : 'normal' })

function LoginPage() {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('budi@ptmaju.test')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Where RequireAuth sent us from (or the dashboard)
  const from = location.state?.from?.pathname ?? '/'

  if (status === 'authenticated') return <Navigate to={from} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
      navigate(from, { replace: true }) // back to the page the user asked for
    } catch (err) {
      setError(err instanceof ApiError ? (err.errors.email?.[0] ?? err.message) : 'Network error.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      {from !== '/' && <p style={{ color: '#b45309' }}>Please log in to see {from}.</p>}
      <p style={{ background: '#f4f4f5', padding: 8 }}>
        Demo users (password <code>secret123</code>): <code>budi@ptmaju.test</code> (admin), <code>sari@ptmaju.test</code>{' '}
        (staff)
      </p>
      <p>
        <label>
          Email <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </p>
      <p>
        <label>
          Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </p>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  )
}

function AppLayout() {
  const { user, logout } = useAuth()

  function simulateExpiredSession() {
    expireAllTokens() // the server forgets every token
    api.get('/api/user').catch(() => {}) // next request → 401 → the AuthProvider logs us out
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: 8 }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <NavLink to="/" end style={navStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/orders" style={navStyle}>
          Orders
        </NavLink>
        <span style={{ marginLeft: 'auto' }}>
          👤 {user.name} ({user.role})
        </span>
        <button onClick={logout}>Logout</button>
        <button onClick={simulateExpiredSession}>Simulate expired session</button>
      </header>
      <Outlet />
    </div>
  )
}

function DashboardPage() {
  const { user } = useAuth()
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user.name}.</p>
      <Link to="/orders">Go to orders</Link>
    </div>
  )
}

function OrdersPage() {
  const { isAdmin } = useAuth()
  const [orders, setOrders] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let ignore = false
    api
      .get('/api/orders')
      .then((data) => {
        if (!ignore) setOrders(data)
      })
      .catch(() => {}) // a 401 is handled centrally by the AuthProvider
    return () => {
      ignore = true
    }
  }, [])

  async function approve(id) {
    try {
      const updated = await api.put(`/api/orders/${id}/approve`)
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
      setMessage(`Order #${id} approved.`)
    } catch (err) {
      setMessage(err instanceof ApiError ? `Server said ${err.status}: ${err.message}` : 'Network error.')
    }
  }

  if (orders === null) return <p>Loading orders…</p>

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer} · {formatRupiah(o.total)} · {o.status}{' '}
            {/* UX only: hide the button for staff. The server checks again. */}
            {isAdmin && o.status === 'pending' && <button onClick={() => approve(o.id)}>Approve</button>}
            {!isAdmin && o.status === 'pending' && (
              <button onClick={() => approve(o.id)} style={{ opacity: 0.6 }} title="Sends the request anyway">
                Try approving via API
              </button>
            )}
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  )
}

export default function AuthApp() {
  // Real apps use <BrowserRouter> in main.jsx. Starts at /orders on purpose:
  // you are sent to /login first, then back to /orders after logging in.
  return (
    <MemoryRouter initialEntries={['/orders']}>
      <AuthProvider>
        <AddressBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Everything inside RequireAuth needs a logged-in user */}
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
          </Route>
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}
