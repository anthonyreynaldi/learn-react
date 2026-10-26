// A fake server for the examples. In a real app you would call fetch()
// and Laravel would answer. Here we can control the delay and force errors.

const database = {
  '/api/orders': [
    { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
    { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
    { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'rejected' },
    { id: 104, customer: 'PT Maju Jaya', total: 2100000, status: 'pending' },
    { id: 105, customer: 'CV Sinar Abadi', total: 320000, status: 'approved' },
  ],
  '/api/customers/1': { id: 1, name: 'PT Maju Jaya', city: 'Jakarta', phone: '021-5550101' },
  '/api/customers/2': { id: 2, name: 'CV Sinar Abadi', city: 'Bandung', phone: '022-5550202' },
  '/api/customers/3': { id: 3, name: 'PT Karya Baru', city: 'Surabaya', phone: '031-5550303' },
}

// Works like fetch(url): returns a Promise of a Response-like object
// { ok, status, json() }. Options:
//   delay: milliseconds before the "server" answers
//   fail:  true = answer with a 500 server error
export function fakeFetch(url, { delay = 800, fail = false } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fail) {
        resolve({ ok: false, status: 500, json: async () => ({ message: 'Server error' }) })
        return
      }
      const data = database[url]
      if (data === undefined) {
        resolve({ ok: false, status: 404, json: async () => ({ message: 'Not found' }) })
        return
      }
      // structuredClone: every response is a fresh copy, like real JSON from a server
      resolve({ ok: true, status: 200, json: async () => structuredClone(data) })
    }, delay)
  })
}
