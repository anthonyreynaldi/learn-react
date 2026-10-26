type Log = (...values: unknown[]) => void

type Order = {
  id: number
  customer: string
  note?: string // ? = optional: the property may be missing. Its type is string | undefined
}

export default function run(log: Log) {
  const first: Order = { id: 101, customer: 'PT Maju Jaya' } // ✓ no note needed
  const second: Order = { id: 102, customer: 'CV Sinar Abadi', note: 'Deliver before 10:00' }

  log('first.note:', first.note) // undefined
  log('second.note:', second.note)

  // Because note may be undefined, TypeScript makes you handle that case:
  // first.note.toUpperCase()   ✗ 'first.note' is possibly 'undefined'.
  log('first.note ?? "No note":', first.note ?? 'No note')
  log('second.note?.toUpperCase():', second.note?.toUpperCase())
}
