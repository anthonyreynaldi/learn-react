import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

export default function ArrayState() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Floor Tile 60x60', price: 120000, stock: 3 },
    { id: 2, name: 'Wall Tile 30x60', price: 95000, stock: 5 },
  ])

  // ADD: spread the old items into a new array, then add the new one.
  function handleAdd() {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const newProduct = { id: nextId, name: `Granite Tile #${nextId}`, price: 150000, stock: 10 }
    setProducts([...products, newProduct])
  }

  // REMOVE: filter returns a new array without that item.
  function handleRemove(id) {
    setProducts(products.filter((p) => p.id !== id))
  }

  // UPDATE ONE: map returns a new array; only the matching item is copied and changed.
  function handleReduceStock(id) {
    setProducts(
      products.map((p) => (p.id === id && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p)),
    )
  }

  return (
    <div>
      <button onClick={handleAdd}>Add product</button>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Rendering a list with map + key is explained in Part 6 */}
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{formatRupiah(p.price)}</td>
              <td style={{ color: p.stock === 0 ? 'red' : undefined }}>{p.stock}</td>
              <td>
                <button onClick={() => handleReduceStock(p.id)}>Reduce stock by 1</button>{' '}
                <button onClick={() => handleRemove(p.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
