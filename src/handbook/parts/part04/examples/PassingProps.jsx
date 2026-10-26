// Strings can use quotes. Every other type needs curly braces.
function OrderCard(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
      <p>Customer (string): {props.customer}</p>
      <p>Quantity (number): {props.quantity}</p>
      <p>Urgent (boolean): {props.urgent ? 'yes' : 'no'}</p>
      <p>Products (array): {props.products.join(', ')}</p>
      <p>Address (object): {props.address.city}, {props.address.street}</p>
    </div>
  )
}

// The trap: total="750000" is a STRING, total={750000} is a NUMBER.
function TotalCheck(props) {
  return (
    <p>
      typeof total = {typeof props.total}, total + 1 = {props.total + 1}
    </p>
  )
}

export default function PassingProps() {
  return (
    <div>
      <OrderCard
        customer="PT Maju Jaya"
        quantity={3}
        urgent={true}
        products={['Floor Tile 60x60', 'Wall Tile 30x60']}
        address={{ city: 'Jakarta', street: 'Jl. Sudirman 1' }}
      />

      <h3>Quotes vs braces</h3>
      {/* String: + joins text, giving "7500001" */}
      <TotalCheck total="750000" />
      {/* Number: + does math, giving 750001 */}
      <TotalCheck total={750000} />
    </div>
  )
}
