// To return an object with implicit return, wrap it in parentheses.
export default function run(log) {
  // WRONG: the { } is read as a function body, not an object.
  // "customer: name" becomes a label, and nothing is returned.
  const makeOrderWrong = (name) => { customer: name }

  // RIGHT: ( { ... } ) tells JavaScript "this is an object value"
  const makeOrderRight = (name) => ({ customer: name })

  log('wrong:', makeOrderWrong('PT Maju Jaya'))
  log('right:', makeOrderRight('PT Maju Jaya'))
}
