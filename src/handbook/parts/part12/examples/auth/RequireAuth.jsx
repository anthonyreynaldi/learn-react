import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './AuthContext.jsx'

// A LAYOUT ROUTE that guards all its child routes, like Laravel's
// Route::middleware('auth')->group(...)
export default function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  // Don't decide while we don't know yet (avoids a flash of the login page)
  if (status === 'checking') return <p>Checking your session…</p>

  if (status === 'guest') {
    // Redirect to /login and remember where the user wanted to go.
    // replace: the protected URL is replaced, so Back doesn't bounce to it.
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
