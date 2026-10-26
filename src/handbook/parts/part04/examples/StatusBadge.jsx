// A lookup object maps each status to a color (instead of a long if/else).
const colors = {
  approved: 'green',
  pending: 'orange',
  rejected: 'red',
}

// Default values work just like default function parameters in PHP:
// they are used when the prop is missing (undefined).
function StatusBadge({ status = 'pending', large = false }) {
  return (
    <span
      style={{
        backgroundColor: colors[status] || 'gray',
        color: 'white',
        padding: large ? '6px 14px' : '2px 8px',
        fontSize: large ? 18 : 12,
        borderRadius: 4,
        marginRight: 8,
      }}
    >
      {String(status)}
    </span>
  )
}

export default function StatusBadgeDemo() {
  return (
    <div>
      <p>
        {/* No props at all: both defaults are used */}
        <StatusBadge />
        <StatusBadge status="approved" />
        <StatusBadge status="rejected" />
      </p>
      <p>
        {/* Boolean shorthand: "large" alone means large={true} */}
        <StatusBadge status="approved" large />
        <StatusBadge large={false} status="rejected" />
      </p>
      <p>
        {/* undefined -> default "pending" is used */}
        <StatusBadge status={undefined} />
        {/* null -> the default is NOT used; status really is null */}
        <StatusBadge status={null} />
      </p>
    </div>
  )
}
