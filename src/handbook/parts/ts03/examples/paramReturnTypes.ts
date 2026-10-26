type Log = (...values: unknown[]) => void

// Parameters get a type each; the return type comes after the parentheses.
function calculateTotal(price: number, qty: number): number {
  return price * qty
}

export default function run(log: Log) {
  log('calculateTotal(120000, 3):', calculateTotal(120000, 3))

  // Wrong type:
  // calculateTotal('120000', 3)
  // ✗ Argument of type 'string' is not assignable to parameter of type 'number'.

  // Missing argument:
  // calculateTotal(120000)
  // ✗ Expected 2 arguments, but got 1.

  // Too many arguments are an error too (unlike JavaScript, which ignores them):
  // calculateTotal(120000, 3, 0.11)
  // ✗ Expected 2 arguments, but got 3.
}
