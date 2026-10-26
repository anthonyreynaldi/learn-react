// Curly braces accept EXPRESSIONS (anything that produces a value):
// variables, math, function calls, ternaries.
// They do NOT accept STATEMENTS like if, for, or const declarations.
export default function Expressions() {
  const qty = 3
  const status = 'pending'

  // An if statement cannot go inside {}, so do the work BEFORE the return...
  let message
  if (status === 'approved') {
    message = 'ready to ship'
  } else if (status === 'pending') {
    message = 'waiting for approval'
  } else {
    message = 'cancelled'
  }

  return (
    <div>
      <p>3 boxes x 120000 = {qty * 120000}</p>
      <p>Customer: {'pt maju jaya'.toUpperCase()}</p>

      {/* A ternary IS an expression, so it can go directly inside {}. */}
      <p>Inline ternary: {status === 'approved' ? 'ready to ship' : 'not yet'}</p>

      {/* ...then put the value computed by the if statement in {}. */}
      <p>Computed before return: {message}</p>

      {/* {if (qty > 0) { ... }} here would be a syntax error */}
    </div>
  )
}
