import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import FieldError from './FieldError.jsx'
import { fakePostOrder } from './fakeOrderApi.js'

const products = [
  { name: 'Floor Tile 60x60', price: 120000 },
  { name: 'Wall Tile 30x60', price: 95000 },
  { name: 'Granite Tile 80x80', price: 185000 },
]

function priceOf(productName) {
  return products.find((p) => p.name === productName)?.price ?? 0
}

// Each line gets a STABLE id when it is created. It is only for React's key,
// not for Laravel. crypto.randomUUID() runs once per line, NOT on every
// render like key={Math.random()} would.
function newLine() {
  return { id: crypto.randomUUID(), product: '', qty: '1' }
}

export default function OrderLinesForm() {
  const [customer, setCustomer] = useState('PT Karya Baru')
  const [lines, setLines] = useState(() => [newLine()])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [savedId, setSavedId] = useState(null)

  function addLine() {
    setLines([...lines, newLine()])
  }

  function removeLine(id) {
    setLines(lines.filter((line) => line.id !== id))
    // Row indexes shift after a removal, so "lines.N.*" errors no longer fit
    setErrors({})
  }

  function updateLine(id, field, value) {
    setLines(lines.map((line) => (line.id === id ? { ...line, [field]: value } : line)))
  }

  // Derived totals
  const lineTotal = (line) => priceOf(line.product) * Number(line.qty)
  const grandTotal = lines.reduce((sum, line) => sum + lineTotal(line), 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSavedId(null)
    // Build the payload: strip the temporary ids, convert qty to a number.
    // warehouse and deliveryDate are fixed here to keep the example short.
    const payload = {
      customer,
      warehouse: 'SBY',
      deliveryDate: '2099-12-31',
      lines: lines.map((line) => ({ product: line.product, qty: Number(line.qty) })),
    }
    try {
      const response = await fakePostOrder(payload)
      const data = await response.json()
      if (response.status === 422) setErrors(data.errors)
      else if (response.ok) {
        setErrors({})
        setSavedId(data.id)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ol-customer">Customer </label>
        <input id="ol-customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        <FieldError errors={errors} name="customer" />
      </div>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Line total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => (
            // key = the stable generated id. The INDEX is only used to find
            // Laravel's "lines.N.field" errors, which are numbered by position.
            <tr key={line.id}>
              <td>
                <select
                  value={line.product}
                  onChange={(e) => updateLine(line.id, 'product', e.target.value)}
                  aria-label={`Product, line ${index + 1}`}
                >
                  <option value="">-- Choose --</option>
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <FieldError errors={errors} name={`lines.${index}.product`} />
              </td>
              <td>
                <input
                  type="number"
                  value={line.qty}
                  onChange={(e) => updateLine(line.id, 'qty', e.target.value)}
                  style={{ width: 70 }}
                  aria-label={`Quantity, line ${index + 1}`}
                />
                <FieldError errors={errors} name={`lines.${index}.qty`} />
              </td>
              <td>{formatRupiah(lineTotal(line))}</td>
              <td>
                {/* type="button": inside a form, a plain <button> is a SUBMIT button */}
                <button type="button" onClick={() => removeLine(line.id)} disabled={lines.length === 1}>
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
        <button type="button" onClick={addLine}>
          + Add line
        </button>{' '}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save order'}
        </button>
      </p>
      {savedId && <p style={{ color: 'green' }}>Order #{savedId} saved.</p>}
    </form>
  )
}
