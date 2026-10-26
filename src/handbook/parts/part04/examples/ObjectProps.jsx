import { formatRupiah } from '../../../../utils/format'

const order = { customer: 'PT Karya Baru', product: 'Floor Tile 60x60', total: 120000 }

// 1. Individual props: the component lists exactly what it needs.
function OrderLine({ customer, product, total }) {
  return (
    <p>
      {customer} - {product} - {formatRupiah(total)}
    </p>
  )
}

// 2. One object prop: the component reads order.something.
function OrderLineFromObject({ order }) {
  return (
    <p>
      {order.customer} - {order.product} - {formatRupiah(order.total)}
    </p>
  )
}

export default function ObjectProps() {
  return (
    <div>
      <h3>Individual props</h3>
      <OrderLine customer={order.customer} product={order.product} total={order.total} />

      <h3>Object prop: order={'{order}'}</h3>
      <OrderLineFromObject order={order} />

      <h3>Spread: {'{...order}'}</h3>
      {/* Spread copies every key of order into a separate prop.
          Same result as the individual props above, with less typing. */}
      <OrderLine {...order} />
    </div>
  )
}
