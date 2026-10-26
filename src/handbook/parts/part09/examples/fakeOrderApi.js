// A fake Laravel API for the form examples.
// In a real app this would be:
//   fetch('/api/orders', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//     body: JSON.stringify(data),
//   })
// and Laravel would validate the request with $this->validate(...).

const WAREHOUSES = ['SBY', 'JKT']

let nextId = 2001

// Today as "YYYY-MM-DD" in local time (the same format as <input type="date">)
function today() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === ''
}

// Mimics Laravel's validation rules and messages. Returns { field: ['message'] }.
function validate(data) {
  const errors = {}
  const add = (field, message) => {
    errors[field] = [message]
  }

  // 'customer' => 'required|max:100'
  if (isBlank(data.customer)) add('customer', 'The customer field is required.')
  else if (data.customer.trim().length > 100) add('customer', 'The customer may not be greater than 100 characters.')

  // 'warehouse' => 'required|in:SBY,JKT'
  if (isBlank(data.warehouse)) add('warehouse', 'The warehouse field is required.')
  else if (!WAREHOUSES.includes(data.warehouse)) add('warehouse', 'The selected warehouse is invalid.')

  // 'deliveryDate' => 'required|date|after_or_equal:today'
  if (isBlank(data.deliveryDate)) add('deliveryDate', 'The delivery date field is required.')
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.deliveryDate)) add('deliveryDate', 'The delivery date is not a valid date.')
  else if (data.deliveryDate < today()) {
    // "YYYY-MM-DD" strings sort like dates, so < works here
    add('deliveryDate', 'The delivery date must be a date after or equal to today.')
  }

  // 'lines' => 'array|min:1', 'lines.*.product' => 'required', 'lines.*.qty' => 'required|integer|min:1'
  if (data.lines !== undefined) {
    if (!Array.isArray(data.lines) || data.lines.length === 0) {
      add('lines', 'The lines must have at least 1 items.')
    } else {
      data.lines.forEach((line, i) => {
        if (isBlank(line.product)) add(`lines.${i}.product`, `The lines.${i}.product field is required.`)
        if (isBlank(line.qty)) add(`lines.${i}.qty`, `The lines.${i}.qty field is required.`)
        else if (!Number.isInteger(Number(line.qty))) add(`lines.${i}.qty`, `The lines.${i}.qty must be an integer.`)
        else if (Number(line.qty) < 1) add(`lines.${i}.qty`, `The lines.${i}.qty must be at least 1.`)
      })
    }
  }

  return errors
}

// Works like fetch(): resolves to a Response-like object { ok, status, json() }.
export function fakePostOrder(data, { delay = 1000 } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const errors = validate(data)

      if (Object.keys(errors).length > 0) {
        // 422 Unprocessable Entity, Laravel 5.5+ format
        const body = { message: 'The given data was invalid.', errors }
        resolve({ ok: false, status: 422, json: async () => body })
        return
      }

      // 201 Created: the saved order with a new id
      const saved = { id: nextId++, ...data, customer: data.customer.trim() }
      resolve({ ok: true, status: 201, json: async () => saved })
    }, delay)
  })
}
