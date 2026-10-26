// You can destructure directly in a function's parameters.
// React components do this all the time with props: function OrderRow({ customer, status }) { ... }
import { formatRupiah } from '../../../../utils/format.js'

export default function run(log) {
  // Without destructuring
  function describeA(order) {
    return `${order.customer} - ${order.status}`
  }

  // With destructuring (and a default value)
  function describeB({ customer, status = 'pending' }) {
    return `${customer} - ${status}`
  }

  const order = { customer: 'PT Karya Baru', status: 'approved' }
  log(describeA(order))
  log(describeB(order))
  log(describeB({ customer: 'CV Sinar Abadi' })) // status uses the default

  // Arrow function version
  const lineTotal = ({ qty, price }) => formatRupiah(qty * price)
  log(lineTotal({ qty: 3, price: 120000 }))
}
