// WITHOUT as const: TypeScript widens to "any strings", because arrays can change.
export const statusesLoose = ['pending', 'approved', 'rejected']
// type: string[]
type LooseStatus = (typeof statusesLoose)[number]
// LooseStatus = string → 'aproved' would be accepted, no help at all

// WITH as const: a read-only tuple of these exact strings.
export const STATUSES = ['pending', 'approved', 'rejected'] as const
// type: readonly ['pending', 'approved', 'rejected']
type OrderStatus = (typeof STATUSES)[number]
// OrderStatus = 'pending' | 'approved' | 'rejected'

// It also makes the array read-only:
// STATUSES.push('cancelled')
// ✗ Property 'push' does not exist on type 'readonly ["pending", "approved", "rejected"]'.

// as const works on objects too: every value becomes its literal type and readonly.
export const DEFAULT_WAREHOUSE = { code: 'SBY', name: 'Surabaya' } as const
// type: { readonly code: 'SBY'; readonly name: 'Surabaya' }

export type { LooseStatus, OrderStatus }
