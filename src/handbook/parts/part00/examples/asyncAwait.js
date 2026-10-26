// async/await lets async code read top-to-bottom. try/catch handles errors.
// Note: fetch() does NOT throw on 404, so we must check response.ok ourselves.
import { fakeFetch } from './fakeFetch.js'

export default async function run(log) {
  async function loadOrders(url) {
    try {
      log(`Loading ${url} ...`)
      const response = await fakeFetch(url) // pause here until the Promise resolves

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      log('Loaded:', data.map((order) => order.customer).join(', '))
    } catch (error) {
      log('Caught error: ' + error.message)
    }
  }

  await loadOrders('/api/orders') // valid URL
  await loadOrders('/api/invoices') // unknown URL -> 404
}
