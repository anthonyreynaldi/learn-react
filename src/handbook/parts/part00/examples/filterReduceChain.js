// Array methods can be chained: each one returns a new array for the next.
import { formatRupiah } from '../../../../utils/format.js'

export default function run(log) {
  const orders = [
    { customer: 'PT Maju Jaya', status: 'approved', qty: 10, price: 120000 },
    { customer: 'CV Sinar Abadi', status: 'pending', qty: 4, price: 120000 },
    { customer: 'PT Karya Baru', status: 'approved', qty: 5, price: 95000 },
  ]

  // Total value of approved orders only
  const approvedTotal = orders
    .filter((order) => order.status === 'approved')
    .reduce((sum, order) => sum + order.qty * order.price, 0)

  log('approved total:', formatRupiah(approvedTotal))

  // Names of approved customers, joined into one string
  const names = orders
    .filter((order) => order.status === 'approved')
    .map((order) => order.customer)
    .join(', ')
  log('approved customers:', names)
}
