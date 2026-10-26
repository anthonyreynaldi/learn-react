// In JSX every tag must be closed.
// HTML lets you write <br> or <input>, JSX requires <br /> and <input />.
export default function ClosingTags() {
  return (
    <div>
      <p>
        Floor Tile 60x60
        <br />
        Stock is available
      </p>
      <input placeholder="Search product..." />
      <hr />
      {/* Components without children are self-closed too */}
      <Divider />
    </div>
  )
}

function Divider() {
  return <hr />
}
