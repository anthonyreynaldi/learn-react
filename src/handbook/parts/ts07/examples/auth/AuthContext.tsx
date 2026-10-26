import { createContext, useContext, useState, type ReactNode } from 'react'

export type User = {
  name: string
  role: 'admin' | 'staff'
}

// Everything the context provides
type AuthContextValue = {
  user: User | null
  isAdmin: boolean
  login: (user: User) => void
  logout: () => void
}

// The default value is null: "no provider above". The type says so explicitly.
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const value: AuthContextValue = {
    user,
    isAdmin: user?.role === 'admin',
    login: setUser,
    logout: () => setUser(null),
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

// The hook checks for null ONCE, so every caller gets a non-null AuthContextValue
// and never has to write useAuth()?.user.
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider in one file on purpose (Part 10)
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext) // AuthContextValue | null
  if (value === null) {
    throw new Error('useAuth() must be used inside <AuthProvider>.')
  }
  return value // narrowed: AuthContextValue
}
