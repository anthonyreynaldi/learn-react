import { formatRupiah } from '../../../../utils/format'

const products = [
  { id: 1, name: 'Floor Tile 60x60', price: 120000, stock: 40 },
  { id: 2, name: 'Wall Tile 30x60', price: 95000, stock: 0 },
  { id: 3, name: 'Granite Tile 80x80', price: 185000, stock: 12 },
]

// One row as its own component. It does NOT set a key itself.
function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{formatRupiah(product.price)}</td>
      <td style={{ color: product.stock === 0 ? 'red' : undefined }}>{product.stock}</td>
    </tr>
  )
}

export default function ProductTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {/* The key goes HERE, on <ProductRow> inside the map,
            not on the <tr> inside ProductRow. */}
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  )
}
