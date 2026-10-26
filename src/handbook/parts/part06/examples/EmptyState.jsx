const orders = [] // imagine the filter matched nothing

export default function EmptyState() {
  return (
    <div>
      <h3>Pitfall: length &amp;&amp; …</h3>
      {/* orders.length is 0. 0 && ... evaluates to 0, and React RENDERS
          numbers, so a stray "0" appears on the screen: */}
      <div>{orders.length && <p>{orders.length} orders found</p>}</div>

      <h3>Fix: compare to get a real boolean</h3>
      {/* false is not rendered, so nothing appears here: */}
      <div>{orders.length > 0 && <p>{orders.length} orders found</p>}</div>

      <h3>Better: show an empty-state message</h3>
      {orders.length > 0 ? <p>{orders.length} orders found</p> : <p>No orders match your filter.</p>}
    </div>
  )
}
