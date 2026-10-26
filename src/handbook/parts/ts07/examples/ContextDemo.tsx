import { useState } from 'react'
import { AuthProvider, useAuth, type User } from './auth/AuthContext.tsx'
import { sampleOrders, type OrderStatus } from './types.ts'

const budi: User = { name: 'Budi', role: 'admin' }
const sari: User = { name: 'Sari', role: 'staff' }

function LoginBar() {
  const { user, login, logout } = useAuth() // fully typed, never null
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
  // user is User | null, so ?. / a check is required
  return <p>{user ? `👤 ${user.name} (${user.role})` : 'Not logged in'}</p>
}

function OrderList() {
  const { isAdmin } = useAuth()
  const [statuses, setStatuses] = useState<Record<number, OrderStatus>>(
    Object.fromEntries(sampleOrders.map((o) => [o.id, o.status])),
  )
  return (
    <ul>
      {sampleOrders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer} ({statuses[o.id]}){' '}
          {isAdmin && statuses[o.id] === 'pending' && (
            <button onClick={() => setStatuses({ ...statuses, [o.id]: 'approved' })}>Approve</button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ContextDemo() {
  return (
    <AuthProvider>
      <LoginBar />
      <UserBadge />
      <OrderList />
    </AuthProvider>
  )
}
