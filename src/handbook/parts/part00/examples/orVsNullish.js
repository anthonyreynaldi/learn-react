// || uses the right side when the left is FALSY (0, '', false, null, undefined).
// ?? uses the right side only when the left is null or undefined.
export default function run(log) {
  const discount = 0 // a real value: no discount
  const note = '' // a real value: empty note
  const missing = undefined

  log('discount || 10 :', discount || 10) // 10 - wrong! 0 was a real value
  log('discount ?? 10 :', discount ?? 10) // 0  - correct

  // JSON.stringify shows the quotes, so the empty string is visible
  log("note || 'none' :", JSON.stringify(note || 'none'))
  log("note ?? 'none' :", JSON.stringify(note ?? 'none')) // "" - kept the empty note

  log('missing || 10 :', missing || 10)
  log('missing ?? 10 :', missing ?? 10) // both give 10 here
}
