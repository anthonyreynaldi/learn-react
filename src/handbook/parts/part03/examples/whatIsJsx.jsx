// JSX is not HTML. It is syntax that gets compiled into a function call,
// and that call returns a plain JavaScript object (a "React element").
export default function run(log) {
  const name = 'PT Maju Jaya'
  const element = <h1 className="title">Hello {name}</h1>

  log('element.type:', element.type)
  log('element.props:', JSON.stringify(element.props))
  // It is just an object describing what should appear on screen.
  log('typeof element:', typeof element)
}
