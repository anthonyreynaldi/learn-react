import AllTogether from './examples/AllTogether.tsx'
import allTogetherCode from './examples/AllTogether.tsx?raw'

export default {
  id: 'tan04',
  number: 4,
  title: 'All together',
  topics: [
    {
      id: 'query-table-form',
      title: 'Query + Table + Form',
      summary:
        'Each library does one job: Query owns the server data, Table displays it, Form collects new data. A mutation’s invalidation ties them together, so the table updates by itself after a create.',
      notes: [
        'useOrders(\'all\') loads the orders; OrdersTable only receives orders as a prop.',
        'NewOrderForm doesn’t know about the table: it calls onCreate, which runs the mutation.',
        'onSuccess → invalidateQueries([\'orders\']) → the query refetches → the table re-renders with the new order.',
        'No manual "add it to the table" code, and no duplicated state: the server stays the single source of truth.',
        'The same three components as in TanStack Parts 1–3, combined without changes.',
      ],
      examples: [
        {
          title: 'Create an order and watch the table update',
          caption: 'Create an order: the table refreshes (⟳) and shows it at the top (sort by Order ▼ if you sorted differently).',
          type: 'react',
          component: AllTogether,
          code: allTogetherCode,
          lang: 'tsx',
        },
      ],
    },
  ],
}
