// A first component: a plain function that returns JSX.
// Anything inside { } is a normal JavaScript expression.
import { formatRupiah } from '../../../../utils/format'

// Computed once when the file loads (outside the component), so every
// render shows the same value. e.g. "14/10/2026"
const today = new Date().toLocaleDateString('id-ID')

export default function FirstComponent() {
  const company = 'Platinum Ceramics'
  const price = 120000

  return (
    <div>
      <h2>{company}</h2>
      <p>Today: {today}</p>
      <p>
        Floor Tile 60x60: <strong>{formatRupiah(price)}</strong>
      </p>
    </div>
  )
}
