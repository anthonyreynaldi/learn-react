import { z } from 'zod'

// A Zod SCHEMA is a real JavaScript value that can check data at RUNTIME.
// (Types are erased, TS Part 1; schemas are not.)

export const OrderStatusSchema = z.enum(['pending', 'approved', 'rejected'])

export const OrderSchema = z.object({
  id: z.number().int(),
  customer: z.string(),
  total: z.number(),
  status: OrderStatusSchema,
})

export const OrdersSchema = z.array(OrderSchema)

// The TypeScript type is DERIVED from the schema (TS Part 6 idea):
// one definition gives you both the runtime check and the static type.
export type OrderStatus = z.infer<typeof OrderStatusSchema> // 'pending' | 'approved' | 'rejected'
export type Order = z.infer<typeof OrderSchema> // { id: number; customer: string; total: number; status: ... }
