// A normal JavaScript comment works outside the JSX.
export default function JsxComments() {
  // This is also fine: we are still in JavaScript here.
  return (
    <div>
      {/* Inside JSX, a comment must be wrapped in curly braces like this. */}
      <p>PT Maju Jaya - approved</p>
      {/*
        Multi-line comments
        work the same way.
      */}
      <p>CV Sinar Abadi - pending</p>
      {/* Writing // or <!-- --> here would show up as text on the page! */}
    </div>
  )
}
