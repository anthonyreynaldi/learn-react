// IMPURE: reads and changes a variable outside the component while rendering.
// Rendering the same JSX can give different results every time.
let counter = 0

function ImpureTicket() {
  counter++
  return <li>Ticket #{counter}</li>
}

// PURE: the output depends only on its input (a prop, covered in Part 4).
// Same input -> same output, no matter how often React renders it.
function PureTicket({ number }) {
  return <li>Ticket #{number}</li>
}

export default function PureVsImpure() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <h3>Impure</h3>
        <ul>
          <ImpureTicket />
          <ImpureTicket />
          <ImpureTicket />
        </ul>
      </div>
      <div>
        <h3>Pure</h3>
        <ul>
          <PureTicket number={1} />
          <PureTicket number={2} />
          <PureTicket number={3} />
        </ul>
      </div>
    </div>
  )
}
