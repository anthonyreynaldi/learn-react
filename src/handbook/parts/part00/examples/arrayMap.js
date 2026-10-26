// map() builds a NEW array by transforming every item. The original is not changed.
import { formatRupiah } from '../../../../utils/format.js'

export default function run(log) {
  const orders = [
    { customer: 'PT Maju Jaya', total: 1200000 },
    { customer: 'CV Sinar Abadi', total: 480000 },
    { customer: 'PT Karya Baru', total: 960000 },
  ]

  // Get just the names
  const names = orders.map((order) => order.customer)
  log(names)

  // Turn each order into a display string
  const lines = orders.map((order) => `${order.customer}: ${formatRupiah(order.total)}`)
  log(lines)

  // The callback also receives the index
  const numbered = orders.map((order, index) => `${index + 1}. ${order.customer}`)
  log(numbered)

  log('original length is still', orders.length)
}
