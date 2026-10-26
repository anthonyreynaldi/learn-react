// A REDUCER: (currentState, action) => nextState
// - pure: no side effects, no random ids, no logging, no fetch
// - never mutates: always returns new arrays/objects
// - plain JavaScript: no React needed, so it is easy to test
//
// State: an array of order lines [{ id, product, qty }]
// Action: an object describing WHAT happened, e.g. { type: 'removed_line', id }
export function linesReducer(lines, action) {
  switch (action.type) {
    case 'added_line':
      // The new id is created by the event handler and passed in the action
      return [...lines, { id: action.id, product: '', qty: '1' }]

    case 'removed_line':
      return lines.filter((line) => line.id !== action.id)

    case 'updated_line':
      return lines.map((line) => (line.id === action.id ? { ...line, [action.field]: action.value } : line))

    case 'duplicated_line': {
      const index = lines.findIndex((line) => line.id === action.id)
      const copy = { ...lines[index], id: action.newId }
      // Insert the copy right after the original
      return [...lines.slice(0, index + 1), copy, ...lines.slice(index + 1)]
    }

    case 'cleared':
      return [{ id: action.id, product: '', qty: '1' }]

    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
