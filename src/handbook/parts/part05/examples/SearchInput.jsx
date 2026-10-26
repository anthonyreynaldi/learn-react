import { useState } from 'react'

export default function SearchInput() {
  const [search, setSearch] = useState('')

  // React passes an event object "e" to every handler.
  // e.target is the input element; e.target.value is what the user typed.
  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div>
      {/* value + onChange: the input always shows what is in state */}
      <input value={search} onChange={handleChange} placeholder="Search customers" />
      <p>Searching for: {search}</p>
    </div>
  )
}
