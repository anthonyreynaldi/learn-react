import { useContext } from 'react'
import { SettingsContext } from './SettingsContext.js'

// Reads the NEAREST provider's value above it. No props needed.
function Price({ amount }) {
  const { locale, currency } = useContext(SettingsContext)
  const text = amount.toLocaleString(locale, { style: 'currency', currency })
  return (
    <p>
      {text} <small style={{ color: 'gray' }}>({locale}, {currency})</small>
    </p>
  )
}

function OrderTotal() {
  // Doesn't pass any settings down: Price finds them itself
  return <Price amount={750000} />
}

export default function ContextPrice() {
  return (
    <div>
      {/* React 19: the context itself is the provider.
          Older React: <SettingsContext.Provider value={...}> */}
      <SettingsContext value={{ locale: 'id-ID', currency: 'IDR' }}>
        <h3>Inside the id-ID / IDR provider</h3>
        <OrderTotal />

        {/* A nested provider overrides the value for everything inside it */}
        <SettingsContext value={{ locale: 'en-US', currency: 'USD' }}>
          <h3>Inside the nested en-US / USD provider</h3>
          <OrderTotal />
        </SettingsContext>
      </SettingsContext>

      <h3>No provider above: the default from createContext</h3>
      <OrderTotal />
      <p>
        <small>Only the formatting changes: the amount is the same number (no currency conversion).</small>
      </p>
    </div>
  )
}
