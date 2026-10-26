// Object destructuring pulls properties out into variables, by NAME.
export default function run(log) {
  const order = { id: 101, customer: 'PT Maju Jaya', status: 'approved' }

  // Basic: variable names must match the keys
  const { customer, status } = order
  log(customer, status)

  // Renaming: take "customer" but call the variable "buyer"
  const { customer: buyer } = order
  log('buyer:', buyer)

  // Default value: used only when the property is undefined
  const { discount = 0, status: orderStatus = 'pending' } = order
  log('discount:', discount) // missing, so default 0
  log('orderStatus:', orderStatus) // exists, so 'approved'

  // Nested destructuring
  const item = { product: { name: 'Floor Tile 60x60', price: 120000 } }
  const { product: { name, price } } = item
  log(name, price)
}
