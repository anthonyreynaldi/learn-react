// A small module. Only things marked "export" can be imported by other files.

// PRIVATE: not exported, so no other file can use it (like a private method in PHP)
function addThousandsDots(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Named exports: imported with { curly braces } and the exact name
export const TAX_RATE = 0.11

export function toRupiah(amount) {
  return 'Rp ' + addThousandsDots(amount)
}

export function addTax(amount) {
  return Math.round(amount * (1 + TAX_RATE))
}

// Default export: one per file, imported WITHOUT braces, with any name you like
export default function lineTotal(qty, price) {
  return qty * price
}
