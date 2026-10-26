import { useLocation, useNavigate } from 'react-router'

// A pretend browser address bar for the examples.
// The handbook already uses the real URL (#part12/...) for its own navigation,
// so the examples use MemoryRouter, which keeps its "URL" in memory.
// This bar shows that in-memory URL, with Back/Forward like a browser.
export default function AddressBar() {
  const location = useLocation() // { pathname: '/orders/101', search: '?status=pending', ... }
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: '#f4f4f5',
        border: '1px solid #d4d4d8',
        borderRadius: 8,
        padding: '4px 6px',
        marginBottom: 12,
      }}
    >
      <button onClick={() => navigate(-1)} title="Back" aria-label="Back">
        ←
      </button>
      <button onClick={() => navigate(1)} title="Forward" aria-label="Forward">
        →
      </button>
      <code style={{ flex: 1, background: 'white', padding: '3px 8px', borderRadius: 4 }}>
        https://app.ptmaju.test{location.pathname}
        {location.search}
      </code>
    </div>
  )
}
