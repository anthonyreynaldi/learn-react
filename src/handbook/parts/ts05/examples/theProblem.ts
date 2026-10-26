type Order = { id: number; customer: string }
type Customer = { id: number; name: string; city: string }

// ✗ Option 1: one function per type. The same logic, copied again and again.
export function firstOrder(items: Order[]): Order | undefined {
  return items[0]
}
export function firstCustomer(items: Customer[]): Customer | undefined {
  return items[0]
}
export function firstString(items: string[]): string | undefined {
  return items[0]
}
// ...firstNumber, firstProduct, firstInvoice...

// ✗ Option 2: one function with any. Short, but the type information is LOST:
export function firstAny(items: any[]): any {
  return items[0]
}

declare const orders: Order[]
const order = firstAny(orders) // type: any, not Order
// order.custmer.toUpperCase()   ← no error, because any allows everything.
//                                 Crashes at runtime instead.
export { order }

// ✓ What we want: ONE function that works for any type AND keeps the type.
// That is what generics do (next topic).
