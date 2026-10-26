// const only protects the VARIABLE (the binding), not the contents of an object or array.
export default function run(log) {
  const order = { customer: 'PT Maju Jaya', status: 'pending' }

  // Allowed: changing a property inside the object (mutation)
  order.status = 'approved'
  log('mutated object:', order)

  const items = ['Floor Tile 60x60']
  items.push('Wall Tile 30x60') // also a mutation, also allowed
  log('mutated array:', items)

  // Not allowed: pointing the variable at a brand new object.
  // This line is commented out because the build would refuse it:
  // order = { customer: 'CV Sinar Abadi' } // TypeError: Assignment to constant variable.
  log('order is still the same object, only its contents changed')
}
