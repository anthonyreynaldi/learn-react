// Spread (...) "unpacks" an array into a new array.
export default function run(log) {
  const tiles = ['Floor Tile 60x60', 'Wall Tile 30x60']
  const extras = ['Tile Grout', 'Tile Adhesive']

  // Copy: a NEW array with the same items
  const copy = [...tiles]
  copy.push('Mosaic Tile')
  log('original:', tiles) // unchanged
  log('copy:', copy)
  log('same array?', copy === tiles)

  // Combine arrays
  const all = [...tiles, ...extras]
  log('combined:', all)

  // Add an item without changing the original (common in React state)
  const withNew = [...tiles, 'Roof Tile']
  log('with new item:', withNew)
}
