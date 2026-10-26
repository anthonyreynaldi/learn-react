// A REAL import through the "@/" alias set up in tsconfig.json and vite.config.js.
// '@/utils/format.js' → src/utils/format.js (the formatRupiah from the very first lessons)
import { formatRupiah } from '@/utils/format.js'

type Log = (...values: unknown[]) => void

export default function run(log: Log) {
  log('formatRupiah(750000):', formatRupiah(750000))
  log('formatRupiah(1250000):', formatRupiah(1250000))
  // Without the alias, this file would need: '../../../../../utils/format.js'
}
