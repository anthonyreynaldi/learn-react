import { useState } from 'react'

export default function JsxVariable() {
  const [status, setStatus] = useState('pending')

  // A VARIABLE HOLDING JSX: use a normal if/else before the return,
  // then put the variable in the JSX. Good when there are 3+ cases.
  let actions
  if (status === 'pending') {
    actions = (
      <>
        <button>Approve</button> <button>Reject</button>
      </>
    )
  } else if (status === 'approved') {
    actions = <button>Print invoice</button>
  } else {
    actions = null // rejected: no actions
  }

  return (
    <div>
      <p>
        Status:{' '}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>
      </p>
      <p>Actions: {actions}</p>
    </div>
  )
}
