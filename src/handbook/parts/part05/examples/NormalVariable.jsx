// BROKEN on purpose: a normal variable is not React state.
export default function Counter() {
  // This line runs again on EVERY render, so count always starts at 0.
  let count = 0

  function handleClick() {
    // The variable does change...
    count = count + 1
    console.log('count is now', count)
    // ...but React doesn't know, so it never re-renders the screen.
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1</button>
      <p>
        <small>Open the browser console (F12) to see the logs.</small>
      </p>
    </div>
  )
}
