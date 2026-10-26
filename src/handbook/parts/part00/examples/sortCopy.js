// sort() MUTATES the original array. In React you must not mutate state, so copy first.
export default function run(log) {
  // Version 1: sorting directly (changes the original!)
  const namesA = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru']
  log('A before:', namesA)
  const sortedA = namesA.sort()
  log('A after: ', namesA) // the original changed
  log('same array?', sortedA === namesA)

  // Version 2: copy with spread, then sort the copy
  const namesB = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru']
  log('B before:', namesB)
  const sortedB = [...namesB].sort()
  log('B after: ', namesB) // the original is untouched
  log('sorted copy:', sortedB)

  // Numbers need a compare function (default sort compares as text)
  const prices = [120000, 95000, 1500000]
  log('text sort:', [...prices].sort())
  log('number sort:', [...prices].sort((a, b) => a - b))
}
