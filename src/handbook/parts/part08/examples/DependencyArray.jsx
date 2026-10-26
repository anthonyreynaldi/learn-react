import { memo, useEffect, useState } from 'react'

// Adds one line to the parent's log (updater function, so no line is lost).
function addLogLine(setLog, text) {
  setLog((prev) => [...prev, { id: (prev.at(-1)?.id ?? 0) + 1, text }].slice(-12))
}

// Why memo? Writing to the log updates the PARENT's state, which re-renders the
// children. The "no array" effect would then run again, write to the log again,
// and loop forever. memo (Part 11) makes React skip re-rendering a child when its
// props are unchanged, so only count/status changes re-render these children.

// 1. NO dependency array: runs after EVERY render of this component.
const NoArray = memo(function NoArray({ count, status, setLog }) {
  useEffect(() => {
    addLogLine(setLog, `no array → ran (count ${count}, status ${status})`)
  })
  return <li>useEffect(fn): no array</li>
})

// 2. EMPTY array []: runs once, after the first render (on mount).
const EmptyArray = memo(function EmptyArray({ count, status, setLog }) {
  useEffect(() => {
    addLogLine(setLog, '[] → ran')
    // setLog never changes (it is a state setter), so [] is safe here.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- showing the [] case on purpose
  }, [])
  return (
    <li>
      useEffect(fn, []): rendered with count {count}, status {status}
    </li>
  )
})

// 3. [status]: runs on mount, then only when status changed since the last render.
const StatusArray = memo(function StatusArray({ count, status, setLog }) {
  useEffect(() => {
    addLogLine(setLog, `[status] → ran (status ${status})`)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setLog never changes, kept out to show [status]
  }, [status])
  return (
    <li>
      useEffect(fn, [status]): rendered with count {count}, status {status}
    </li>
  )
})

export default function DependencyArray() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('pending')
  const [log, setLog] = useState([])

  return (
    <div>
      <p>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>{' '}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>{' '}
        <button onClick={() => setLog([])}>Clear log</button>
      </p>
      <ul>
        <NoArray count={count} status={status} setLog={setLog} />
        <EmptyArray count={count} status={status} setLog={setLog} />
        <StatusArray count={count} status={status} setLog={setLog} />
      </ul>
      <h3>Effect log</h3>
      <ol>
        {log.map((line) => (
          <li key={line.id}>{line.text}</li>
        ))}
      </ol>
    </div>
  )
}
