import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { formatRupiah } from '@/utils/format.js'
import { createOrder, NewOrderSchema, type NewOrder, type Order } from '@/handbook/parts/tan01/examples/shared/ordersApi.ts'

const defaultValues: NewOrder = { customer: '', total: 0 }

// Errors arrive as Standard Schema issues ({ message }) or plain strings
function FieldErrors({ errors }: { errors: unknown[] }) {
  if (errors.length === 0) return null
  const first = errors[0]
  const message = typeof first === 'string' ? first : (first as { message?: string } | undefined)?.message
  return <div style={{ color: '#dc2626', fontSize: 13 }}>{message}</div>
}

// A reusable form: the caller decides what "create" does (direct API call, or a
// TanStack Query mutation in "All together").
export function NewOrderForm({ onCreate }: { onCreate: (data: NewOrder) => Promise<Order> }) {
  const [saved, setSaved] = useState<Order | null>(null)

  const form = useForm({
    defaultValues, // field names AND types are inferred from this object
    validators: {
      // Any Standard Schema validator works here: Zod, Valibot, ArkType...
      onChange: NewOrderSchema,
    },
    onSubmit: async ({ value }) => {
      // value: NewOrder, already valid
      const order = await onCreate(value)
      setSaved(order)
      form.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      noValidate
    >
      {/* name is TYPED: only "customer" or "total" are allowed (a typo is an error) */}
      <form.Field name="customer">
        {(field) => (
          // RENDER PROP: the function receives this field's state and handlers
          <div style={{ marginBottom: 10 }}>
            <label htmlFor={field.name}>Customer</label>
            <br />
            <input
              id={field.name}
              value={field.state.value} // string
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur} // marks the field as touched
            />
            {/* Only show errors after the user has been in the field */}
            {field.state.meta.isTouched && <FieldErrors errors={field.state.meta.errors} />}
          </div>
        )}
      </form.Field>

      <form.Field name="total">
        {(field) => (
          <div style={{ marginBottom: 10 }}>
            <label htmlFor={field.name}>Total (Rp)</label>
            <br />
            <input
              id={field.name}
              type="number"
              value={Number.isNaN(field.state.value) ? '' : field.state.value} // number
              // valueAsNumber: the browser converts for us ("" → NaN, which the schema rejects)
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.isTouched && <FieldErrors errors={field.state.meta.errors} />}
          </div>
        )}
      </form.Field>

      {/* Subscribe re-renders ONLY this part when canSubmit / isSubmitting change */}
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Create order'}
          </button>
        )}
      </form.Subscribe>

      {saved && (
        <p style={{ color: 'green' }}>
          Saved order #{saved.id}: {saved.customer}, {formatRupiah(saved.total)} ({saved.status})
        </p>
      )}
    </form>
  )
}

export default function NewOrderFormDemo() {
  return <NewOrderForm onCreate={createOrder} />
}
