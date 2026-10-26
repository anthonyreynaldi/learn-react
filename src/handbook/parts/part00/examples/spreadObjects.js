// Spread copies an object's properties. Later keys overwrite earlier ones, so ORDER matters.
export default function run(log) {
  const order = { id: 101, customer: 'PT Maju Jaya', status: 'pending' }

  // Copy with an override: spread first, then the new value
  const approved = { ...order, status: 'approved' }
  log('original:', order) // unchanged
  log('approved:', approved)

  // Wrong order: the spread comes last and overwrites our new status
  const oops = { status: 'approved', ...order }
  log('oops:', oops)

  // Combine two objects
  const customer = { customer: 'CV Sinar Abadi', city: 'Jakarta' }
  const merged = { ...order, ...customer }
  log('merged:', merged)
}
