// TypeScript: the same function, plus TYPES after a colon.
//   n: number   → the parameter must be a number
//   ): string   → the function returns a string
export function formatRupiah(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID')
}

// formatRupiah(750000)    ✓ "Rp 750.000"
// formatRupiah('750000')  ✗ red underline in the editor:
//   Argument of type 'string' is not assignable to parameter of type 'number'.
