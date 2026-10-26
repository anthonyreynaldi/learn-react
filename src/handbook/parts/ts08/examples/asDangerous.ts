// Both functions below type-check WITHOUT errors. That is exactly the danger:
// `as` and `!` silence TypeScript instead of proving anything.

type Order = { id: number; customer: string; total: number }

// 1. A type assertion on API data
export async function loadOrder(id: number): Promise<Order> {
  const res = await fetch(`/api/orders/${id}`)
  return (await res.json()) as Order
  // At runtime the JSON might be:
  //   { "id": 101, "customer_name": "PT Maju Jaya", "total": "750000.00" }   (renamed / string total)
  //   { "message": "Unauthenticated." }                                      (a 401 error body)
  //   null                                                                   (a deleted order)
  // `as Order` accepts all of them. The crash happens LATER, somewhere else,
  // e.g. order.customer.toUpperCase() → "Cannot read properties of undefined".
}

// 2. The non-null assertion `!`: "trust me, this is not undefined"
export function customerName(orders: Order[], id: number): string {
  const order = orders.find((o) => o.id === id)! // ← the ! removes `| undefined` from the type
  return order.customer
  // If no order has that id, order IS undefined at runtime:
  //   TypeError: Cannot read properties of undefined (reading 'customer')
  // Without the !, TypeScript would have made you handle that case (TS Part 2).
}

// Rule of thumb: every `as` and `!` is a place where YOU took over the checking.
// At boundaries (API, JSON, storage, URL, forms), check with a schema instead.
