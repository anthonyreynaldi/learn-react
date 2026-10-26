// let and const are block-scoped: they only exist inside the { } where they are declared.
export default function run(log) {
  let status = 'pending'

  if (true) {
    // This is a NEW variable that only lives inside this if-block
    let status = 'approved'
    log('inside block:', status)
  }

  log('outside block:', status)

  // let can be reassigned
  status = 'rejected'
  log('after reassign:', status)

  // const cannot be reassigned
  const customer = 'PT Maju Jaya'
  // customer = 'CV Sinar Abadi'
  // ^ Uncommenting this line breaks the build with "Cannot assign to const variable".
  //   (In plain JavaScript it throws: TypeError: Assignment to constant variable.)
  log('customer is still:', customer)
}
