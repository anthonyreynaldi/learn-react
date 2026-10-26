import { useReducer } from 'react'
import { formatRupiah } from './types.ts'

type Line = { id: string; product: string; qty: number }

// One shape per action (a discriminated union, TS Part 4)
type LineAction =
  | { type: 'added'; id: string }
  | { type: 'removed'; id: string }
  | { type: 'product_changed'; id: string; product: string }
  | { type: 'qty_changed'; id: string; qty: number }

const prices: Record<string, number> = { 'Floor Tile 60x60': 120000, 'Wall Tile 30x60': 95000 }

// The return type Line[] and NO default case: if a new action is added to
// LineAction without a case here, the function could end without returning,
// and TypeScript reports it (see the code example below).
function linesReducer(lines: Line[], action: LineAction): Line[] {
  switch (action.type) {
    case 'added':
      return [...lines, { id: action.id, product: 'Floor Tile 60x60', qty: 1 }]
    case 'removed':
      return lines.filter((l) => l.id !== action.id)
    case 'product_changed':
      return lines.map((l) => (l.id === action.id ? { ...l, product: action.product } : l))
    case 'qty_changed':
      return lines.map((l) => (l.id === action.id ? { ...l, qty: action.qty } : l))
  }
}

export default function ReducerLines() {
  // The state type (Line[]) and action type (LineAction) come from linesReducer
  const [lines, dispatch] = useReducer(linesReducer, [{ id: 'line-1', product: 'Floor Tile 60x60', qty: 2 }])
  const total = lines.reduce((sum, l) => sum + (prices[l.product] ?? 0) * l.qty, 0)

  return (
    <div>
      {lines.map((l) => (
        <p key={l.id}>
          <select
            value={l.product}
            onChange={(e) => dispatch({ type: 'product_changed', id: l.id, product: e.target.value })}
            aria-label="Product"
          >
            {Object.keys(prices).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>{' '}
          <input
            type="number"
            value={l.qty}
            onChange={(e) => dispatch({ type: 'qty_changed', id: l.id, qty: Number(e.target.value) })}
            style={{ width: 60 }}
            aria-label="Quantity"
          />{' '}
          <button onClick={() => dispatch({ type: 'removed', id: l.id })} disabled={lines.length === 1}>
            Remove
          </button>
        </p>
      ))}
      <button onClick={() => dispatch({ type: 'added', id: crypto.randomUUID() })}>+ Add line</button>{' '}
      <strong>Total: {formatRupiah(total)}</strong>
    </div>
  )
}
