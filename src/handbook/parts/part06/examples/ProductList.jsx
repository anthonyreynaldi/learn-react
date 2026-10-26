import { formatRupiah } from '../../../../utils/format'

const products = [
  { id: 1, name: 'Floor Tile 60x60', price: 120000 },
  { id: 2, name: 'Wall Tile 30x60', price: 95000 },
  { id: 3, name: 'Granite Tile 80x80', price: 185000 },
]

export default function ProductList() {
  return (
    <ul>
      {/* map turns each product object into an <li> element.
          JSX can render an array of elements directly. */}
      {products.map((product) => (
        // key: a unique, stable id so React can tell the items apart
        <li key={product.id}>
          {product.name} — {formatRupiah(product.price)}
        </li>
      ))}
    </ul>
  )
}
