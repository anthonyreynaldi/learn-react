// Updating ONE item without mutation: map + ternary + spread.
// This is the standard pattern for updating an item in React state.
export default function run(log) {
  const orders = [
    { id: 1, customer: 'PT Maju Jaya', status: 'pending' },
    { id: 2, customer: 'CV Sinar Abadi', status: 'pending' },
    { id: 3, customer: 'PT Karya Baru', status: 'pending' },
  ]

  // For the matching item, return a changed copy; otherwise return the item as-is
  const updated = orders.map((order) =>
    order.id === 2 ? { ...order, status: 'approved' } : order
  )

  log('original:', orders) // unchanged
  log('updated:', updated)

  // Unchanged items are the very same objects (same reference)
  log('item 1 same object?', updated[0] === orders[0]) // true
  log('item 2 same object?', updated[1] === orders[1]) // false (new copy)
  log('array same?', updated === orders) // false (new array)
}
