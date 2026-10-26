import { useState } from 'react'
import { Link, MemoryRouter, NavLink, Route, Routes } from 'react-router'
import AddressBar from './router/AddressBar.jsx'

function HomePage() {
  return <h2>Home</h2>
}
function OrdersPage() {
  return <h2>Orders</h2>
}
function CustomersPage() {
  return <h2>Customers</h2>
}
function NotFoundPage() {
  return (
    <div>
      <h2>404 – Page not found</h2>
      <Link to="/">Back to home</Link>
    </div>
  )
}

// NavLink knows whether its route is active and lets you style it
const navStyle = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: isActive ? 'underline' : 'none',
})

function Nav() {
  const [message, setMessage] = useState('')
  return (
    <nav style={{ marginBottom: 12 }}>
      {/* Link / NavLink: change the URL WITHOUT reloading the page */}
      <NavLink to="/" end style={navStyle}>
        Home
      </NavLink>
      <NavLink to="/orders" style={navStyle}>
        Orders
      </NavLink>
      <NavLink to="/customers" style={navStyle}>
        Customers
      </NavLink>
      <Link to="/reports/xyz" style={{ marginRight: 12 }}>
        Broken link
      </Link>
      {/* A plain <a href> would make the BROWSER load a new page: the whole
          React app restarts and all state is lost. Prevented here for the demo. */}
      <a
        href="/orders"
        onClick={(e) => {
          e.preventDefault()
          setMessage('A plain <a href="/orders"> would reload the whole page in a real app. Use <Link> instead.')
        }}
      >
        Plain &lt;a href&gt;
      </a>
      {message && <p style={{ color: '#b45309' }}>{message}</p>}
    </nav>
  )
}

export default function RouterBasics() {
  // Real apps use <BrowserRouter> in main.jsx. MemoryRouter keeps the URL in
  // memory, because the handbook itself already uses the real URL.
  return (
    <MemoryRouter initialEntries={['/']}>
      <AddressBar />
      <Nav />
      {/* Routes picks the FIRST Route whose path matches the URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        {/* "*" matches anything else: the 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  )
}
