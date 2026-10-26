// Handbook shell — uses concepts from later parts (useState, class components,
// error boundaries). You don't need to understand it yet.
//
// Renders an example component live inside the "Result" box. The box has its
// own base styles (see .example-result in handbook.css) so plain HTML looks normal.
import { Component, useState } from 'react'
import { RotateCcw } from 'lucide-react'

// Catches errors thrown while rendering an example, so one broken example
// doesn't crash the whole handbook. (Error boundaries must be class components.)
class ExampleErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <p className="font-mono text-sm text-red-600 dark:text-red-400">
          {this.state.error.name}: {this.state.error.message}
        </p>
      )
    }
    return this.props.children
  }
}

function ReactResult({ component: Example }) {
  // Changing the key remounts the example from scratch.
  const [mountKey, setMountKey] = useState(0)

  return (
    <div className="relative rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-white">
      <button
        type="button"
        onClick={() => setMountKey((k) => k + 1)}
        className="absolute right-2 top-2 z-10 rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
        title="Remount example"
        aria-label="Remount example"
      >
        <RotateCcw size={14} />
      </button>
      <div className="example-result p-5 pr-10">
        <ExampleErrorBoundary key={mountKey}>
          <Example />
        </ExampleErrorBoundary>
      </div>
    </div>
  )
}

export default ReactResult
