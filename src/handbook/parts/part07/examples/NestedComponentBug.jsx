import { useState } from 'react'

// BUGGY: SearchInput is defined INSIDE the parent.
function BuggyPanel() {
  const [query, setQuery] = useState('')

  // Every render of BuggyPanel creates a brand-new SearchInput function.
  // A new function = a new component TYPE, so React unmounts the old
  // input and mounts a new one after every keystroke -> focus is lost.
  function SearchInput() {
    return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Customer" />
  }

  return (
    <div>
      <h3>Defined inside (bug)</h3>
      {/* The linter warns "Cannot create components during render" here.
          The bug is deliberate for this lesson, so the warning is silenced for this line only.
          (In ESLint the rule is called react-hooks/static-components.) */}
      {/* eslint-disable-next-line react/static-components */}
      <SearchInput />
      <p>Searching for: {query}</p>
    </div>
  )
}

// FIXED: SearchInput is defined at the top level and gets data via props.
// It is the same function on every render, so React keeps the input.
function SearchInput({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Customer" />
}

function FixedPanel() {
  const [query, setQuery] = useState('')
  return (
    <div>
      <h3>Defined at top level</h3>
      <SearchInput value={query} onChange={setQuery} />
      <p>Searching for: {query}</p>
    </div>
  )
}

export default function NestedComponentBug() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <BuggyPanel />
      <FixedPanel />
    </div>
  )
}
