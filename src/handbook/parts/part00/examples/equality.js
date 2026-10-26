// === checks value AND type (strict). == converts types first (loose). Always use ===.
export default function run(log) {
  log("1 == '1'  :", 1 == '1') // true - the string is converted
  log("1 === '1' :", 1 === '1') // false - different types

  log("0 == ''   :", 0 == '') // true (surprising!)
  log("0 === ''  :", 0 === '') // false

  log('null == undefined  :', null == undefined) // true
  log('null === undefined :', null === undefined) // false

  // Objects are compared by reference, not by contents
  const a = { status: 'approved' }
  const b = { status: 'approved' }
  log('a === b :', a === b) // false - two different objects
  log('a === a :', a === a) // true - same object
}
