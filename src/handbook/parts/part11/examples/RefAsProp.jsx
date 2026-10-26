import { useRef } from 'react'

// React 19: ref is a normal prop for function components.
// TextField passes it on to its real <input>.
function TextField({ label, ref, ...inputProps }) {
  return (
    <label>
      {label} <input ref={ref} {...inputProps} />
    </label>
  )
}

export default function RefAsProp() {
  const customerRef = useRef(null)

  return (
    <div>
      <TextField label="Customer" ref={customerRef} defaultValue="CV Sinar Abadi" />{' '}
      {/* The parent controls focus of an input that lives inside TextField */}
      <button onClick={() => customerRef.current.focus()}>Focus customer</button>
    </div>
  )
}
