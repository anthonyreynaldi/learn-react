import { useEffect, useState } from 'react'

function Watcher({ onLog }) {
  useEffect(() => {
    onLog('effect ran')
    return () => onLog('cleanup ran')
    // [] = run on mount, clean up on unmount. onLog is left out on purpose:
    // listing it would re-run the effect on every parent render.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount/unmount only, for this demo
  }, [])
  return <p>Watcher is mounted.</p>
}

export default function StrictModeEffect() {
  const [log, setLog] = useState([])
  const [show, setShow] = useState(true)

  // Appends with an updater function, so lines from quick
  // effect → cleanup → effect sequences are never lost.
  function addLine(text) {
    setLog((prev) => [...prev, { id: prev.length + 1, text }])
  }

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'Unmount Watcher' : 'Mount Watcher'}</button>{' '}
      <button onClick={() => setLog([])}>Clear log</button>
      {show && <Watcher onLog={addLine} />}
      <h3>Log</h3>
      <ol>
        {log.map((line) => (
          <li key={line.id}>{line.text}</li>
        ))}
      </ol>
    </div>
  )
}
