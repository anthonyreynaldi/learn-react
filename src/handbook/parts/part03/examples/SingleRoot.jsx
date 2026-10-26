import { Fragment } from 'react'

// A Fragment groups elements without adding an extra DOM node.
// This matters inside a <table>: a <div> between <tbody> and <tr> is invalid HTML.
function OrderRows() {
  return (
    <>
      <tr>
        <td>PT Maju Jaya</td>
        <td>approved</td>
      </tr>
      <tr>
        <td>CV Sinar Abadi</td>
        <td>pending</td>
      </tr>
    </>
  )
}

// <Fragment> is the long form of <>...</>. (Later you'll see it can take a key.)
function MoreRows() {
  return (
    <Fragment>
      <tr>
        <td>PT Karya Baru</td>
        <td>rejected</td>
      </tr>
    </Fragment>
  )
}

export default function SingleRoot() {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <OrderRows />
        <MoreRows />
      </tbody>
    </table>
  )
}
