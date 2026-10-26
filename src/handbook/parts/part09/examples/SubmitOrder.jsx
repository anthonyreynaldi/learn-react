import { useState } from 'react'
import { fakePostOrder } from './fakeOrderApi.js'

const initialForm = { customer: 'PT Maju Jaya', warehouse: 'SBY', deliveryDate: '2099-12-31' }

export default function SubmitOrder() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // onSubmit on the <form>: runs for a button click AND for Enter in a field
  async function handleSubmit(e) {
    e.preventDefault() // no page reload
    if (submitting) return // double-submit guard (the button is disabled too)

    setSubmitting(true)
    setMessage('')
    try {
      // Real app: fetch('/api/orders', { method: 'POST', ... })
      const response = await fakePostOrder(form)
      const data = await response.json()
      if (response.ok) {
        setMessage(`Order #${data.id} saved for ${data.customer}.`)
        setForm({ customer: '', warehouse: 'SBY', deliveryDate: '2099-12-31' }) // reset for the next order
      } else {
        setMessage(`Not saved (status ${response.status}): ${data.message}`)
      }
    } catch {
      setMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="so-customer">Customer </label>
        <input id="so-customer" name="customer" value={form.customer} onChange={handleChange} />{' '}
        <select name="warehouse" value={form.warehouse} onChange={handleChange} aria-label="Warehouse">
          <option value="SBY">Surabaya</option>
          <option value="JKT">Jakarta</option>
        </select>{' '}
        <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} aria-label="Delivery date" />
      </div>
      <p>
        {/* Disabled while saving: prevents double submits and shows progress */}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save order'}
        </button>
      </p>
      {message && <p>{message}</p>}
    </form>
  )
}
