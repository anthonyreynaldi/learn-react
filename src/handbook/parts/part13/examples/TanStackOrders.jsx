import { useState, useSyncExternalStore } from 'react'
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatRupiah } from '../../../../utils/format'
import { approveOrder, fetchOrders, getRequestCount, subscribeToRequests } from './fakeOrdersApi.js'

function OrdersList({ status }) {
  // useQuery: "I need this data". TanStack Query fetches, caches and refetches it.
  // The queryKey identifies the data in the cache, like a cache key in Laravel.
  // Different status → different key → its own cache entry.
  const { data: orders, isPending, isFetching, error } = useQuery({
    queryKey: ['orders', { status }],
    // signal: cancels the request if it is no longer needed (e.g. you switch status)
    queryFn: ({ signal }) => fetchOrders({ status, signal }),
  })

  const queryClient = useQueryClient()
  // useMutation: for changes (POST/PUT/DELETE)
  const approve = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => {
      // Mark every ['orders', ...] query as stale → refetch the visible ones
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  return (
    <div>
      <p>
        <small>
          isPending (no data yet): <strong>{String(isPending)}</strong> · isFetching (request running):{' '}
          <strong>{String(isFetching)}</strong>
        </small>
      </p>
      {isPending && <p>Loading orders…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {orders && (
        <ul style={{ opacity: isFetching ? 0.6 : 1 }}>
          {orders.length === 0 && <li>No orders.</li>}
          {orders.map((o) => (
            <li key={o.id}>
              #{o.id} {o.customer} · {formatRupiah(o.total)} · {o.status}{' '}
              {o.status === 'pending' && (
                <button onClick={() => approve.mutate(o.id)} disabled={approve.isPending}>
                  {approve.isPending && approve.variables === o.id ? 'Approving…' : 'Approve'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RequestCounter() {
  // Subscribes to the fake API's counter (an external store, Part 11)
  const count = useSyncExternalStore(subscribeToRequests, getRequestCount)
  return (
    <p>
      Requests sent to the server: <strong>{count}</strong>
    </p>
  )
}

export default function TanStackOrders() {
  // One QueryClient (the cache) for this example. A real app creates ONE in
  // main.jsx and wraps the whole app in <QueryClientProvider>.
  const [queryClient] = useState(() => new QueryClient())
  const [status, setStatus] = useState('pending')
  const [showList, setShowList] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <p>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>{' '}
        <button onClick={() => setShowList(!showList)}>{showList ? 'Hide list' : 'Show list'}</button>
      </p>
      <RequestCounter />
      {/* Hiding UNMOUNTS the list. The cache lives in the QueryClient, not in the component. */}
      {showList && <OrdersList status={status} />}
    </QueryClientProvider>
  )
}
