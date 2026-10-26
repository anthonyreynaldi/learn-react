type Log = (...values: unknown[]) => void

// Laravel's 422 errors: any field name → a list of messages (TS Part 9 forms).
// The keys aren't known in advance ("customer", "lines.0.qty", ...), so Keys = string.
type ValidationErrors = Record<string, string[]>

function firstError(errors: ValidationErrors, field: string): string | undefined {
  return errors[field]?.[0]
}

export default function run(log: Log) {
  const errors: ValidationErrors = {
    customer: ['The customer field is required.'],
    'lines.0.qty': ['The lines.0.qty must be at least 1.'],
  }

  log('customer:', firstError(errors, 'customer'))
  log('lines.0.qty:', firstError(errors, 'lines.0.qty'))
  log('warehouse:', firstError(errors, 'warehouse')) // no error for this field → undefined
  log('fields with errors:', Object.keys(errors))

  // The values are still checked:
  // const bad: ValidationErrors = { customer: 'The customer field is required.' }
  // ✗ Type 'string' is not assignable to type 'string[]'.
}
