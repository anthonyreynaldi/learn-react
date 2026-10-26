import { createContext, useContext, useReducer } from 'react'

// Two contexts: one for the data, one for the dispatch function.
// Components that only ADD items (dispatch) don't depend on the cart data.
const CartContext = createContext(null)
const CartDispatchContext = createContext(null)

// Items: [{ name, price, qty }]
function cartReducer(items, action) {
  switch (action.type) {
    case 'added_item': {
      const existing = items.find((item) => item.name === action.product.name)
      if (existing) {
        return items.map((item) => (item.name === action.product.name ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...items, { ...action.product, qty: 1 }]
    }
    case 'removed_item':
      return items.filter((item) => item.name !== action.name)
    case 'changed_qty':
      return items.map((item) => (item.name === action.name ? { ...item, qty: Math.max(1, action.qty) } : item))
    case 'cleared':
      return []
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

// reducer (logic) + context (delivery) = a small app-wide store
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  return (
    <CartContext value={items}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartContext>
  )
}

// Exporting a hook next to the provider is the usual pattern for context files.
// The linter warns because Vite's Fast Refresh then reloads the page instead of
// hot-swapping when this file is edited. Harmless here, so the warning is silenced.
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider in one file on purpose
export function useCart() {
  const items = useContext(CartContext)
  if (items === null) throw new Error('useCart() must be used inside <CartProvider>.')
  return items
}

// eslint-disable-next-line react-refresh/only-export-components -- see the note above useCart
export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext)
  if (dispatch === null) throw new Error('useCartDispatch() must be used inside <CartProvider>.')
  return dispatch
}
