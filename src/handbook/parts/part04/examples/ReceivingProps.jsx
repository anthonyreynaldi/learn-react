import { formatRupiah } from '../../../../utils/format'

// Option 1: receive the whole props object and read props.something.
function OrderLineA(props) {
  return (
    <p>
      {props.product}: {formatRupiah(props.price)}
    </p>
  )
}

// Option 2 (most common): destructure the props right in the parameter list.
// This is the same as: const { product, price } = props
function OrderLineB({ product, price }) {
  return (
    <p>
      {product}: {formatRupiah(price)}
    </p>
  )
}

export default function ReceivingProps() {
  return (
    <div>
      <OrderLineA product="Floor Tile 60x60" price={120000} />
      <OrderLineB product="Floor Tile 60x60" price={120000} />
    </div>
  )
}
