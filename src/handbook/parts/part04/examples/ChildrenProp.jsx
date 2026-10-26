import { formatRupiah } from '../../../../utils/format'

// Whatever you put BETWEEN <Card> and </Card> arrives as the "children" prop.
// It works like {{ $slot }} in a Blade component.
function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: 12 }}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function OrderSummary({ customer, total }) {
  return (
    <p>
      {customer}: {formatRupiah(total)}
    </p>
  )
}

export default function ChildrenProp() {
  return (
    <Card title="Today's Orders">
      <OrderSummary customer="PT Maju Jaya" total={750000} />
      <OrderSummary customer="CV Sinar Abadi" total={360000} />
    </Card>
  )
}
