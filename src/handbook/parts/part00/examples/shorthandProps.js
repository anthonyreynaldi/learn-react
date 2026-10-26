// Shorthand: if the key and the variable have the same name, write it once.
export default function run(log) {
  const customer = 'CV Sinar Abadi'
  const status = 'pending'
  const qty = 5

  // Long form
  const orderA = { customer: customer, status: status, qty: qty }

  // Shorthand form: exactly the same result
  const orderB = { customer, status, qty }

  log(orderA)
  log(orderB)

  // Shorthand for methods too
  const cart = {
    qty,
    describe() {
      return `${this.qty} boxes`
    },
  }
  log(cart.describe())
}
