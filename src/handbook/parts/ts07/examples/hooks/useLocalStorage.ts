import { useEffect, useState } from 'react'

// Part 11's useLocalStorage, now generic: T is inferred from initialValue,
// or given explicitly: useLocalStorage<OrderStatus>('status', 'pending')
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    // JSON.parse returns any; `as T` trusts what is stored (another tab or an old
    // version of the app could have stored something else).
    return saved !== null ? (JSON.parse(saved) as T) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // `as const` makes the return type a TUPLE: readonly [T, Dispatch<SetStateAction<T>>].
  // Without it, it would be (T | Dispatch<...>)[], and destructuring would lose the types.
  return [value, setValue] as const
}
