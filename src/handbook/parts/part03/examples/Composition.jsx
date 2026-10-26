import { formatRupiah } from '../../../../utils/format'

// Small components are combined (composed) into bigger ones.
// The result is a tree: Composition -> Header + OrderSummary + OrderSummary.

function Header() {
  return <h2>Today's Orders</h2>
}

// Without props, this component can only ever show the same hardcoded data.
function OrderSummary() {
  return (
    <div style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
      <p>Customer: PT Maju Jaya</p>
      <p>Product: Floor Tile 60x60</p>
      <p>Total: {formatRupiah(120000)}</p>
    </div>
  )
}

export default function Composition() {
  return (
    <div>
      <Header />
      <OrderSummary />
      <OrderSummary />
    </div>
  )
}
