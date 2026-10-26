import { useState } from 'react'

export default function StatusString() {
  // ONE string instead of isLoading / isSuccess / isError booleans.
  // It can only ever be one of: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('idle')

  // Booleans can still be DERIVED when convenient
  const isLoading = status === 'loading'

  let content
  if (status === 'idle') content = <p>Press "Load orders" to start.</p>
  else if (status === 'loading') content = <p>Loading orders…</p>
  else if (status === 'success') content = <p style={{ color: 'green' }}>Loaded 8 orders.</p>
  else content = <p style={{ color: 'red' }}>Could not load orders.</p>

  return (
    <div>
      <p>
        <button onClick={() => setStatus('loading')} disabled={isLoading}>
          Load orders
        </button>{' '}
        <button onClick={() => setStatus('success')} disabled={!isLoading}>
          Simulate success
        </button>{' '}
        <button onClick={() => setStatus('error')} disabled={!isLoading}>
          Simulate error
        </button>{' '}
        <button onClick={() => setStatus('idle')}>Reset</button>
      </p>
      {content}
      <p>
        <small>status: {JSON.stringify(status)}</small>
      </p>
    </div>
  )
}
