import { useEffect, useState } from 'react'
import { fakeFetch } from './fakeApi.js'

// Each customer takes a different time to load, like a slow server.
const delays = { 1: 3000, 2: 500, 3: 1500 }

function CustomerButtons({ onSelect }) {
  return (
    <p>
      <button onClick={() => onSelect(1)}>Customer 1 (3s)</button>{' '}
      <button onClick={() => onSelect(2)}>Customer 2 (0.5s)</button>{' '}
      <button onClick={() => onSelect(3)}>Customer 3 (1.5s)</button>
    </p>
  )
}

function CustomerCard({ selectedId, customer }) {
  return (
    <div>
      <p>
        Selected: <strong>{selectedId ?? '–'}</strong> / Showing: <strong>{customer?.id ?? '–'}</strong>
        {customer && selectedId !== customer.id && <span style={{ color: 'red' }}> ✗ mismatch</span>}
      </p>
      {customer && (
        <p>
          {customer.name}, {customer.city}, {customer.phone}
        </p>
      )}
    </div>
  )
}

// BUGGY: every response is applied, even if a newer request was started.
// Click 1 then 2: response 2 arrives after 0.5s, response 1 after 3s and WINS.
function BuggyCustomer() {
  const [selectedId, setSelectedId] = useState(null)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    if (selectedId === null) return
    fakeFetch(`/api/customers/${selectedId}`, { delay: delays[selectedId] })
      .then((response) => response.json())
      .then((data) => setCustomer(data)) // ✗ may be an old, out-of-date response
  }, [selectedId])

  return (
    <div>
      <h3>Buggy (no ignore flag)</h3>
      <CustomerButtons onSelect={setSelectedId} />
      <CustomerCard selectedId={selectedId} customer={customer} />
    </div>
  )
}

// FIXED: the cleanup marks old requests as "ignore".
// When selectedId changes, React runs the previous effect's cleanup first,
// so the old request's ignore becomes true and its late response is dropped.
function FixedCustomer() {
  const [selectedId, setSelectedId] = useState(null)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    if (selectedId === null) return
    let ignore = false
    fakeFetch(`/api/customers/${selectedId}`, { delay: delays[selectedId] })
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) setCustomer(data) // ✓ only the latest request may update state
      })
    return () => {
      ignore = true
    }
  }, [selectedId])

  return (
    <div>
      <h3>Fixed (ignore flag + cleanup)</h3>
      <CustomerButtons onSelect={setSelectedId} />
      <CustomerCard selectedId={selectedId} customer={customer} />
    </div>
  )
}

export default function RaceCondition() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <BuggyCustomer />
      <FixedCustomer />
    </div>
  )
}
