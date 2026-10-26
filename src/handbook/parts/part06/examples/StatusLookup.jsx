// LOOKUP OBJECT: map each value to what you want to show.
// Shorter than if/else or a long ternary chain.
const statusLabels = {
  pending: 'Waiting for approval',
  approved: 'Approved ✓',
  rejected: 'Rejected ✗',
}

function StatusLabel({ status }) {
  // ?? gives a fallback for statuses that are not in the object
  return <span>{statusLabels[status] ?? `Unknown status (${status})`}</span>
}

export default function StatusLookup() {
  return (
    <ul>
      <li>
        #101: <StatusLabel status="approved" />
      </li>
      <li>
        #102: <StatusLabel status="pending" />
      </li>
      <li>
        #103: <StatusLabel status="rejected" />
      </li>
      <li>
        #109: <StatusLabel status="cancelled" />
      </li>
    </ul>
  )
}
