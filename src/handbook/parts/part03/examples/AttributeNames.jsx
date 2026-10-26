// JSX attributes follow JavaScript (DOM property) names, not HTML names:
//   class   -> className   (class is a reserved word in JS)
//   for     -> htmlFor     (for is a reserved word in JS)
//   onclick -> onClick     (events are camelCase)
export default function AttributeNames() {
  return (
    <div className="order-form">
      <label htmlFor="customer">Customer: </label>
      <input id="customer" placeholder="PT Maju Jaya" />
      <p>
        <button onClick={() => console.log('Saved!')}>
          Save (check the browser console)
        </button>
      </p>
    </div>
  )
}
