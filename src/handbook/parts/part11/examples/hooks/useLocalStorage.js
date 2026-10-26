import { useEffect, useState } from 'react'

// Works like useState, but the value is also saved in localStorage,
// so it survives a page refresh.
//   const [warehouse, setWarehouse] = useLocalStorage('preferred-warehouse', 'SBY')
export function useLocalStorage(key, initialValue) {
  // Read once, on the first render (initializer function)
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue // e.g. invalid JSON in storage
    }
  })

  // Save after every change (writing to localStorage is a side effect)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Same shape as useState: [value, setter]
  return [value, setValue]
}
