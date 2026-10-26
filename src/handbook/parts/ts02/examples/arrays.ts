type Log = (...values: unknown[]) => void

export default function run(log: Log) {
  // Type[]: an array where EVERY item has that type
  const customers: string[] = ['PT Maju Jaya', 'CV Sinar Abadi']
  const totals: number[] = [750000, 1250000, 480000]

  customers.push('PT Karya Baru') // ✓ a string
  // customers.push(123)
  // ✗ Argument of type 'number' is not assignable to parameter of type 'string'.

  log(customers)
  log(totals.reduce((sum, t) => sum + t, 0)) // TypeScript knows every t is a number

  // Array<string> means the same as string[] (you'll see both styles)
  const statuses: Array<string> = ['pending', 'approved']
  log(statuses)
}
