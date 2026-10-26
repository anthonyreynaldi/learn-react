// Formats a number as Indonesian Rupiah, e.g. 750000 -> "Rp 750.000"
export function formatRupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
