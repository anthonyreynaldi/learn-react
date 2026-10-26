type Log = (...values: unknown[]) => void

// Before using the value as a number, check that it is not null.
function describeSelection(selectedId: number | null): string {
  // return `next is #${selectedId + 1}`
  // ✗ 'selectedId' is possibly 'null'.
  if (selectedId === null) {
    return 'nothing selected'
  }
  return `order #${selectedId}, next is #${selectedId + 1}` // ✓ here selectedId is number
}

export default function run(log: Log) {
  // A union type: "a number OR null". null = "nothing selected yet",
  // like a nullable column (selected_id INT NULL) or ?int in PHP.
  let selectedId: number | null = null
  log('start:', selectedId, '→', describeSelection(selectedId))

  selectedId = 102 // ✓ a number
  log('after selecting:', selectedId, '→', describeSelection(selectedId))

  selectedId = null // ✓ null is allowed too
  // selectedId = '102'
  // ✗ Type 'string' is not assignable to type 'number'.
  //   (TypeScript leaves out the null here: only number could ever match a string.)
  log('after clearing:', selectedId, '→', describeSelection(selectedId))

  // useState works the same way: useState<number | null>(null)
}
