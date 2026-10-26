import { useState } from 'react'
import { QueryClient, QueryClientProvider, useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder, type Order } from '@/handbook/parts/tan01/examples/shared/ordersApi.ts'
import { useOrders } from '@/handbook/parts/tan01/examples/useOrders.ts'
import { NewOrderForm } from '@/handbook/parts/tan02/examples/NewOrderForm.tsx'
import { OrdersTable } from '@/handbook/parts/tan03/examples/OrdersTable.tsx'

// A stable empty array for "no data yet" (a new [] every render would make Table rebuild)
const emptyOrders: Order[] = []

function OrdersPage() {
  // QUERY: loads the orders (server state)
  const { data: orders, isPending, isFetching } = useOrders('all')

  // MUTATION: creating an order changes server data → invalidate, so the query refetches
  const queryClient = useQueryClient()
  const create = useMutation({
    mutationFn: createOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <h3>New order</h3>
        {/* FORM: the same component as in TanStack Part 2, now saving through the mutation */}
        <NewOrderForm onCreate={(data) => create.mutateAsync(data)} />
      </div>
      <div>
        <h3>
          Orders {isFetching && <small style={{ fontWeight: 'normal' }}>⟳ refreshing…</small>}
        </h3>
        {/* TABLE: the same component as in TanStack Part 3, fed by the query */}
        {isPending ? <p>Loading orders…</p> : <OrdersTable orders={orders ?? emptyOrders} />}
      </div>
    </div>
  )
}

export default function AllTogether() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }))
  return (
    <QueryClientProvider client={queryClient}>
      <OrdersPage />
    </QueryClientProvider>
  )
}
