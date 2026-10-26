// style takes a JavaScript OBJECT, not a CSS string.
// Outer braces = "JavaScript starts here", inner braces = the object itself.
// CSS property names become camelCase: background-color -> backgroundColor.
export default function StyleObject() {
  const floorTileStock = 25
  const wallTileStock = 0

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: 12, borderRadius: 6 }}>
      {/* Numbers are treated as pixels: padding: 12 -> "12px" */}
      <p
        style={{
          // Ternary inside the object: red only when stock is 0.
          // undefined means "don't set this property at all".
          color: floorTileStock === 0 ? 'red' : undefined,
        }}
      >
        Floor Tile 60x60: {floorTileStock} in stock
      </p>
      <p
        style={{
          color: wallTileStock === 0 ? 'red' : undefined,
          fontWeight: wallTileStock === 0 ? 'bold' : undefined,
        }}
      >
        Wall Tile 30x60: {wallTileStock} in stock
      </p>
    </div>
  )
}
