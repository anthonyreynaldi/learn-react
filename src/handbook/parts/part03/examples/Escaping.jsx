// Text placed in {} is ESCAPED automatically, like Blade's {{ }}.
// HTML tags inside the string are shown as text, never executed.
const customerNote = 'Please deliver fast <b>today</b> <script>alert("hacked")</script>'

// A trusted, hardcoded HTML string (never use this with user input!).
const trustedHtml = 'Delivered to <b>PT Maju Jaya</b>'

export default function Escaping() {
  return (
    <div>
      <h3>Escaped (safe, the default)</h3>
      <p>{customerNote}</p>

      <h3>Raw HTML (like Blade's {'{!! !!}'})</h3>
      {/* The long, scary name is on purpose: it reminds you of the XSS risk. */}
      <p dangerouslySetInnerHTML={{ __html: trustedHtml }} />
    </div>
  )
}
