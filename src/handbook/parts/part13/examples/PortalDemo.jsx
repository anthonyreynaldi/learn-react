import { useState } from 'react'
import { createPortal } from 'react-dom'

const clippedBox = {
  position: 'relative',
  overflow: 'hidden', // cuts off anything that sticks out
  height: 110,
  border: '2px dashed #f59e0b',
  padding: 10,
}

const buttonStyle = { border: '1px solid #999', borderRadius: 6, padding: '4px 12px', background: '#f4f4f5', cursor: 'pointer' }

function ModalContent({ onClose }) {
  return (
    <>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Approve order #102?</h3>
      <p style={{ margin: '8px 0 12px' }}>CV Sinar Abadi · Rp 1.250.000</p>
      <button style={buttonStyle} onClick={onClose}>
        Close
      </button>
    </>
  )
}

// WITHOUT a portal: the modal is rendered inside the clipped box,
// so overflow: hidden cuts it off.
function InlineModal({ onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 20,
        width: 300,
        padding: 16,
        background: 'white',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        borderRadius: 8,
      }}
    >
      <ModalContent onClose={onClose} />
    </div>
  )
}

// WITH a portal: createPortal(jsx, document.body) renders the DOM at the end
// of <body>, outside every clipping box. In the React tree it is still a child
// of this component (props, state, context and events work as usual).
function PortalModal({ onClose }) {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#18181b',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // clicks inside don't close it
        style={{ width: 300, padding: 16, background: 'white', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
      >
        <ModalContent onClose={onClose} />
      </div>
    </div>,
    document.body,
  )
}

export default function PortalDemo() {
  const [open, setOpen] = useState(null) // null | 'inline' | 'portal'

  return (
    <div style={clippedBox}>
      <p>This box has overflow: hidden.</p>
      <button onClick={() => setOpen('inline')}>Open modal (no portal)</button>{' '}
      <button onClick={() => setOpen('portal')}>Open modal (portal)</button>
      {open === 'inline' && <InlineModal onClose={() => setOpen(null)} />}
      {open === 'portal' && <PortalModal onClose={() => setOpen(null)} />}
    </div>
  )
}
