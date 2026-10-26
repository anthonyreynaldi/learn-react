import { formatRupiah } from '../../../../utils/format'

// Two separate objects (module level) so the buggy demo cannot affect the fixed one.
const buggyProduct = { name: 'Floor Tile 60x60', price: 120000 }
const fixedProduct = { name: 'Floor Tile 60x60', price: 120000 }

// BUGGY: changes the object it received. That object belongs to the parent!
function BuggyDiscountPrice({ product }) {
  product.price = product.price * 0.9
  return <p>Discount price: {formatRupiah(product.price)}</p>
}

// FIXED: computes a new local value and leaves the prop untouched.
function FixedDiscountPrice({ product }) {
  const discountedPrice = product.price * 0.9
  return <p>Discount price: {formatRupiah(discountedPrice)}</p>
}

// Renders AFTER the discount component, using the SAME object.
function NormalPrice({ product }) {
  return <p>Normal price: {formatRupiah(product.price)}</p>
}

export default function ReadOnlyProps() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <h3>Buggy (mutates the prop)</h3>
        <BuggyDiscountPrice product={buggyProduct} />
        <NormalPrice product={buggyProduct} />
      </div>
      <div>
        <h3>Fixed (local variable)</h3>
        <FixedDiscountPrice product={fixedProduct} />
        <NormalPrice product={fixedProduct} />
      </div>
    </div>
  )
}
