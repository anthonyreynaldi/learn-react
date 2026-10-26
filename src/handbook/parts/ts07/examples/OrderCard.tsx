import { formatRupiah, sampleOrders, type Order } from './types.ts'

// A props type: one property per prop. Convention: ComponentNameProps.
type OrderCardProps = {
  order: Order
  highlighted?: boolean // optional prop
}

// Destructure the props and annotate the whole object (TS Part 3 object parameters).
// highlighted = false: a default value, so inside it's always a boolean.
// No React.FC needed: a component is just a function that returns JSX.
function OrderCard({ order, highlighted = false }: OrderCardProps) {
  return (
    <div
      style={{
        border: highlighted ? '2px solid #0ea5e9' : '1px solid #ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
      }}
    >
      <strong>
        #{order.id} {order.customer}
      </strong>
      <div>
        {formatRupiah(order.total)} · {order.status}
      </div>
    </div>
  )
}

export default function OrderCards() {
  const [first, second, third] = sampleOrders
  return (
    <div>
      <OrderCard order={first} />
      <OrderCard order={second} highlighted /> {/* boolean shorthand = highlighted={true} */}
      <OrderCard order={third} highlighted={false} />
    </div>
  )
}
