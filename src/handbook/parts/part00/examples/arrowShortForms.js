// Arrow functions are a shorter way to write functions.
export default function run(log) {
  // Classic function
  function totalA(qty, price) {
    return qty * price
  }

  // Arrow function with a body: needs "return"
  const totalB = (qty, price) => {
    return qty * price
  }

  // Arrow function without { }: the value is returned automatically (implicit return)
  const totalC = (qty, price) => qty * price

  // One parameter: parentheses are optional
  const double = (n) => n * 2
  const triple = n => n * 3

  // No parameters: empty parentheses
  const greet = () => 'Hello!'

  log(totalA(2, 120000), totalB(2, 120000), totalC(2, 120000))
  log(double(5), triple(5), greet())
}
