// An async function ALWAYS returns a Promise, even if it returns a plain value.
export default async function run(log) {
  async function getStatus() {
    return 'approved'
  }

  // Without await you get the Promise itself, not the value
  const withoutAwait = getStatus()
  log('without await:', withoutAwait)

  // With await you get the value inside the Promise
  const withAwait = await getStatus()
  log('with await:', withAwait)

  // Because we used await, THIS function (run) must be async too.
  // That's "async contagion": async spreads up to every caller that wants the value.
}
