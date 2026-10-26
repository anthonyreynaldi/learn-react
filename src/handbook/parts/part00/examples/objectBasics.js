// Objects group related values as key: value pairs (like an associative array in PHP).
export default function run(log) {
  const order = {
    id: 101,
    customer: 'PT Maju Jaya',
    status: 'pending',
    product: { name: 'Floor Tile 60x60', price: 120000 },
  }

  // Read with dot notation
  log(order.customer)
  log(order.product.name)

  // Read with brackets when the key is in a variable
  const field = 'status'
  log(order[field])

  // Add or change properties
  order.status = 'approved'
  order.note = 'Deliver on Monday'
  log(order)

  // A missing property is undefined (no error)
  log(order.discount)

  // List keys and values
  log(Object.keys(order))
}
