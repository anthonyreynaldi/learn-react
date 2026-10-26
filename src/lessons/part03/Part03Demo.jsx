import { useState } from 'react'
import Header from './Header'
import OrderSummary from './OrderSummary'
import ProductCard from './exercise-1-bugs'
import ProductList from './exercise-2-ProductList'

function Part03Demo() {
  const state = useState(100)
  // const value = state[0]
  // const setValue = state[1]

  const [value, setValue] = useState(200)

  console.log('Part03Demo state:', state);
  console.log('Part03Demo value:', value);
  console.log('Part03Demo setValue:', setValue);
  
  

  return (
    // Single root: the whole page is wrapped in one <main> element
    <main>
      <Header />
      {/* Both OrderSummary components show the SAME order, because the data is
          hardcoded inside the component. Props (Part 4) will fix this. */}
      <OrderSummary />
      <OrderSummary />

      <ProductCard />

      <ProductList />
    </main>
  )
}

export default Part03Demo
