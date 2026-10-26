import { useState } from 'react'

const initialForm = {
  customer: '',
  warehouse: '',
  deliveryDate: '',
  isUrgent: false,
  note: '',
}

const field = { marginBottom: 10 }

export default function OrderFormState() {
  // ONE state object for the whole form
  const [form, setForm] = useState(initialForm)

  // ONE handler for every field. The input's name attribute says which key to update.
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      // Computed property name: [name] uses the VALUE of name as the key,
      // e.g. { ...form, customer: value }
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={field}>
          <label htmlFor="of-customer">Customer</label>
          <br />
          <input id="of-customer" name="customer" value={form.customer} onChange={handleChange} />
        </div>
        <div style={field}>
          <label htmlFor="of-warehouse">Warehouse</label>
          <br />
          <select id="of-warehouse" name="warehouse" value={form.warehouse} onChange={handleChange}>
            <option value="">-- Choose --</option>
            <option value="SBY">Surabaya</option>
            <option value="JKT">Jakarta</option>
          </select>
        </div>
        <div style={field}>
          <label htmlFor="of-date">Delivery date</label>
          <br />
          <input id="of-date" type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} />
        </div>
        <div style={field}>
          <label>
            <input type="checkbox" name="isUrgent" checked={form.isUrgent} onChange={handleChange} /> Urgent
          </label>
        </div>
        <div style={field}>
          <label htmlFor="of-note">Note</label>
          <br />
          <textarea id="of-note" name="note" value={form.note} onChange={handleChange} rows={2} />
        </div>
        <button type="button" onClick={() => setForm(initialForm)}>
          Reset
        </button>
      </form>

      <div>
        <strong>State (live):</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  )
}
