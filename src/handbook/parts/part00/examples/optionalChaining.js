// ?. stops and returns undefined if the value before it is null or undefined.
// Combine with ?? to provide a fallback. (Similar to PHP 8's ?-> and ??)
export default function run(log) {
  const orderA = { customer: { name: 'PT Maju Jaya', address: { city: 'Jakarta' } } }
  const orderB = { customer: null }

  log(orderA.customer.address.city)

  // Without ?. this would throw an error
  try {
    log(orderB.customer.address.city)
  } catch (error) {
    log('Error: ' + error.message)
  }

  // With ?. it safely returns undefined
  log(orderB.customer?.address?.city)

  // With ?? we get a fallback value
  log(orderB.customer?.address?.city ?? 'Unknown city')

  // Also works for arrays and method calls
  const orders = []
  log(orders[0]?.customer ?? 'No orders yet')
  log(orderB.customer?.getName?.() ?? 'No name')
}
