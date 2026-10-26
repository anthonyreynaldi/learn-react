// TanStack Table V9 API (installed: @tanstack/react-table 9.x): useTable + tableFeatures +
// createColumnHelper<typeof features, Data>(). Older tutorials show the V8 API
// (useReactTable, getCoreRowModel, getSortedRowModel), which no longer exists in V9.
import {
  createColumnHelper,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { formatRupiah } from '@/utils/format.js'
import { seedOrders, type Order, type OrderStatus } from '@/handbook/parts/tan01/examples/shared/ordersApi.ts'

// 1. FEATURES: opt in to exactly what this table needs, plus their row models
//    (row-model slots come after the feature they belong to).
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text }, // numeric columns fall back to a basic comparator
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

const statusColors: Record<OrderStatus, string> = { pending: '#f59e0b', approved: '#16a34a', rejected: '#dc2626' }

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span style={{ background: statusColors[status], color: 'white', padding: '1px 8px', borderRadius: 10, fontSize: 12 }}>
      {status}
    </span>
  )
}

// 2. COLUMNS: typed by the features AND the row type, so 'total' must be a key of Order
//    and info.getValue() is a number there.
const helper = createColumnHelper<typeof features, Order>()

// Defined OUTSIDE the component: a stable reference. Columns (and features, data)
// created inside the render would be new on every render and make Table rebuild its models.
const columns = helper.columns([
  helper.accessor('id', { header: 'Order', cell: (info) => `#${info.getValue()}` }),
  helper.accessor('customer', { header: 'Customer', sortFn: 'text' }),
  helper.accessor('total', { header: 'Total', cell: (info) => formatRupiah(info.getValue()) }),
  helper.accessor('status', { header: 'Status', cell: (info) => <StatusBadge status={info.getValue()} /> }),
])

const sortArrows = { asc: ' ▲', desc: ' ▼' }

// A reusable table: give it any Order[] (static here, from TanStack Query in "All together")
export function OrdersTable({ orders }: { orders: Order[] }) {
  // 3. The table instance. It owns sorting and pagination state; React owns the markup.
  const table = useTable({
    features,
    columns,
    data: orders,
    initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted() // false | 'asc' | 'desc'
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : undefined, userSelect: 'none' }}
                  >
                    <table.FlexRender header={header} />
                    {sorted ? sortArrows[sorted] : ''}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          ← Previous
        </button>{' '}
        Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}{' '}
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next →
        </button>{' '}
        <small>({orders.length} orders)</small>
      </p>
    </div>
  )
}

export default function OrdersTableDemo() {
  return <OrdersTable orders={seedOrders} />
}
