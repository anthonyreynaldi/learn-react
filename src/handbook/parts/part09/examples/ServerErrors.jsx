import { useState } from 'react'
import FieldError from './FieldError.jsx'
import { fakePostOrder } from './fakeOrderApi.js'

const field = { marginBottom: 10 }

export default function ServerErrors() {
  const [form, setForm] = useState({ customer: '', warehouse: '', deliveryDate: '2020-01-01' })
  // Laravel's errors object goes straight into state
  const [errors, setErrors] = useState({})
  const [rawResponse, setRawResponse] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [savedId, setSavedId] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear this field's error as soon as the user edits it
    if (errors[name]) {
      const next = { ...errors }
      delete next[name] // fine: next is a new object we just created
      setErrors(next)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSavedId(null)
    try {
      const response = await fakePostOrder(form)
      const data = await response.json()
      setRawResponse({ status: response.status, body: data })
      if (response.status === 422) {
        setErrors(data.errors)
      } else if (response.ok) {
        setErrors({})
        setSavedId(data.id)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={field}>
        <label htmlFor="se-customer">Customer</label>
        <br />
        <input id="se-customer" name="customer" value={form.customer} onChange={handleChange} />
        <FieldError errors={errors} name="customer" />
      </div>
      <div style={field}>
        <label htmlFor="se-warehouse">Warehouse</label>
        <br />
        <select id="se-warehouse" name="warehouse" value={form.warehouse} onChange={handleChange}>
          <option value="">-- Choose --</option>
          <option value="SBY">Surabaya</option>
          <option value="JKT">Jakarta</option>
        </select>
        <FieldError errors={errors} name="warehouse" />
      </div>
      <div style={field}>
        <label htmlFor="se-date">Delivery date</label>
        <br />
        <input id="se-date" type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} />
        <FieldError errors={errors} name="deliveryDate" />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save order'}
      </button>
      {savedId && <p style={{ color: 'green' }}>Order #{savedId} saved.</p>}

      {rawResponse && (
        <details>
          <summary>Raw response (status {rawResponse.status})</summary>
          <pre>{JSON.stringify(rawResponse.body, null, 2)}</pre>
        </details>
      )}
    </form>
  )
}
