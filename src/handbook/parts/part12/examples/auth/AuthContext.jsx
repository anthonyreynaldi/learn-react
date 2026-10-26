import { createContext, useContext, useEffect, useState } from 'react'
import { api, setAuthToken, setUnauthorizedHandler } from '../api/client.js'

const AuthContext = createContext(null)

// Owns "who is logged in". status: 'checking' | 'authenticated' | 'guest'
export function AuthProvider({ children }) {
  const [status, setStatus] = useState('checking')
  const [user, setUser] = useState(null)

  useEffect(() => {
    let ignore = false

    // Any 401 from the API client (e.g. an expired session) logs us out
    setUnauthorizedHandler(() => {
      setAuthToken(null)
      setUser(null)
      setStatus('guest')
    })

    // On start: ask the server who we are. (A real app might first read a
    // token from storage; this demo keeps the token in memory only, so after
    // a page refresh you are a guest again.)
    api
      .get('/api/user')
      .then((currentUser) => {
        if (!ignore) {
          setUser(currentUser)
          setStatus('authenticated')
        }
      })
      .catch(() => {
        if (!ignore) setStatus('guest')
      })

    return () => {
      ignore = true
      setUnauthorizedHandler(null)
    }
  }, [])

  async function login(email, password) {
    // Errors (422 wrong password) are thrown to the LoginPage, which shows them
    const { token, user: loggedIn } = await api.post('/api/login', { email, password })
    setAuthToken(token)
    setUser(loggedIn)
    setStatus('authenticated')
  }

  async function logout() {
    try {
      await api.post('/api/logout')
    } catch {
      // Already logged out on the server: fine
    }
    setAuthToken(null)
    setUser(null)
    setStatus('guest')
  }

  const value = { status, user, isAdmin: user?.role === 'admin', login, logout }
  return <AuthContext value={value}>{children}</AuthContext>
}

// Hook + provider in one file is the usual context pattern (see Part 10)
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider in one file on purpose
export function useAuth() {
  const value = useContext(AuthContext)
  if (value === null) throw new Error('useAuth() must be used inside <AuthProvider>.')
  return value
}
