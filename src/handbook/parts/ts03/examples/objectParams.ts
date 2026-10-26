type Log = (...values: unknown[]) => void

type Product = {
  name: string
  price: number
  stock: number
}

// Destructure in the parameter list (Part 0), and put the type AFTER the braces.
function formatProduct({ name, price }: Product): string {
  return `${name}: Rp ${price.toLocaleString('id-ID')}`
}

export default function run(log: Log) {
  const tile: Product = { name: 'Floor Tile 60x60', price: 120000, stock: 40 }
  log(formatProduct(tile))

  // An inline object type works too, for one-off functions:
  function formatShort({ name }: { name: string }): string {
    return name.toUpperCase()
  }
  log(formatShort(tile)) // ✓ extra properties (price, stock) are fine when passing a variable
}
