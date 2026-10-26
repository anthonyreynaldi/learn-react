// Async code does not block: the rest of the code keeps running while we wait.
import { fakeFetch } from './fakeFetch.js'

export default function run(log) {
  log('1. Start request')

  // .then() registers a callback that runs LATER, when the Promise resolves
  const done = fakeFetch('/api/orders').then((response) => {
    log('3. Response arrived, status', response.status)
  })

  log('2. This line runs first, before the response arrives')

  return done // returned so the handbook waits for it to finish
}
