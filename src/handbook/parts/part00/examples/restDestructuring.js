// Rest (...) is the opposite of spread: it COLLECTS the remaining items into one variable.
export default function run(log) {
  // Rest in array destructuring
  const [first, ...others] = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru']
  log('first:', first)
  log('others:', others)

  // Rest in object destructuring: handy to "remove" a property without mutating
  const order = { id: 101, customer: 'PT Maju Jaya', status: 'pending', internalNote: 'VIP' }
  const { internalNote, ...publicOrder } = order
  log('removed:', internalNote)
  log('publicOrder:', publicOrder)

  // Rest in function parameters: accept any number of arguments
  function sum(...numbers) {
    log('numbers is an array:', numbers)
    return numbers.reduce((total, n) => total + n, 0)
  }
  log('sum:', sum(120000, 85000, 45000))
}
