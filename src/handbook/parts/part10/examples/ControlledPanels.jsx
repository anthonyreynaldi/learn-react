import { useState } from 'react'

const box = { border: '1px solid #ccc', padding: 8, marginBottom: 6, width: 260 }

// UNCONTROLLED: the panel owns its isOpen state. The parent can't influence it.
function Panel({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={box}>
      <strong>{title}</strong>{' '}
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>{children}</p>}
    </div>
  )
}

// CONTROLLED: isOpen comes from props, clicks are reported to the parent.
function AccordionPanel({ title, isOpen, onToggle, children }) {
  return (
    <div style={box}>
      <strong>{title}</strong> <button onClick={onToggle}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>{children}</p>}
    </div>
  )
}

export default function ControlledPanels() {
  // The parent decides which ONE panel is open (null = none)
  const [openPanel, setOpenPanel] = useState('shipping')

  function toggle(name) {
    setOpenPanel(openPanel === name ? null : name)
  }

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <h3>Uncontrolled Panels</h3>
        <Panel title="Shipping">Delivered from the Surabaya warehouse.</Panel>
        <Panel title="Payment">Bank transfer, 30 days.</Panel>
      </div>
      <div>
        <h3>Controlled accordion</h3>
        <AccordionPanel title="Shipping" isOpen={openPanel === 'shipping'} onToggle={() => toggle('shipping')}>
          Delivered from the Surabaya warehouse.
        </AccordionPanel>
        <AccordionPanel title="Payment" isOpen={openPanel === 'payment'} onToggle={() => toggle('payment')}>
          Bank transfer, 30 days.
        </AccordionPanel>
        <p>
          <small>openPanel in parent: {JSON.stringify(openPanel)}</small>
        </p>
      </div>
    </div>
  )
}
