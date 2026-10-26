import { useReducer, useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { linesReducer } from './linesReducer.js'

const products = [
  { name: 'Floor Tile 60x60', price: 120000 },
  { name: 'Wall Tile 30x60', price: 95000 },
  { name: 'Granite Tile 80x80', price: 185000 },
]
const priceOf = (name) => products.find((p) => p.name === name)?.price ?? 0

const initialLines = [{ id: 'line-1', product: 'Floor Tile 60x60', qty: '2' }]

export default function ReducerOrderLines() {
  // useReducer(reducer, initialState) → [state, dispatch]
  const [lines, dispatch] = useReducer(linesReducer, initialLines)
  const [actionLog, setActionLog] = useState([])

  // Wrapper around dispatch: logging is a side effect, so it happens HERE,
  // in the event handler, and the reducer stays pure.
  function send(action) {
    dispatch(action)
    setActionLog((prev) => [...prev, { n: (prev.at(-1)?.n ?? 0) + 1, text: JSON.stringify(action) }].slice(-6))
  }

  // Derived totals
  const lineTotal = (line) => priceOf(line.product) * Number(line.qty)
  const grandTotal = lines.reduce((sum, line) => sum + lineTotal(line), 0)

  return (
    <div>
      <table>
        <tbody>
          {lines.map((line) => (
            <tr key={line.id}>
              <td>
                <select
                  value={line.product}
                  onChange={(e) => send({ type: 'updated_line', id: line.id, field: 'product', value: e.target.value })}
                  aria-label="Product"
                >
                  <option value="">-- Choose --</option>
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={line.qty}
                  onChange={(e) => send({ type: 'updated_line', id: line.id, field: 'qty', value: e.target.value })}
                  style={{ width: 60 }}
                  aria-label="Quantity"
                />
              </td>
              <td>{formatRupiah(lineTotal(line))}</td>
              <td>
                {/* Random ids are created HERE, not in the reducer */}
                <button onClick={() => send({ type: 'duplicated_line', id: line.id, newId: crypto.randomUUID() })}>
                  Duplicate
                </button>{' '}
                <button onClick={() => send({ type: 'removed_line', id: line.id })} disabled={lines.length === 1}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Grand total</th>
            <th>{formatRupiah(grandTotal)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <p>
        <button onClick={() => send({ type: 'added_line', id: crypto.randomUUID() })}>+ Add line</button>{' '}
        <button onClick={() => send({ type: 'cleared', id: crypto.randomUUID() })}>Clear all</button>
      </p>

      <h3>Action log</h3>
      <ol>
        {actionLog.map((entry) => (
          <li key={entry.n}>
            <code>{entry.text}</code>
          </li>
        ))}
      </ol>
    </div>
  )
}
