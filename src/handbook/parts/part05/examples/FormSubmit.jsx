import { useState } from 'react'

export default function FormSubmit() {
  const [customer, setCustomer] = useState('CV Sinar Abadi')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    // By default the browser reloads the page on form submit (like a POST in Laravel).
    // preventDefault() stops that, so React stays in control.
    e.preventDefault()
    setMessage(`Submitted without page reload: ${customer}`)
  }

  return (
    // onSubmit goes on the <form>, not on the button.
    // It also fires when you press Enter inside the input.
    <form onSubmit={handleSubmit}>
      <label htmlFor="customer">Customer </label>
      <input id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />{' '}
      <button type="submit">Save</button>
      <p>{message}</p>
    </form>
  )
}
