// some(): is at least ONE item true?  every(): are ALL items true?
// findIndex(): the position of the first match (or -1).
export default function run(log) {
  const orders = [
    { id: 1, customer: 'PT Maju Jaya', status: 'approved' },
    { id: 2, customer: 'CV Sinar Abadi', status: 'pending' },
    { id: 3, customer: 'PT Karya Baru', status: 'approved' },
  ]

  log('any pending?', orders.some((order) => order.status === 'pending'))
  log('any rejected?', orders.some((order) => order.status === 'rejected'))

  log('all approved?', orders.every((order) => order.status === 'approved'))
  log('all have an id?', orders.every((order) => order.id > 0))

  log('index of id 2:', orders.findIndex((order) => order.id === 2))
  log('index of id 9:', orders.findIndex((order) => order.id === 9))
}
