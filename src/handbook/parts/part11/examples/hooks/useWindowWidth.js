import { useEffect, useState } from 'react'

// A custom hook: the resize-listener logic from Part 8, packed into a
// reusable function. Any component can now write: const width = useWindowWidth()
export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}
