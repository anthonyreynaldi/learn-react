// Shows the first error message for one field, or nothing.
// errors has Laravel's shape: { customer: ['The customer field is required.'] }
export default function FieldError({ errors, name }) {
  const messages = errors[name]
  if (!messages) return null
  return <div style={{ color: '#dc2626', fontSize: 13, marginTop: 4 }}>{messages[0]}</div>
}
