// Importing from our own module ./money.js (see its source in the next example).
// - Default export: no braces, you pick the name (here "calcLine")
// - Named exports: braces, exact names; "as" renames one locally
import calcLine, { toRupiah, addTax as withTax, TAX_RATE } from './money.js'
import * as money from './money.js' // everything that is exported, as one object

export default function run(log) {
  const subtotal = calcLine(5, 120000)
  log('subtotal:', toRupiah(subtotal))
  log(`with ${TAX_RATE * 100}% tax:`, toRupiah(withTax(subtotal)))

  // The private helper is not exported, so it is not available
  log('exported names:', Object.keys(money))
  log("is 'addThousandsDots' exported?", 'addThousandsDots' in money)
}
