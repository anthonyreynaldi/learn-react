// The handbook's log function: log(...values) prints one line
type Log = (...values: unknown[]) => void

export default function run(log: Log) {
  const customer: string = 'PT Maju Jaya'
  // number covers BOTH integers and decimals (there is no separate int/float like in PHP)
  const qty: number = 3
  const discountRate: number = 0.05
  const isUrgent: boolean = true

  log(customer, '→', typeof customer)
  log(qty, discountRate, '→', typeof qty, typeof discountRate)
  log(isUrgent, '→', typeof isUrgent)

  // (Annotations are written here to show the type names. Normally you'd let
  // TypeScript infer them: const qty = 3 is already a number, TS Part 1.)
}
