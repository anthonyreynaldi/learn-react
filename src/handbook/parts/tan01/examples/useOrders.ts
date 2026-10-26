import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { approveOrder, fetchOrders, type OrderStatus } from './shared/ordersApi.ts'

// Wrap queries in CUSTOM HOOKS: components say WHAT they need (useOrders('pending')),
// the hook knows HOW (key, function, options). One place to change later.
export function useOrders(status: OrderStatus | 'all', staleTime = 0) {
  return useQuery({
    // The key identifies the data in the cache. Different status → different entry.
    queryKey: ['orders', status],
    // fetchOrders returns Promise<Order[]>, so `data` is inferred as Order[] | undefined.
    queryFn: () => fetchOrders(status),
    // How long data counts as fresh. While fresh, remounting shows the cache WITHOUT refetching.
    staleTime,
  })
}

export function useApproveOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: approveOrder, // (id: number) => Promise<Order>, so mutate(id) is typed
    onSuccess: () => {
      // Every ['orders', ...] entry is now stale: visible lists refetch right away.
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
