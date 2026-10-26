import { useState } from 'react'
import { AuthProvider, useAuth } from './AuthContext.jsx'

const budi = { name: 'Budi', role: 'admin' }
const sari = { name: 'Sari', role: 'staff' }

function LoginBar() {
  const { user, login, logout } = useAuth()
  if (user) return <button onClick={logout}>Logout</button>
  return (
    <p>
      <button onClick={() => login(budi)}>Log in as Budi (admin)</button>{' '}
      <button onClick={() => login(sari)}>Log in as Sari (staff)</button>
    </p>
  )
}

function UserBadge() {
  const { user } = useAuth()
  return <p>{user ? `👤 ${user.name} (${user.role})` : 'Not logged in'}</p>
}

function OrderList() {
  const { isAdmin } = useAuth()
  const [orders, setOrders] = useState([
    { id: 101, customer: 'PT Maju Jaya', status: 'pending' },
    { id: 102, customer: 'CV Sinar Abadi', status: 'pending' },
  ])

  function approve(id) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)))
  }

  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer} ({o.status}){' '}
          {/* Only admins see the button (Laravel would still check on the server!) */}
          {isAdmin && o.status === 'pending' && <button onClick={() => approve(o.id)}>Approve</button>}
        </li>
      ))}
    </ul>
  )
}

export default function AuthDemo() {
  // Everything inside AuthProvider can call useAuth(), however deep it is
  return (
    <AuthProvider>
      <LoginBar />
      <UserBadge />
      <OrderList />
    </AuthProvider>
  )
}
