// Exercise 2: ProductList
//
// TODO: Build a ProductList component that:
// - renders ProductCard (from ./exercise-2-ProductCard) three times
// - uses a Fragment as the root
// - contains at least one JSX comment

import ProductCard from "./exercise-2-ProductCard"

function ProductList() {
  return (
    <>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </>
  )
}

export default ProductList
