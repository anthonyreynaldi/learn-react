import { useState } from 'react'
import { Link, MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router'
import { formatRupiah } from '../../../../utils/format'
import AddressBar from './router/AddressBar.jsx'
import { fakeSaveOrder, orders } from './fakeOrders.js'

function OrderListPage() {
  return (
    <div>
      <p>
        <Link to="/orders/new">+ New order</Link>
      </p>
      <p>{orders.length} orders in the list.</p>
    </div>
  )
}

function NewOrderPage() {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState('PT Karya Baru')
  const [total, setTotal] = useState('500000')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const order = await fakeSaveOrder({ customer, total: Number(total) })
    // Navigate from code after the save, like redirect()->route('orders.show', $order).
    // replace: true REPLACES the form in the history, so Back skips it
    // (no "resubmit the form?" trip back to a finished form).
    navigate(`/orders/${order.id}`, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New order</h2>
      <p>
        <label>
          Customer <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </label>
      </p>
      <p>
        <label>
          Total <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
        </label>
      </p>
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save order'}
      </button>{' '}
      {/* navigate(-1) = the browser's Back button */}
      <button type="button" onClick={() => navigate(-1)}>
        Cancel (back)
      </button>
    </form>
  )
}

function OrderDetailPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === Number(orderId))
  if (!order) return <p>Order not found.</p>
  return (
    <div>
      <p style={{ color: 'green' }}>Order #{order.id} saved.</p>
      <p>
        {order.customer} · {formatRupiah(order.total)} · {order.status}
      </p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default function NavigateFromCode() {
  // Real apps use <BrowserRouter> in main.jsx
  return (
    <MemoryRouter initialEntries={['/orders']}>
      <AddressBar />
      <Routes>
        <Route path="/orders" element={<OrderListPage />} />
        {/* "new" is listed explicitly, so it isn't mistaken for an :orderId */}
        <Route path="/orders/new" element={<NewOrderPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}
