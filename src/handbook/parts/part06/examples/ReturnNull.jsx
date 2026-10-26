import { formatRupiah } from '../../../../utils/format'

// RETURNING NULL: the component decides to render nothing at all.
function DiscountNote({ total }) {
  if (total < 1000000) {
    return null
  }
  return <p style={{ color: 'green' }}>This order gets a 5% discount.</p>
}

export default function ReturnNull() {
  return (
    <div>
      <h3>#101 — {formatRupiah(750000)}</h3>
      <DiscountNote total={750000} />
      <h3>#104 — {formatRupiah(2100000)}</h3>
      <DiscountNote total={2100000} />
    </div>
  )
}
