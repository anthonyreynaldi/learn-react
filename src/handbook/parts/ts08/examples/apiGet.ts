import { z } from 'zod'

// A VALIDATING api helper. Compare with TS Part 5's apiGet<T>, which trusted the server.
// The caller passes a schema; the return type is whatever that schema produces.
export async function apiGet<S extends z.ZodType>(path: string, schema: S): Promise<z.infer<S>> {
  const response = await fetch(path)
  if (!response.ok) throw new Error(`GET ${path} failed with ${response.status}`)

  const json: unknown = await response.json() // honest: we don't know what arrived yet

  // parse() CHECKS the data. If it doesn't match, it throws a z.ZodError that lists
  // every problem. If it matches, the result is fully typed: no `as` anywhere.
  return schema.parse(json)
}
