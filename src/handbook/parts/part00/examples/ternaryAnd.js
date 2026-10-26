// Ternary (condition ? a : b) chooses between two values.
// && returns the right side only when the left side is truthy.
// Both are used a lot inside JSX, where you can't write if statements.
export default function run(log) {
  const status = 'approved'
  const label = status === 'approved' ? 'Ready to ship' : 'Waiting'
  log(label)

  const isVip = true
  log(isVip && 'VIP customer') // left is true -> right side
  log(false && 'VIP customer') // left is false -> false

  // Careful: && returns the LEFT value when it is falsy.
  // In JSX, {count && <p>...</p>} would render "0" on the screen.
  const count = 0
  log(count && 'You have orders') // 0, not false!
  log(count > 0 && 'You have orders') // false - safe
}
