import { formatRupiah } from '../../utils/format'

function OrderSummary() {
  // The data is hardcoded for now. In Part 4 it will come from props.
  const order = { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' }

  // Style object: in JSX, style takes a JS object (camelCase keys), not a CSS string.
  // The ternary picks green if approved, orange otherwise.
  const statusStyle = {
    color: order.status === 'approved' ? 'green' : 'orange',
    fontWeight: 'bold',
  }

  return (
    // Single root via a Fragment (<>...</>): groups elements without adding an extra DOM node
    <>
      {/* Curly-brace expressions: {} embeds any JS expression inside JSX */}
      <h2>Order #{order.id}</h2>
      <p>Customer: {order.customer}</p>
      <p>Total: {formatRupiah(order.total)}</p>
      <p style={statusStyle}>Status: {order.status}</p>
    </>
  )
}

export default OrderSummary
