// Functions are values: you can store them in variables and pass them to other functions.
export default function run(log) {
  const sayApproved = () => log('Order approved!')

  // Storing a function vs calling it
  log(typeof sayApproved) // the function itself
  sayApproved() // calling it with ()

  // A function that receives another function (a "callback")
  function processOrder(customer, onDone) {
    log(`Processing order for ${customer}...`)
    onDone(customer) // we call the callback when we are finished
  }

  // Pass a named function
  processOrder('PT Maju Jaya', sayApproved)

  // Or pass an inline arrow function
  processOrder('CV Sinar Abadi', (name) => log(`Done with ${name}`))
}
