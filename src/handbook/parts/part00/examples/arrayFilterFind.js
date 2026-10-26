// filter() keeps every item that passes a test (returns an array).
// find() returns the FIRST matching item (or undefined).
export default function run(log) {
  const orders = [
    { id: 1, customer: 'PT Maju Jaya', status: 'approved' },
    { id: 2, customer: 'CV Sinar Abadi', status: 'pending' },
    { id: 3, customer: 'PT Karya Baru', status: 'approved' },
  ]

  const approved = orders.filter((order) => order.status === 'approved')
  log('approved:', approved)

  const rejected = orders.filter((order) => order.status === 'rejected')
  log('rejected (empty array):', rejected)

  const order2 = orders.find((order) => order.id === 2)
  log('find id 2:', order2)

  const order9 = orders.find((order) => order.id === 9)
  log('find id 9:', order9)
}
