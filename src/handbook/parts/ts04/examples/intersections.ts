type Log = (...values: unknown[]) => void

type Order = { id: number; customer: string; status: string }
type OrderLine = { product: string; qty: number; price: number }

// An INTERSECTION (&): has everything from Order AND a lines array.
// Like a Laravel order loaded with ->with('lines').
type OrderWithLines = Order & { lines: OrderLine[] }

function orderTotal(order: OrderWithLines): number {
  return order.lines.reduce((sum, line) => sum + line.qty * line.price, 0)
}

export default function run(log: Log) {
  const order: OrderWithLines = {
    id: 101,
    customer: 'PT Maju Jaya', // from Order
    status: 'pending', // from Order
    lines: [
      // from { lines: OrderLine[] }
      { product: 'Floor Tile 60x60', qty: 3, price: 120000 },
      { product: 'Wall Tile 30x60', qty: 2, price: 95000 },
    ],
  }

  log(`#${order.id} ${order.customer}: ${order.lines.length} lines, total ${orderTotal(order)}`)

  // A plain Order (without lines) is not enough:
  // orderTotal({ id: 102, customer: 'CV Sinar Abadi', status: 'pending' })
  // ✗ Argument of type '{ id: number; customer: string; status: string; }' is not assignable
  //   to parameter of type 'OrderWithLines'.
  //     Property 'lines' is missing in type '{ id: number; customer: string; status: string; }'
  //     but required in type '{ lines: OrderLine[]; }'.
}
