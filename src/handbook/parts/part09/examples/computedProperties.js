// Computed property names: { [expression]: value }
export default function run(log) {
  const name = 'customer'

  // Without brackets the key is literally "name"
  log({ name: 'PT Maju Jaya' })

  // With brackets the key is the VALUE of the variable: "customer"
  log({ [name]: 'PT Maju Jaya' })

  // Any expression works inside the brackets
  const index = 0
  log({ [`lines.${index}.qty`]: ['The lines.0.qty must be at least 1.'] })

  // This is how one handleChange can update any field of a form object
  const form = { customer: '', warehouse: 'SBY' }
  function update(fieldName, value) {
    return { ...form, [fieldName]: value }
  }
  log(update('customer', 'CV Sinar Abadi'))
  log(update('warehouse', 'JKT'))
}
