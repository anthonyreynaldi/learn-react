import NewOrderFormDemo from './examples/NewOrderForm.tsx'
import newOrderFormCode from './examples/NewOrderForm.tsx?raw'

export default {
  id: 'tan02',
  number: 2,
  title: 'TanStack Form',
  topics: [
    {
      id: 'new-order-form',
      title: 'A typed form with useForm',
      summary:
        'TanStack Form keeps form values, validation and submit state for you, fully typed from defaultValues. A Zod schema validates the whole form on every change.',
      notes: [
        'useForm({ defaultValues }) infers every field name and type: form.Field name="customer" is checked, and a typo is an error.',
        'Render props: <form.Field> gives you field.state.value, field.handleChange, field.handleBlur and field.state.meta (errors, isTouched).',
        'validators.onChange accepts any Standard Schema validator (Zod, Valibot, ArkType), so the same schema can validate forms and API data (TS Part 8).',
        'Show errors only when isTouched, so users aren’t scolded before they typed anything. Submitting marks every field as touched, so an empty submit shows all errors at once.',
        'form.Subscribe re-renders only the part that needs form state, like the submit button.',
        'Compared with React Hook Form: both are fast and typed. RHF uses register() on uncontrolled inputs; TanStack Form uses explicit field components and is framework-agnostic.',
      ],
      examples: [
        {
          title: 'NewOrderForm',
          caption: 'Click into a field and out again to see its error. Create an order: it is saved through the fake API and shown below.',
          type: 'react',
          component: NewOrderFormDemo,
          code: newOrderFormCode,
          lang: 'tsx',
        },
      ],
    },
  ],
}
