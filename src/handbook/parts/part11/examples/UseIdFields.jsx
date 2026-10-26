import { useId } from 'react'

// A reusable field. Hard-coded ids would collide when it's used more than once.
function TextField({ label, error, defaultValue }) {
  // useId: a unique id per component instance, stable across renders
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        defaultValue={defaultValue}
        // aria-describedby links the error text to the input for screen readers
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <div id={errorId} style={{ color: '#dc2626', fontSize: 13 }}>
          {error}
        </div>
      )}
      <div>
        <small style={{ color: 'gray' }}>
          id: <code>{id}</code>
          {error && (
            <>
              {' '}
              · error id: <code>{errorId}</code>
            </>
          )}
        </small>
      </div>
    </div>
  )
}

export default function UseIdFields() {
  return (
    <div>
      <TextField label="Customer" defaultValue="PT Maju Jaya" />
      <TextField label="Warehouse" defaultValue="SBY" />
      <TextField label="Delivery date" defaultValue="2020-01-01" error="The delivery date must be a date after or equal to today." />
    </div>
  )
}
