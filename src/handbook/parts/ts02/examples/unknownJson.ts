type Log = (...values: unknown[]) => void

export default function run(log: Log) {
  const json = '{"id":101,"customer":"PT Maju Jaya","total":750000}'

  // TypeScript's own type for JSON.parse returns `any` (no checks at all).
  // Storing the result as `unknown` instead is the safe habit:
  // unknown means "could be anything, so PROVE what it is before using it".
  const data: unknown = JSON.parse(json)

  // data.customer
  // ✗ 'data' is of type 'unknown'.

  // Check step by step. Each check narrows the type a little more:
  if (typeof data === 'object' && data !== null && 'customer' in data && typeof data.customer === 'string') {
    log('customer:', data.customer.toUpperCase()) // ✓ here data.customer is a string
  } else {
    log('Unexpected data:', data)
  }

  // The same checks protect you when the data is wrong:
  const bad: unknown = JSON.parse('{"id":101,"customer_name":"PT Maju Jaya"}')
  if (typeof bad === 'object' && bad !== null && 'customer' in bad && typeof bad.customer === 'string') {
    log('customer:', bad.customer)
  } else {
    log('Unexpected data, no "customer" string:', bad)
  }
  // (Writing these checks by hand gets long. TS Part 8 uses Zod for it.)
}
