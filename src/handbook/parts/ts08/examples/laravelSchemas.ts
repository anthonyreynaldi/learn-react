import { z } from 'zod'

// ── Dates ─────────────────────────────────────────────────────────────
// Laravel 5 serializes dates as "2026-10-02 14:30:00" (no T, no time zone).
export const Laravel5DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Expected "YYYY-MM-DD HH:MM:SS"')
// Laravel 7+ uses ISO 8601 in UTC: "2026-10-02T07:30:00.000000Z".
export const IsoDateSchema = z.iso.datetime()
// (z.iso.datetime() REJECTS the Laravel 5 format, so pick the one your API really sends.)

// ── null vs missing ───────────────────────────────────────────────────
// Laravel sends NULL columns as null: the key is THERE, the value is null.
export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string().nullable(), // "phone": null    → string | null
  note: z.string().optional(), //  key may be absent → string | undefined
})
// .nullable() for nullable database columns; .optional() for keys that may be missing
// (e.g. hidden by an API Resource's when()). Mixing them up is a common drift bug.

// ── paginate() ────────────────────────────────────────────────────────
// A FUNCTION that builds a schema: works for any item schema (like Paginated<T>, TS Part 5).
export function paginated<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.coerce.number(), // a string when it was passed through from ?per_page=… in the URL
    total: z.number(),
    next_page_url: z.string().nullable(),
    prev_page_url: z.string().nullable(),
  })
  // Extra keys (first_page_url, path, from, to...) are allowed and simply dropped.
}

// ── 422 validation errors (Laravel 5.5+) ──────────────────────────────
export const ValidationErrorSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())), // { "customer": ["The customer field is required."] }
})
export type ValidationError = z.infer<typeof ValidationErrorSchema>
