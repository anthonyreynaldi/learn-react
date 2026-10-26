import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router'
import { formatRupiah } from '../../../../utils/format'
import AddressBar from './router/AddressBar.jsx'
import { orders } from './fakeOrders.js'

function SalesReportPage() {
  // ?status=pending&from=2026-09-15 → read and write it like state
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') ?? 'all' // like $request->input('status', 'all')
  const from = searchParams.get('from') ?? ''

  function updateParam(name, value) {
    // URLSearchParams is the browser's query-string helper
    const next = new URLSearchParams(searchParams)
    if (value === '' || value === 'all') next.delete(name) // keep the URL clean
    else next.set(name, value)
    setSearchParams(next) // changes the URL → new history entry → re-render
  }

  // Derived from the URL, like a controller building a query from $request
  const visible = orders.filter((o) => (status === 'all' || o.status === status) && (from === '' || o.date >= from))
  const total = visible.reduce((sum, o) => sum + o.total, 0)

  return (
    <div>
      <h2>Sales report</h2>
      <p>
        <select value={status} onChange={(e) => updateParam('status', e.target.value)} aria-label="Status">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>{' '}
        <label>
          From <input type="date" value={from} onChange={(e) => updateParam('from', e.target.value)} />
        </label>
      </p>
      <table>
        <tbody>
          {visible.map((o) => (
            <tr key={o.id}>
              <td>{o.date}</td>
              <td>
                #{o.id} {o.customer}
              </td>
              <td>{o.status}</td>
              <td>{formatRupiah(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <strong>
          {visible.length} orders, total {formatRupiah(total)}
        </strong>
      </p>
    </div>
  )
}

export default function QueryStrings() {
  // Real apps use <BrowserRouter> in main.jsx
  return (
    <MemoryRouter initialEntries={['/reports/sales']}>
      <AddressBar />
      <Routes>
        <Route path="/reports/sales" element={<SalesReportPage />} />
      </Routes>
    </MemoryRouter>
  )
}
