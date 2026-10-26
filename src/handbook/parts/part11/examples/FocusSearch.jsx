import { useEffect, useRef } from 'react'

export default function FocusSearch() {
  // Will point at the real <input> DOM element
  const inputRef = useRef(null)

  // During render inputRef.current is still null: the <input> doesn't exist yet.
  // React fills it in the COMMIT step, so effects and handlers can use it.
  useEffect(() => {
    // Focus on mount. preventScroll: don't jump the handbook page to this example.
    inputRef.current.focus({ preventScroll: true })
  }, [])

  function handleFocusClick() {
    inputRef.current.focus()
    inputRef.current.select() // also select the existing text
  }

  return (
    <div>
      {/* ref={inputRef}: "put this element into inputRef.current" */}
      <input ref={inputRef} defaultValue="PT Maju Jaya" placeholder="Search customers" />{' '}
      <button onClick={handleFocusClick}>Focus search</button>
    </div>
  )
}
