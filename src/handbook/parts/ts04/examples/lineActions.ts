// Part 10's linesReducer, typed. Each action is one shape of a discriminated
// union; `type` is the discriminant.
type Line = { id: string; product: string; qty: string }

type LineAction =
  | { type: 'added_line'; id: string }
  | { type: 'removed_line'; id: string }
  | { type: 'updated_line'; id: string; field: 'product' | 'qty'; value: string }
  | { type: 'cleared'; id: string }

export function linesReducer(lines: Line[], action: LineAction): Line[] {
  switch (action.type) {
    case 'added_line':
      return [...lines, { id: action.id, product: '', qty: '1' }]
    case 'removed_line':
      return lines.filter((line) => line.id !== action.id)
    case 'updated_line':
      // Only here do field and value exist on action
      return lines.map((line) => (line.id === action.id ? { ...line, [action.field]: action.value } : line))
    case 'cleared':
      return [{ id: action.id, product: '', qty: '1' }]
    default: {
      // Exhaustiveness check: if a new action type is added to LineAction but
      // not handled above, this assignment becomes a type error.
      const unhandled: never = action
      throw new Error(`Unknown action: ${JSON.stringify(unhandled)}`)
    }
  }
}

// Mistakes in actions are caught where the action is written:
// linesReducer(lines, { type: 'updated_line', id: 'a', field: 'price', value: '1' })
// ✗ Type '"price"' is not assignable to type '"product" | "qty"'.
// linesReducer(lines, { type: 'removed', id: 'a' })
// ✗ Type '"removed"' is not assignable to type '"added_line" | "removed_line" | "updated_line" | "cleared"'.
