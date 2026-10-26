// reduce() walks through the array and builds up ONE value (here: a running total).
import { formatRupiah } from '../../../../utils/format.js'

export default function run(log) {
  const totals = [1200000, 480000, 960000]

  // reduce((accumulator, currentItem) => newAccumulator, startValue)
  const grandTotal = totals.reduce((sum, amount) => {
    const next = sum + amount
    log(`sum ${sum} + amount ${amount} = ${next}`)
    return next // this becomes "sum" in the next step
  }, 0)

  log('grand total:', formatRupiah(grandTotal))
}
