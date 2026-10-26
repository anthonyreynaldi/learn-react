type Log = (...values: unknown[]) => void

// customer? = optional: callers may leave it out. Inside, its type is string | undefined.
function orderLabel(id: number, customer?: string): string {
  return customer ? `#${id} ${customer}` : `#${id}`
}

// rate = 0.11 = a default value. The type (number) is inferred from the default,
// and inside the function rate is always a number, never undefined.
function applyTax(amount: number, rate = 0.11): number {
  return Math.round(amount * (1 + rate))
}

export default function run(log: Log) {
  log(orderLabel(101))
  log(orderLabel(101, 'PT Maju Jaya'))

  log(applyTax(750000)) // uses the default 11% → 832500
  log(applyTax(750000, 0)) // tax-free → 750000

  // Optional parameters must come AFTER the required ones,
  // just like default values in PHP: function f($id, $customer = null)
}
