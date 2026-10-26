export default function LabelsAccessibility() {
  return (
    <div>
      {/* Style 1: htmlFor + id. The label points at the input's id.
          (htmlFor because "for" is a reserved word in JavaScript.) */}
      <div>
        <label htmlFor="la-customer">Customer</label>
        <br />
        <input id="la-customer" placeholder="Click the word 'Customer'" />
      </div>

      {/* Style 2: wrapping label. The input inside belongs to the label,
          so no id is needed. Handy for checkboxes and radios. */}
      <div style={{ marginTop: 12 }}>
        <label>
          Phone <input placeholder="Click the word 'Phone'" />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <label>
          <input type="checkbox" /> Click this text to toggle the checkbox
        </label>
      </div>

      {/* Either way: clicking the label focuses (or toggles) the input,
          and screen readers announce the label when the field gets focus. */}
    </div>
  )
}
