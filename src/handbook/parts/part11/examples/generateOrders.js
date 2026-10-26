// Generates lots of sample orders for the performance examples.
// It uses a seeded random generator, so every page load produces the
// SAME orders. That keeps timing comparisons fair.

const customers = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru', 'CV Berkah Jaya', 'PT Sentosa Abadi', 'UD Makmur']
const statuses = ['pending', 'approved', 'rejected']

// Tiny pseudo-random generator: same seed → same sequence of numbers
function createRandom(seed) {
  let state = seed
  return function random() {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

export function generateOrders(count, seed = 42) {
  const random = createRandom(seed)
  const orders = []
  for (let i = 0; i < count; i++) {
    orders.push({
      id: 1001 + i,
      customer: customers[Math.floor(random() * customers.length)],
      status: statuses[Math.floor(random() * statuses.length)],
      total: Math.round((100000 + random() * 4900000) / 1000) * 1000, // Rp 100.000 – 5.000.000
    })
  }
  return orders
}
