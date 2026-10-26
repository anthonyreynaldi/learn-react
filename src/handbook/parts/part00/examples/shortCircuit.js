// Short-circuit: && and || stop as soon as the answer is known,
// so the right side might never run. Bitwise & and | always run both sides.
export default function run(log) {
  function check(name, result) {
    log(`  check(${name}) was called`)
    return result
  }

  log('false && check(B):')
  log('  result:', false && check('B', true)) // check never called

  log('true || check(B):')
  log('  result:', true || check('B', true)) // check never called

  log('true && check(B):')
  log('  result:', true && check('B', true)) // check IS called

  log('false & check(B):')
  log('  result:', false & check('B', true)) // bitwise: always called
}
