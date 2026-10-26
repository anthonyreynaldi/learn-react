// In conditions, every value is treated as "truthy" or "falsy".
// Falsy values: false, 0, '' (empty string), null, undefined, NaN. Everything else is truthy.
export default function run(log) {
  const values = [false, 0, '', null, undefined, NaN, true, 1, 'pending', [], {}]

  for (const value of values) {
    // Build a readable label: strings in quotes, objects as JSON, the rest as text
    const label =
      typeof value === 'string' ? `'${value}'` : typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)
    log(`${label} is ${value ? 'truthy' : 'falsy'}`)
  }

  // Gotchas for PHP developers:
  // - In PHP an empty array is falsy. In JavaScript [] is TRUTHY. Check .length instead.
  const items = []
  log('items.length > 0 ?', items.length > 0)
  // - 0 is falsy, so "if (qty)" treats a quantity of 0 like "no value".
  const qty = 0
  log(qty ? 'has qty' : 'qty treated as missing')
}
