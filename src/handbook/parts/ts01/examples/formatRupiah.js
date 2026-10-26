// JavaScript: nothing says what n should be.
// formatRupiah('750000') runs without complaint: a string has toLocaleString too,
// so it returns "Rp 750000" (no thousands separator), and the bug goes unnoticed.
export function formatRupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
