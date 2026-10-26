// A component is a plain JavaScript function that returns JSX.
// The capitalized name tells React "this is a component, not an HTML tag".
function Header() {
  return <h2>PT Platinum Ceramics - Orders</h2>
}

// The default export is also a component; it uses <Header /> like a custom tag.
export default function FirstComponent() {
  return (
    <div>
      <Header />
      <p>Welcome to the order dashboard.</p>
    </div>
  )
}
