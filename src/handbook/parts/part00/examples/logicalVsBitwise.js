// && and || are LOGICAL operators: they return one of the operands.
// & and | are BITWISE operators: they work on the binary bits of numbers.
// In conditions you almost always want && and ||.
export default function run(log) {
  log('true && "hello" :', true && 'hello') // returns the operand 'hello'
  log('0 || "default"  :', 0 || 'default')

  // 5 = 101 in binary, 3 = 011 in binary
  log('5 & 3 :', 5 & 3) // 001 = 1 (bits set in both)
  log('5 | 3 :', 5 | 3) // 111 = 7 (bits set in either)
  log('5 && 3:', 5 && 3) // 3 (logical: returns the right operand)
  log('5 || 3:', 5 || 3) // 5 (logical: returns the left operand)

  // Bitwise turns values into numbers, so this is just a confusing number
  log("true & 'hello' :", true & 'hello') // 0
}
