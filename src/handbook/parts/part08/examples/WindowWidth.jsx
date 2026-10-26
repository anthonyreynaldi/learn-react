import { useEffect, useState } from 'react'

export default function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    // START: listen to the browser's resize event
    window.addEventListener('resize', handleResize)
    // STOP: remove the SAME function when the component is removed
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <p>Window width: {width}px (resize the browser window)</p>
}
