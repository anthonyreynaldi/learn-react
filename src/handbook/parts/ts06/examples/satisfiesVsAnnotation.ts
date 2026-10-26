import type { OrderStatus } from './base.ts'

// A style per status: either a plain color, or a { bg, fg } pair.
type StatusStyle = string | { bg: string; fg: string }

// ANNOTATION (: Type): the variable's type BECOMES Record<OrderStatus, StatusStyle>.
// The specific shapes you wrote are forgotten.
export const stylesAnnotated: Record<OrderStatus, StatusStyle> = {
  pending: '#f59e0b',
  approved: { bg: '#16a34a', fg: 'white' },
  rejected: '#dc2626',
}
// stylesAnnotated.approved.bg
// ✗ Property 'bg' does not exist on type 'StatusStyle'.
//     Property 'bg' does not exist on type 'string'.
//   (TypeScript only remembers "string OR object", so you must narrow first.)

// SATISFIES: checked against the same type, but the precise shapes are kept.
export const stylesSatisfied = {
  pending: '#f59e0b',
  approved: { bg: '#16a34a', fg: 'white' },
  rejected: '#dc2626',
} satisfies Record<OrderStatus, StatusStyle>

export const approvedBg = stylesSatisfied.approved.bg // ✓ TypeScript knows approved is { bg, fg }

// Both catch the same mistakes:
// { pending: '#f59e0b', approved: '#16a34a' } satisfies Record<OrderStatus, string>
// ✗ Property 'rejected' is missing in type '{ pending: string; approved: string; }'
//   but required in type 'Record<"approved" | "pending" | "rejected", string>'.
// Rule of thumb: annotate when you want the general type; use satisfies to check a
// constant (config, lookup tables) while keeping its exact values.
