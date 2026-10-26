import { createContext, useContext, useState } from 'react'

// Not exported: other files can only use the provider and the hook below.
// That keeps the "how" (context, state) private and the "what" (useAuth) public.
const AuthContext = createContext(null)

// The PROVIDER owns the state and shares it with everything inside it.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const value = {
    user,
    isAdmin: user?.role === 'admin', // derived
    login: (newUser) => setUser(newUser),
    logout: () => setUser(null),
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

// A small custom hook (Part 11): a function starting with "use" that calls other hooks.
// Exporting a hook next to the provider is the usual pattern for context files.
// The linter warns because Vite's Fast Refresh then reloads the page instead of
// hot-swapping when this file is edited. Harmless here, so the warning is silenced.
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider in one file on purpose
export function useAuth() {
  const value = useContext(AuthContext)
  if (value === null) {
    // Helpful error instead of "cannot read properties of null"
    throw new Error('useAuth() must be used inside <AuthProvider>.')
  }
  return value
}
