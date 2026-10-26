import { linesReducer } from './linesReducer.js'

// A reducer is just a function: call it directly, no React, no browser.
// This is how you would unit-test it (like testing a Laravel service class).
export default function run(log) {
  let state = [{ id: 'a', product: 'Floor Tile 60x60', qty: '2' }]
  log('start:', state)

  state = linesReducer(state, { type: 'added_line', id: 'b' })
  log('added_line b:', state)

  state = linesReducer(state, { type: 'updated_line', id: 'b', field: 'product', value: 'Wall Tile 30x60' })
  log('updated_line b.product:', state)

  state = linesReducer(state, { type: 'duplicated_line', id: 'a', newId: 'c' })
  log('duplicated_line a → c:', state.map((line) => line.id))

  state = linesReducer(state, { type: 'removed_line', id: 'b' })
  log('removed_line b:', state.map((line) => line.id))

  // Same input → same output, and the old state is never changed
  const before = [{ id: 'x', product: '', qty: '1' }]
  const after = linesReducer(before, { type: 'updated_line', id: 'x', field: 'qty', value: '5' })
  log('old state unchanged:', before[0].qty, '| new state:', after[0].qty)

  // Unknown actions fail loudly
  linesReducer(state, { type: 'exploded' })
}
