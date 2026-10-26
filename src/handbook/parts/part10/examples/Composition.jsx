const currentUser = { name: 'Budi', role: 'admin' }

const sidebarStyle = { border: '1px dashed #999', padding: 8 }

function UserBadge({ user }) {
  return (
    <p>
      👤 {user.name} ({user.role})
    </p>
  )
}

// No user prop anymore: it just shows the menu links
function Menu() {
  return (
    <ul>
      <li>Orders</li>
      <li>Customers</li>
    </ul>
  )
}

// Renders whatever it receives as children: it doesn't know about users
function Sidebar({ children }) {
  return (
    <aside style={sidebarStyle}>
      <strong>Sidebar</strong>
      {children}
    </aside>
  )
}

// A "slot" prop named sidebar, plus children for the main area
function Layout({ sidebar, children }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {sidebar}
      <main>{children}</main>
    </div>
  )
}

// COMPOSITION: App builds the UserBadge itself (it has the user) and hands the
// finished element down through children / the sidebar prop. The components
// in the middle no longer need the user at all.
export default function App() {
  return (
    <Layout
      sidebar={
        <Sidebar>
          <Menu />
          <UserBadge user={currentUser} />
        </Sidebar>
      }
    >
      Order dashboard
    </Layout>
  )
}
