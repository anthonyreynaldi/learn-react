import { useEffect, useState } from 'react'

// Returns `value`, but only after it has stopped changing for `delay` ms.
// Typing "maju" quickly gives ONE debounced update ("maju"), not four.
export function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Every new value starts a new timer...
    const timerId = setTimeout(() => setDebounced(value), delay)
    // ...and the cleanup cancels the previous one (Part 8 cleanup)
    return () => clearTimeout(timerId)
  }, [value, delay])

  return debounced
}
