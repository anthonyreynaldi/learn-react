import { sampleOrders, type Order } from './base.ts'

type Log = (...values: unknown[]) => void

// A real VALUE: the starting filters of an order report (Part 6).
const defaultFilters = {
  search: '',
  minTotal: 0,
  onlyWithNote: false,
}

// typeof in a TYPE position: "the type of this value".
// Filters = { search: string; minTotal: number; onlyWithNote: boolean }
// Add a filter to defaultFilters and the type follows automatically.
type Filters = typeof defaultFilters

function applyFilters(orders: Order[], filters: Filters): Order[] {
  return orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(filters.search.toLowerCase()) &&
      o.total >= filters.minTotal &&
      (!filters.onlyWithNote || o.note !== undefined),
  )
}

export default function run(log: Log) {
  log('defaults:', applyFilters(sampleOrders, defaultFilters).map((o) => o.id))
  log('min 600.000:', applyFilters(sampleOrders, { ...defaultFilters, minTotal: 600000 }).map((o) => o.id))
  log('only with a note:', applyFilters(sampleOrders, { ...defaultFilters, onlyWithNote: true }).map((o) => o.id))
  // applyFilters(sampleOrders, { ...defaultFilters, minTotal: '600000' })
  // ✗ Type 'string' is not assignable to type 'number'.
}
