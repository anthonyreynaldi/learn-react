import { useRef, useState } from 'react'

let nextId = 4

export default function ScrollToNewLine() {
  const [lines, setLines] = useState([
    { id: 1, product: 'Floor Tile 60x60', qty: '2' },
    { id: 2, product: 'Wall Tile 30x60', qty: '5' },
    { id: 3, product: 'Granite Tile 80x80', qty: '1' },
  ])
  // Which line should get focus once it exists in the DOM
  const focusIdRef = useRef(null)

  function handleAdd() {
    const id = nextId++
    setLines([...lines, { id, product: '', qty: '1' }])
    focusIdRef.current = id // the new <input> doesn't exist yet: remember to focus it
  }

  function updateLine(id, field, value) {
    setLines(lines.map((line) => (line.id === id ? { ...line, [field]: value } : line)))
  }

  return (
    <div>
      <div style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #ccc', padding: 8 }}>
        {lines.map((line) => (
          <div key={line.id} style={{ marginBottom: 6 }}>
            <input
              // A ref CALLBACK: React calls it with the DOM element during the commit.
              // When it is the line we just added: scroll to it and focus it.
              ref={(element) => {
                if (element && line.id === focusIdRef.current) {
                  focusIdRef.current = null
                  element.scrollIntoView({ block: 'nearest' })
                  element.focus({ preventScroll: true })
                }
              }}
              value={line.product}
              onChange={(e) => updateLine(line.id, 'product', e.target.value)}
              placeholder="Product"
              aria-label={`Product, line ${line.id}`}
            />{' '}
            <input
              type="number"
              value={line.qty}
              onChange={(e) => updateLine(line.id, 'qty', e.target.value)}
              style={{ width: 60 }}
              aria-label={`Quantity, line ${line.id}`}
            />
          </div>
        ))}
      </div>
      <p>
        <button onClick={handleAdd}>+ Add line</button>
      </p>
    </div>
  )
}
