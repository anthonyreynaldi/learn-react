import OrdersTableDemo from './examples/OrdersTable.tsx'
import ordersTableCode from './examples/OrdersTable.tsx?raw'
import serverSideCode from './examples/serverSide.txt?raw'

export default {
  id: 'tan03',
  number: 3,
  title: 'TanStack Table',
  topics: [
    {
      id: 'orders-table',
      title: 'A sortable, paginated orders table',
      summary:
        'TanStack Table is "headless": it computes sorting, paging and rows, and you render the table markup yourself. Version 9 declares features up front with tableFeatures and types columns from them.',
      notes: [
        'V9 API: useTable({ features, columns, data }). The V8 names (useReactTable, getCoreRowModel) are gone.',
        'tableFeatures({ rowSortingFeature, sortedRowModel, rowPaginationFeature, paginatedRowModel }) opts in to exactly what you use.',
        'createColumnHelper<typeof features, Order>() types every column: accessor(\'total\') must be a key of Order, and getValue() is a number there.',
        'Keep features, columns and the data array stable (module level or state/memo); new references every render make Table rebuild.',
        'Headers: getToggleSortingHandler() and getIsSorted(); pagination: previousPage(), nextPage(), table.state.pagination.',
        'Number columns sort descending first by default (biggest totals first); set sortDescFirst on a column to change it.',
      ],
      examples: [
        {
          title: 'OrdersTable',
          caption:
            'Click a header to sort; click again to reverse, a third time to switch sorting off. Text columns start ascending (▲), number columns start descending (▼), TanStack’s default. Page through the 40 orders.',
          type: 'react',
          component: OrdersTableDemo,
          code: ordersTableCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'server-side',
      title: 'Server-side pagination and sorting',
      summary:
        'For large data, Laravel sorts and pages in SQL. Table switches to manualPagination/manualSorting and only displays the page TanStack Query fetched.',
      notes: [
        'manualPagination / manualSorting: "the data is already the current, sorted page; don’t process it".',
        'Pass rowCount (the total from paginate()) so Table knows how many pages exist.',
        'Put the page, size and sorting in the TanStack Query key, so each page is cached separately.',
        'In Laravel, whitelist sortable columns before orderBy(), then paginate().',
      ],
      examples: [{ title: 'Query + manual Table + Laravel paginate()', type: 'code', code: serverSideCode, lang: 'tsx' }],
    },
  ],
}
