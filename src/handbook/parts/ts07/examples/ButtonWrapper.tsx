import { useState, type ComponentProps } from 'react'

// ComponentProps<'button'>: EVERY prop a real <button> accepts (type, disabled,
// onClick, aria-*, title, style...), plus our own variant prop.
type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'danger'
}

const variantStyles = {
  primary: { background: '#0284c7', color: 'white', border: 'none' },
  danger: { background: '#dc2626', color: 'white', border: 'none' },
}

// Take our own prop (and style) out, pass ALL the rest (...rest) to the real <button>.
function Button({ variant = 'primary', style, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{ ...variantStyles[variant], padding: '4px 12px', borderRadius: 6, opacity: rest.disabled ? 0.5 : 1, ...style }}
    />
  )
}

export default function ButtonWrapper() {
  const [message, setMessage] = useState('')
  return (
    <div>
      <Button type="button" onClick={() => setMessage('Approved #102')}>
        Approve
      </Button>{' '}
      <Button variant="danger" onClick={() => setMessage('Rejected #102')}>
        Reject
      </Button>{' '}
      <Button disabled title="Nothing to delete">
        Delete
      </Button>
      {/* <Button variant="warning">  ✗ Type '"warning"' is not assignable to type '"danger" | "primary" | undefined'. */}
      {message && <p>{message}</p>}
    </div>
  )
}
