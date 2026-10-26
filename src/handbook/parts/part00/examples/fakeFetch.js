// A fake fetch() for learning: no network, it just waits ~800 ms and returns a response.
const fakeDatabase = {
  '/api/orders': [
    { id: 1, customer: 'PT Maju Jaya', status: 'approved', total: 1200000 },
    { id: 2, customer: 'CV Sinar Abadi', status: 'pending', total: 480000 },
    { id: 3, customer: 'PT Karya Baru', status: 'rejected', total: 960000 },
  ],
  '/api/orders/1': { id: 1, customer: 'PT Maju Jaya', status: 'approved', total: 1200000 },
}

export function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = url in fakeDatabase
      // Shaped like a real fetch() Response: ok, status and an async json() method
      resolve({
        ok: found,
        status: found ? 200 : 404,
        json: async () => (found ? fakeDatabase[url] : { message: 'Not found' }),
      })
    }, 800)
  })
}
