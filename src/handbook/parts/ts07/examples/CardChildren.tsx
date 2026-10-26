// import type: this import is only a TYPE, so it is erased completely from the
// JavaScript output (TS Part 1 type erasure). This project's tsconfig
// (verbatimModuleSyntax) requires `type` on type-only imports.
import type { ReactNode } from 'react'

type CardProps = {
  title: string
  // ReactNode = anything React can render: text, numbers, elements, arrays, null...
  children: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8, marginBottom: 8 }}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}

export default function CardChildren() {
  return (
    <div>
      <Card title="Text">Delivery from the Surabaya warehouse.</Card>
      <Card title="Elements">
        <p>PT Maju Jaya</p>
        <button>Approve</button>
      </Card>
      <Card title="A number">{42}</Card>
    </div>
  )
}
