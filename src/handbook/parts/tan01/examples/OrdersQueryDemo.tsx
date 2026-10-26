import { useState, useSyncExternalStore } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { formatRupiah } from '@/utils/format.js'
import { getRequestCount, subscribeToRequests, type OrderStatus } from './shared/ordersApi.ts'
import { useApproveOrder, useOrders } from './useOrders.ts'

type StatusFilter = OrderStatus | 'all'
const filters: StatusFilter[] = ['all', 'pending', 'approved', 'rejected']

function OrdersList({ status, staleTime }: { status: StatusFilter; staleTime: number }) {
  const { data: orders, isPending, isError, error, isFetching } = useOrders(status, staleTime)
  const approve = useApproveOrder()

  if (isPending) return <p>Loading orders…</p> // no data yet (first load for this key)
  if (isError) return <p style={{ color: 'red' }}>Error: {error.message}</p>

  // From here on, TypeScript knows orders is Order[] (isPending/isError narrowed it)
  return (
    <div>
      <p>
        <small>
          {orders.length} orders · {isFetching ? '⟳ refreshing in the background…' : 'up to date'}
        </small>
      </p>
      <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid #ddd', opacity: isFetching ? 0.6 : 1 }}>
        <table>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.customer}</td>
                <td>{formatRupiah(o.total)}</td>
                <td>{o.status}</td>
                <td>
                  {o.status === 'pending' && (
                    <button onClick={() => approve.mutate(o.id)} disabled={approve.isPending}>
                      {approve.isPending && approve.variables === o.id ? 'Approving…' : 'Approve'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RequestCounter() {
  const count = useSyncExternalStore(subscribeToRequests, getRequestCount)
  return <strong>Requests sent: {count}</strong>
}

export default function OrdersQueryDemo() {
  // This example has its OWN cache. A real app creates one QueryClient in main.jsx.
  // refetchOnWindowFocus is off so clicking around the handbook doesn't add requests.
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }))
  const [status, setStatus] = useState<StatusFilter>('pending')
  const [staleTime, setStaleTime] = useState(0)
  const [showList, setShowList] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={status} onChange={(e) => setStatus(filters.find((f) => f === e.target.value) ?? 'all')} aria-label="Status">
          {filters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select value={staleTime} onChange={(e) => setStaleTime(Number(e.target.value))} aria-label="staleTime">
          <option value={0}>staleTime: 0 (always refetch)</option>
          <option value={30000}>staleTime: 30 s</option>
        </select>
        <button onClick={() => setShowList(!showList)}>{showList ? 'Hide list' : 'Show list'}</button>
        <RequestCounter />
      </p>
      {showList && <OrdersList status={status} staleTime={staleTime} />}
    </QueryClientProvider>
  )
}
