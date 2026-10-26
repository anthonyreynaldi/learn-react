// Handbook shell — you don't need to understand this file yet.
//
// Turns a value passed to log(...) into one readable line for the Output box:
// strings as-is, everything else via JSON.stringify, with readable fallbacks
// for values JSON can't show (undefined, functions, Promises, NaN, errors...).

function isPromise(value) {
  return value instanceof Promise || typeof value?.then === 'function'
}

function special(value) {
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return value.name ? `[Function: ${value.name}]` : '[Function]'
  if (isPromise(value)) return 'Promise {pending}'
  if (typeof value === 'number' && !Number.isFinite(value)) return String(value) // NaN, Infinity
  if (typeof value === 'bigint') return `${value}n`
  if (typeof value === 'symbol') return value.toString()
  if (value instanceof Error) return `${value.name}: ${value.message}`
  return null
}

// Nested values: keep undefined/functions/Promises visible instead of dropping them.
function replacer(key, value) {
  if (key === '') return value
  return special(value) ?? value
}

export function formatValue(value) {
  if (typeof value === 'string') return value
  const text = special(value)
  if (text !== null) return text
  try {
    return JSON.stringify(value, replacer)
  } catch {
    return String(value) // e.g. circular objects
  }
}

export function formatLine(values) {
  return values.map(formatValue).join(' ')
}
