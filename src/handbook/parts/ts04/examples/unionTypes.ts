type Log = (...values: unknown[]) => void

// A UNION type: id is a number OR a string. The | means "or".
// (Old order ids are numbers; the new system uses codes like 'SO-2026-0042'.)
function formatId(id: number | string): string {
  // Inside, you can only use what BOTH types have, until you check which one it is.
  // Checking is called narrowing (see the "Narrowing" topic).
  if (typeof id === 'number') {
    return `#${id.toString().padStart(6, '0')}` // here id is number
  }
  return id.toUpperCase() // here id is string
}

export default function run(log: Log) {
  log(formatId(101))
  log(formatId('so-2026-0042'))
  // formatId(true)
  // ✗ Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
}
