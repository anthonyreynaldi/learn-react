const currentUser = { name: 'Budi', role: 'admin' }

const sidebarStyle = { border: '1px dashed #999', padding: 8 }

// The only component that actually USES the user
function UserBadge({ user }) {
  return (
    <p>
      👤 {user.name} ({user.role})
    </p>
  )
}

// Only passes user along: it doesn't use it itself
function Menu({ user }) {
  return (
    <div>
      <ul>
        <li>Orders</li>
        <li>Customers</li>
      </ul>
      <UserBadge user={user} />
    </div>
  )
}

// Only passes user along
function Sidebar({ user }) {
  return (
    <aside style={sidebarStyle}>
      <strong>Sidebar</strong>
      <Menu user={user} />
    </aside>
  )
}

// Only passes user along
function Layout({ user }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Sidebar user={user} />
      <main>Order dashboard</main>
    </div>
  )
}

// PROP DRILLING: user travels App → Layout → Sidebar → Menu → UserBadge,
// and three components in the middle have to know about it.
export default function App() {
  return <Layout user={currentUser} />
}
