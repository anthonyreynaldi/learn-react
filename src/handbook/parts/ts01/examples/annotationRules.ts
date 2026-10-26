// Rule 1: ALWAYS annotate function parameters.
// TypeScript can't guess what callers will pass (with strict, a missing
// parameter type is an error: "Parameter 'order' implicitly has an 'any' type").
type Order = { id: number; customer: string; total: number }

export function orderTotalWithTax(order: Order, taxRate: number) {
  // Rule 2: let TypeScript INFER local variables that have a value.
  const tax = order.total * taxRate // inferred: number (no ": number" needed)
  return order.total + tax // return type inferred: number
}

// Return types are optional, but useful on exported functions
// as documentation and as a check that you return what you meant:
export function orderLabel(order: Order): string {
  return `#${order.id} ${order.customer}`
}

// Rule 3: annotate a variable when there is NO initial value...
export function grandTotal(orders: Order[]): number {
  let total: number // no value yet → say what it will hold
  total = 0
  for (const order of orders) total += order.total
  return total
}

// ...or when the initial value is too narrow, like an empty array.
export function bigOrders(orders: Order[]): Order[] {
  const big: Order[] = [] // without ": Order[]" TypeScript can't know what the array will hold
  for (const order of orders) {
    if (order.total > 1000000) big.push(order)
  }
  return big
}
