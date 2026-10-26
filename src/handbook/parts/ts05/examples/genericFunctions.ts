type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; total: number }

// <T> is a TYPE PARAMETER: a placeholder for "whatever type the caller uses".
// Read it as: "for some type T, take an array of T and return a T (or undefined)".
function first<T>(items: T[]): T | undefined {
  return items[0]
}

export default function run(log: Log) {
  const orders: Order[] = [
    { id: 101, customer: 'PT Maju Jaya', total: 750000 },
    { id: 102, customer: 'CV Sinar Abadi', total: 1250000 },
  ]

  // TypeScript INFERS T from the argument; you don't write it.
  const firstOrder = first(orders) // T = Order  → Order | undefined
  const firstCity = first(['Surabaya', 'Jakarta']) // T = string → string | undefined
  const firstTotal = first([750000, 1250000]) // T = number → number | undefined

  log(firstOrder?.customer, firstCity?.toUpperCase(), firstTotal?.toFixed(2))

  // The type is kept, so typos are still caught (unlike the any version):
  // first(orders)?.custmer
  // ✗ Property 'custmer' does not exist on type 'Order'. Did you mean 'customer'?

  // You CAN write T explicitly, but inference usually does it for you:
  const explicit = first<Order>(orders)
  log(explicit?.id)
}
