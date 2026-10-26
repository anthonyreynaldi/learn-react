import { formatRupiah } from '../../../../utils/format'
import { CartProvider, useCart, useCartDispatch } from './CartContext.jsx'

const products = [
  { name: 'Floor Tile 60x60', price: 120000 },
  { name: 'Wall Tile 30x60', price: 95000 },
  { name: 'Granite Tile 80x80', price: 185000 },
]

// Only needs dispatch: it ADDS items, it never shows the cart
function ProductCatalog() {
  const dispatch = useCartDispatch()
  return (
    <div>
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.name}>
            {p.name} — {formatRupiah(p.price)}{' '}
            <button onClick={() => dispatch({ type: 'added_item', product: p })}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// A separate component, not a child of ProductCatalog: no props connect them
function CartSummary() {
  const items = useCart()
  const dispatch = useCartDispatch()

  // Derived totals
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)
  const grandTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div>
      <h3>
        Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h3>
      {items.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                {item.name}{' '}
                <button onClick={() => dispatch({ type: 'changed_qty', name: item.name, qty: item.qty - 1 })}>−</button>{' '}
                {item.qty}{' '}
                <button onClick={() => dispatch({ type: 'changed_qty', name: item.name, qty: item.qty + 1 })}>+</button>{' '}
                = {formatRupiah(item.price * item.qty)}{' '}
                <button onClick={() => dispatch({ type: 'removed_item', name: item.name })}>Remove</button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: {formatRupiah(grandTotal)}</strong>{' '}
            <button onClick={() => dispatch({ type: 'cleared' })}>Clear cart</button>
          </p>
        </>
      )}
    </div>
  )
}

export default function CartDemo() {
  return (
    <CartProvider>
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        <ProductCatalog />
        <CartSummary />
      </div>
    </CartProvider>
  )
}
