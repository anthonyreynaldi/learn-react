// Exercise 1: Fix the bugs
//
// TODO: The component below has 6 bugs. Find and fix all of them.
// It is commented out so the project still builds. When you're done,
// uncomment it, fix it, and render it in Part03Demo.jsx to check your work.


function ProductCard() {
  const product = { name: 'Floor Tile 60x60', price: 120000, stock: 0 }

  return (
    <>
      <h2 className="title">{product.name}</h2>
      <img src="tile.jpg"/>
      <p style={{color: 'red'}}>
        Stock: { product.stock > 0 ? product.stock : 'Out of stock' }
      </p>
    </>
  )
}

export default ProductCard;