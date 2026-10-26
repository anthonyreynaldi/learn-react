import { useEffect, useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { fakeFetch } from './fakeApi.js'

export default function FetchWithControls() {
  const [delay, setDelay] = useState(2000)
  const [fail, setFail] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false // see "Race conditions"

    async function loadOrders() {
      setLoading(true)
      setError(null)
      try {
        // In a real app: await fetch('/api/orders')
        const response = await fakeFetch('/api/orders', { delay, fail })
        if (!response.ok) throw new Error(`Server responded with ${response.status}`)
        const data = await response.json()
        if (!ignore) setOrders(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadOrders()
    return () => {
      ignore = true
    }
    // reloadCount isn't used inside, but listing it means
    // "run again whenever it changes". That is how Reload works.
  }, [delay, fail, reloadCount])

  let content
  if (loading) content = <p>Loading orders… ({delay / 1000}s)</p>
  else if (error) content = <p style={{ color: 'red' }}>Could not load orders: {error}</p>
  else if (orders.length === 0) content = <p>No orders yet.</p>
  else
    content = (
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer}: {formatRupiah(o.total)}
          </li>
        ))}
      </ul>
    )

  return (
    <div>
      <p>
        Delay{' '}
        <select value={delay} onChange={(e) => setDelay(Number(e.target.value))}>
          <option value={500}>0.5s</option>
          <option value={2000}>2s</option>
          <option value={4000}>4s</option>
        </select>{' '}
        <label>
          <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} /> Simulate
          server error
        </label>{' '}
        <button onClick={() => setReloadCount(reloadCount + 1)}>Reload</button>
      </p>
      {content}
    </div>
  )
}
