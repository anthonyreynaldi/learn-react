import OrdersQueryDemo from './examples/OrdersQueryDemo.tsx'
import ordersQueryDemoCode from './examples/OrdersQueryDemo.tsx?raw'
import useOrdersCode from './examples/useOrders.ts?raw'
import ordersApiCode from './examples/shared/ordersApi.ts?raw'

export default {
  id: 'tan01',
  number: 1,
  title: 'TanStack Query',
  topics: [
    {
      id: 'orders-with-query',
      title: 'Orders with useQuery and useMutation',
      summary:
        'TanStack Query manages server state: it fetches, caches, shares and refreshes data that belongs to the server. Wrapped in custom hooks, components just say useOrders(\'pending\').',
      notes: [
        'Server state: data owned by Laravel (orders, customers). The browser only holds a cached copy that can go out of date.',
        'queryKey: [\'orders\', status] identifies the cached data. Each status has its own entry, so switching back is instant.',
        'queryFn type inference: fetchOrders returns Promise<Order[]>, so data is Order[] | undefined, and Order[] after the isPending/isError checks.',
        'Stale: with staleTime 0, data is stale immediately, so remounting shows the cache AND refetches in the background. With 30 s, it’s fresh and no request is sent.',
        'Invalidation: after a mutation, invalidateQueries({ queryKey: [\'orders\'] }) marks every orders entry stale, and visible ones refetch.',
        'Wrap queries and mutations in custom hooks (useOrders, useApproveOrder): one place for keys and options.',
      ],
      examples: [
        {
          title: 'Orders list: cache, staleTime, approve',
          caption:
            'Watch "Requests sent". Hide/Show with staleTime 0: the list appears instantly AND refetches (⟳). Switch to 30 s and Hide/Show again: no new request. Approve an order: the lists refetch.',
          type: 'react',
          component: OrdersQueryDemo,
          code: ordersQueryDemoCode,
          lang: 'tsx',
        },
        { title: 'useOrders.ts: the custom hooks', type: 'code', code: useOrdersCode, lang: 'ts' },
        {
          title: 'shared/ordersApi.ts: the fake API used by every TanStack part',
          type: 'code',
          code: ordersApiCode,
          lang: 'ts',
        },
      ],
    },
  ],
}
