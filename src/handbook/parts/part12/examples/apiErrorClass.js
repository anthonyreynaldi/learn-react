import { ApiError } from './api/client.js'

// class / extends / super / instanceof, using ApiError from the API client
export default function run(log) {
  // `class ApiError extends Error`: ApiError IS an Error, plus extra fields.
  // Its constructor calls super(message), which runs Error's constructor
  // (like parent::__construct($message) in a PHP exception class).
  const err = new ApiError(422, {
    message: 'The given data was invalid.',
    errors: { customer: ['The customer field is required.'] },
  })

  log('err.name:', err.name)
  log('err.message (set by super):', err.message)
  log('err.status:', err.status)
  log('err.errors:', err.errors)

  // instanceof checks the class chain, like PHP's instanceof
  log('err instanceof ApiError:', err instanceof ApiError)
  log('err instanceof Error:', err instanceof Error)

  const plain = new Error('Failed to fetch') // e.g. no network
  log('plain instanceof ApiError:', plain instanceof ApiError)

  // That's how a catch block tells server errors from network errors
  for (const e of [err, plain]) {
    if (e instanceof ApiError) log(`→ server said ${e.status}: show field errors`)
    else log(`→ not from the server: "${e.message}", show "check your connection"`)
  }

  // Thrown and caught like any error
  try {
    throw new ApiError(403, { message: 'This action is unauthorized.' })
  } catch (caught) {
    log('caught:', `${caught.name} ${caught.status} – ${caught.message}`)
  }
}
