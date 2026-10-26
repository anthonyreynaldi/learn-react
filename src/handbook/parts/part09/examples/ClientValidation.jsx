import { useState } from 'react'
import FieldError from './FieldError.jsx'
import { fakePostOrder } from './fakeOrderApi.js'

const field = { marginBottom: 10 }

// Client-side rules, returning errors in the SAME shape as Laravel.
// Deliberately NOT checking "date in the past": the server catches that.
function validate(form) {
  const errors = {}
  const customer = form.customer.trim() // "   " counts as empty
  if (customer === '') errors.customer = ['Please enter a customer.']
  else if (customer.length > 100) errors.customer = ['Customer must be at most 100 characters.']
  if (form.warehouse === '') errors.warehouse = ['Please choose a warehouse.']
  if (form.deliveryDate === '') errors.deliveryDate = ['Please choose a delivery date.']
  return errors
}

export default function ClientValidation() {
  const [form, setForm] = useState({ customer: '', warehouse: '', deliveryDate: '2020-01-01' })
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [savedId, setSavedId] = useState(null)

  // DERIVED on every render: no extra state, never out of sync
  const clientErrors = validate(form)
  const isValid = Object.keys(clientErrors).length === 0

  // Show errors only after the first submit attempt (don't shout while typing).
  // Client errors win; server errors fill in what the client doesn't check.
  const shownErrors = submitAttempted ? { ...serverErrors, ...clientErrors } : {}

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (serverErrors[name]) {
      const next = { ...serverErrors }
      delete next[name]
      setServerErrors(next)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitAttempted(true)
    setSavedId(null)
    if (!isValid) return // blocked: no request is sent

    setSubmitting(true)
    try {
      const response = await fakePostOrder(form)
      const data = await response.json()
      if (response.status === 422) setServerErrors(data.errors)
      else if (response.ok) {
        setServerErrors({})
        setSavedId(data.id)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // noValidate: turn off the browser's own bubbles so ours are used.
    // The required attributes still help screen readers.
    <form onSubmit={handleSubmit} noValidate>
      <div style={field}>
        <label htmlFor="cv-customer">Customer</label>
        <br />
        <input id="cv-customer" name="customer" value={form.customer} onChange={handleChange} required />
        <FieldError errors={shownErrors} name="customer" />
      </div>
      <div style={field}>
        <label htmlFor="cv-warehouse">Warehouse</label>
        <br />
        <select id="cv-warehouse" name="warehouse" value={form.warehouse} onChange={handleChange} required>
          <option value="">-- Choose --</option>
          <option value="SBY">Surabaya</option>
          <option value="JKT">Jakarta</option>
        </select>
        <FieldError errors={shownErrors} name="warehouse" />
      </div>
      <div style={field}>
        <label htmlFor="cv-date">Delivery date</label>
        <br />
        <input id="cv-date" type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} required />
        <FieldError errors={shownErrors} name="deliveryDate" />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save order'}
      </button>{' '}
      <small>isValid (client): {String(isValid)}</small>
      {savedId && <p style={{ color: 'green' }}>Order #{savedId} saved.</p>}
    </form>
  )
}
