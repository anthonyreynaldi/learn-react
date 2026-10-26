// Exercise 2: ProductCard
//
// TODO: Build a ProductCard component that:
// - has a hardcoded product with name, price and stock
// - shows the price formatted with formatRupiah (from src/utils/format.js)
// - shows stock in red with "Out of stock" when stock is 0, using a style object
// - uses a Fragment as the root
// - contains at least one JSX comment

import { formatRupiah } from "../../utils/format"

function ProductCard() {
  const product = { name: 'Floor Tile 60x60', price: 120000, stock: 0 }

  return (
    <>
      <h2 className="title">{product.name}</h2>
      <img src="tile.jpg" alt={product.name} />
      <p>Price: {formatRupiah(product.price)}</p>
      <p style={{ color: 'red' }}>
        {/* Show stock or "Out of stock" */}
        Stock: {product.stock > 0 ? product.stock : 'Out of stock'}
      </p>
    </>
  )
}

export default ProductCard
