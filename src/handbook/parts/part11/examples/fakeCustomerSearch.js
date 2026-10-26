// A fake search endpoint, like GET /api/customers?search=maju in Laravel.
// In a real app this would be fetch(`/api/customers?search=${query}`).

const customers = [
  { id: 1, name: 'PT Maju Jaya', city: 'Jakarta' },
  { id: 2, name: 'CV Sinar Abadi', city: 'Bandung' },
  { id: 3, name: 'PT Karya Baru', city: 'Surabaya' },
  { id: 4, name: 'CV Berkah Jaya', city: 'Semarang' },
  { id: 5, name: 'PT Sentosa Abadi', city: 'Malang' },
  { id: 6, name: 'UD Makmur', city: 'Sidoarjo' },
  { id: 7, name: 'PT Maju Bersama', city: 'Surabaya' },
  { id: 8, name: 'CV Karya Mandiri', city: 'Jakarta' },
]

export function fakeSearchCustomers(query, { delay = 500 } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = query.trim().toLowerCase()
      const results = customers.filter((c) => c.name.toLowerCase().includes(q))
      resolve({ ok: true, status: 200, json: async () => results })
    }, delay)
  })
}
