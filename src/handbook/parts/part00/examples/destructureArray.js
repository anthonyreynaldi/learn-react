// Array destructuring takes values by POSITION, and you choose the names.
export default function run(log) {
  const customers = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru']

  const [first, second] = customers
  log(first, '|', second)

  // Skip a position with an empty slot
  const [, , third] = customers
  log(third)

  // Default value for a missing position
  const [a, b, c, d = 'No customer'] = customers
  log(a, b, c, d)

  // This is exactly how React's useState works:
  //   const [qty, setQty] = useState(1)
  // useState returns an array of two things: [currentValue, setterFunction]
  function fakeUseState(initial) {
    return [initial, (v) => log('would set to', v)]
  }
  const [qty, setQty] = fakeUseState(1)
  log('qty:', qty)
  setQty(2)
}
