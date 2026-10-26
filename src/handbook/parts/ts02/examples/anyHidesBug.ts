// any switches type checking OFF for a value. Everything is allowed,
// so this file passes `npm run typecheck` without a single error...
export function printCustomer(order: any): string {
  // ...but "custmer" is a typo and toUpperCase is called on undefined:
  // at runtime this crashes with
  // TypeError: Cannot read properties of undefined (reading 'toUpperCase')
  return order.custmer.toUpperCase()
}

// any also spreads: everything you read from an any is any again.
export function totalWithTax(order: any): number {
  return order.total * 1.11 // if total is "750000" (a string), this is 832500 by luck...
}

// With a real type, both bugs are caught before running:
type Order = { customer: string; total: number }

export function printCustomerTyped(order: Order): string {
  // return order.custmer.toUpperCase()
  //  ✗ Property 'custmer' does not exist on type 'Order'. Did you mean 'customer'?
  return order.customer.toUpperCase()
}
