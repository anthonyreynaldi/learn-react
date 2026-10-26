import { useEffect, useState } from 'react'

export default function DocumentTitle() {
  const [count, setCount] = useState(0)

  // useEffect runs AFTER React has updated the DOM and the browser has painted.
  // Changing document.title is a side effect: it touches something outside React.
  useEffect(() => {
    const originalTitle = document.title
    document.title = `Clicked ${count} times`

    // Cleanup: runs before the next effect and when the component is removed.
    // It restores the title, so leaving this topic doesn't leave it changed.
    return () => {
      document.title = originalTitle
    }
  }, [count])

  return (
    <div>
      <p>Look at the browser tab title.</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </div>
  )
}
