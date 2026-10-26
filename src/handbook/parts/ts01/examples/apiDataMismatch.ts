// The handbook's log function: log(...values) prints one line
type Log = (...values: unknown[]) => void

type Order = {
  id: number
  customer: string
  total: number
}

function orderLabel(order: Order): string {
  return `#${order.id} — ${order.customer}`
}

export default function run(log: Log) {
  // Imagine this JSON came from Laravel. The API was changed and now
  // sends customer_name instead of customer.
  const json = '{"id":101,"customer_name":"PT Maju Jaya","total":750000}'

  // JSON.parse returns `any`: TypeScript has no idea what is inside.
  // `as Order` is a TYPE ASSERTION: "trust me, this is an Order".
  // Nothing checks it, neither now nor at runtime. That's what makes it unsafe.
  const order = JSON.parse(json) as Order

  // TypeScript is happy: order.customer is a `string`... according to the type.
  log('orderLabel(order):', orderLabel(order))
  log('order.customer:', order.customer)
  log('typeof order.customer:', typeof order.customer)
  log('What really arrived:', Object.keys(order))
  // No error anywhere: the type was a promise nobody verified.
  // TS Part 8 shows how to validate API data at runtime.
}
