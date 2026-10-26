import { Component, useState } from 'react'

// An ERROR BOUNDARY catches errors thrown while rendering its children and
// shows a fallback instead of a blank page. This is the ONE place where React
// still needs a class component (no hook can do this yet). Most apps install
// the react-error-boundary package instead of writing this themselves.
class ErrorBoundary extends Component {
  state = { error: null }

  // Called when a child throws: switch to the fallback
  static getDerivedStateFromError(error) {
    return { error }
  }

  // Called after: a good place to report the error (e.g. to Sentry, or a Laravel log endpoint)
  componentDidCatch(error, info) {
    console.log('Error boundary caught:', error.message, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ border: '1px solid #fca5a5', background: '#fef2f2', padding: 10, borderRadius: 6 }}>
          <p style={{ color: '#b91c1c' }}>This widget crashed: {this.state.error.message}</p>
          {/* Resetting the state renders the children again, as a fresh component */}
          <button onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      )
    }
    return this.props.children
  }
}

function SalesWidget() {
  const [broken, setBroken] = useState(false)
  // Throwing DURING RENDER is what an error boundary catches.
  // (Errors in event handlers and effects are not caught; use try/catch there.)
  if (broken) {
    throw new Error('Cannot read the sales figures')
  }
  return (
    <div style={{ border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
      <p>Sales this month: Rp 12.450.000</p>
      <button onClick={() => setBroken(true)}>Break this widget</button>
    </div>
  )
}

function OtherWidget() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
      <p>Another widget, outside the boundary.</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </div>
  )
}

export default function ErrorBoundaryDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {/* Only this subtree is replaced when it crashes */}
      <ErrorBoundary>
        <SalesWidget />
      </ErrorBoundary>
      <OtherWidget />
    </div>
  )
}
