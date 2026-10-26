function Header() {
  return (
    // Single root: everything is wrapped in one <header> element
    <header className="app-header">
      {/* className: JSX uses className instead of the HTML "class" attribute */}
      <h1>Platinum Ceramics</h1>
      <p className="subtitle">Sales Order Viewer</p>
      {/* Closing tags: void elements like <hr> must be self-closed in JSX */}
      <hr />
    </header>
  )
}

export default Header
