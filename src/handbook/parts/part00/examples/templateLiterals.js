// Template literals use backticks (`) and ${ } to insert values - like "{$var}" in PHP.
import { formatRupiah } from '../../../../utils/format.js'

export default function run(log) {
  const customer = 'PT Maju Jaya'
  const qty = 3
  const price = 120000

  // Old way: string concatenation
  log('Order for ' + customer + ': ' + qty + ' boxes')

  // Template literal: easier to read
  log(`Order for ${customer}: ${qty} boxes`)

  // Any expression works inside ${ }
  log(`Total: ${formatRupiah(qty * price)}`)
  log(`Big order? ${qty > 10 ? 'yes' : 'no'}`)
  log(`Customer in caps: ${customer.toUpperCase()}`)

  // Backticks can span multiple lines
  const message = `Customer: ${customer}
Status: approved`
  log(message)
}
