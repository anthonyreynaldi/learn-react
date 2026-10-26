import { useState } from 'react'
import { Link, MemoryRouter, NavLink, Outlet, Route, Routes } from 'react-router'
import AddressBar from './router/AddressBar.jsx'

const navStyle = ({ isActive }) => ({ display: 'block', fontWeight: isActive ? 'bold' : 'normal' })

// The LAYOUT route: sidebar + <Outlet />. The Outlet is where the matching
// child page appears (like @yield('content') in a Blade layout).
function AppLayout() {
  // Layout state: the layout stays mounted while you move between its pages,
  // so this survives navigation.
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 16, border: '1px solid #ddd', minHeight: 140 }}>
      <aside style={{ width: collapsed ? 40 : 150, background: '#f4f4f5', padding: 8 }}>
        <button onClick={() => setCollapsed(!collapsed)} title="Collapse sidebar">
          {collapsed ? '»' : '«'}
        </button>
        {!collapsed && (
          <nav style={{ marginTop: 8 }}>
            <NavLink to="/" end style={navStyle}>
              Dashboard
            </NavLink>
            <NavLink to="/orders" style={navStyle}>
              Orders
            </NavLink>
            <NavLink to="/customers" style={navStyle}>
              Customers
            </NavLink>
            <Link to="/login" style={{ display: 'block', marginTop: 8 }}>
              Log out
            </Link>
          </nav>
        )}
      </aside>
      <main style={{ padding: 8 }}>
        <Outlet />
      </main>
    </div>
  )
}

function LoginPage() {
  // Outside the layout: no sidebar here
  return (
    <div>
      <h2>Login</h2>
      <p>This page doesn’t use AppLayout.</p>
      <Link to="/">Log in (back to the dashboard)</Link>
    </div>
  )
}

export default function NestedLayout() {
  // Real apps use <BrowserRouter> in main.jsx
  return (
    <MemoryRouter initialEntries={['/']}>
      <AddressBar />
      <Routes>
        {/* A route with an element but no path: a layout for its children */}
        <Route element={<AppLayout />}>
          <Route index element={<h2>Dashboard</h2>} /> {/* index = the parent's own URL, "/" */}
          <Route path="orders" element={<h2>Orders</h2>} />
          <Route path="customers" element={<h2>Customers</h2>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  )
}
