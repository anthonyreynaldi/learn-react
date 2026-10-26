// The ONE place in the app that talks to Laravel. Components never call
// fetch() directly; they call api.get('/api/orders'), api.post(...), etc.
//
// Real app: use the browser's fetch and an API URL from the environment:
//   const API_URL = import.meta.env.VITE_API_URL ?? ''
//   const response = await fetch(API_URL + path, options)
// Here: a fake server running in the browser, so the examples work offline.
import { fakeFetch } from './fakeServer.js'

const API_URL = ''

// The token lives in memory (a module variable): it is lost on refresh.
// Storing it in localStorage would survive a refresh, but any XSS script
// could read it. See "Authentication approaches".
let authToken = null

export function setAuthToken(token) {
  authToken = token
}

// Called on every 401, e.g. so the AuthProvider can log the user out
let onUnauthorized = null

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

// A custom error type: an Error that also carries the HTTP status and body.
// Code can check `err instanceof ApiError` and read err.status / err.errors.
export class ApiError extends Error {
  constructor(status, data) {
    super(data?.message ?? `Request failed with status ${status}`) // Error's constructor sets .message
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.errors = data?.errors ?? {} // Laravel's 422 field errors
  }
}

export async function apiRequest(path, { method = 'GET', body } = {}) {
  const headers = { Accept: 'application/json' } // JSON errors from Laravel, not redirects
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (authToken) headers.Authorization = `Bearer ${authToken}`

  const response = await fakeFetch(API_URL + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    if (response.status === 401) onUnauthorized?.()
    throw new ApiError(response.status, data)
  }
  return data
}

// Short helpers, like Laravel's Http::get() / Http::post()
export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: 'POST', body }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body }),
  delete: (path) => apiRequest(path, { method: 'DELETE' }),
}
