import { useEffect, useState } from 'react'
import { Link, MemoryRouter, Route, Routes, useParams } from 'react-router'
import { formatRupiah } from '../../../../utils/format'
import AddressBar from './router/AddressBar.jsx'
import { fakeFetchOrder, orders } from './fakeOrders.js'

function OrderListPage() {
  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          <Link to={`/orders/${o.id}`}>
            #{o.id} {o.customer}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function NoteForm({ orderId }) {
  const [note, setNote] = useState('')
  return (
    <p>
      <label>
        Note for #{orderId}: <input value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
    </p>
  )
}

function OrderDetailPage() {
  // /orders/:orderId → useParams() gives { orderId: '103' }. Always a STRING.
  const { orderId } = useParams()
  const id = Number(orderId)

  // Data that depends on the URL: load it in an effect keyed on the id (Part 8)
  const [result, setResult] = useState({ id: null, order: null })
  useEffect(() => {
    let ignore = false
    fakeFetchOrder(id).then((order) => {
      if (!ignore) setResult({ id, order })
    })
    return () => {
      ignore = true
    }
  }, [id])

  const loading = result.id !== id
  const order = result.order

  return (
    <div>
      <p>
        <Link to="/orders">← All orders</Link>
      </p>
      {loading && <p>Loading order #{id}…</p>}
      {!loading && !order && <p>Order #{orderId} does not exist.</p>}
      {!loading && order && (
        <>
          <h2>Order #{order.id}</h2>
          <p>
            {order.customer} · {formatRupiah(order.total)} · {order.status}
          </p>
        </>
      )}
      {/* key: without it, the SAME NoteForm would be reused for the next order
          and keep the old note (Part 7). With it, every order gets a fresh form. */}
      <NoteForm key={orderId} orderId={orderId} />
      <p>
        <Link to={`/orders/${id - 1}`}>← Previous order</Link> · <Link to={`/orders/${id + 1}`}>Next order →</Link>
      </p>
    </div>
  )
}

export default function UrlParams() {
  // Real apps use <BrowserRouter> in main.jsx
  return (
    <MemoryRouter initialEntries={['/orders']}>
      <AddressBar />
      <Routes>
        <Route path="/orders" element={<OrderListPage />} />
        {/* :orderId is a URL parameter, like Route::get('/orders/{order}') */}
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}
