// React compares old and new state with Object.is (almost the same as ===).
export default function run(log) {
  // Primitives are compared by VALUE
  log('Object.is(5, 5):', Object.is(5, 5))
  log("Object.is('approved', 'approved'):", Object.is('approved', 'approved'))

  // Objects are compared by REFERENCE (is it the very same object?)
  const order = { id: 101, customer: 'PT Maju Jaya', status: 'pending' }
  const sameOrder = order
  sameOrder.status = 'approved' // mutation: still the same object
  log('Mutated, same object -> Object.is(order, sameOrder):', Object.is(order, sameOrder))

  const copy = { ...order, status: 'rejected' } // spread: a NEW object
  log('Spread copy -> Object.is(order, copy):', Object.is(order, copy))

  // Even identical contents in a new object count as "different"
  log('Same contents, new object:', Object.is({ id: 1 }, { id: 1 }))

  // That's why React can detect changes so cheaply:
  // a new object means "changed", the same object means "unchanged".
}
