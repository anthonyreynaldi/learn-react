import { z } from 'zod'

type Log = (...values: unknown[]) => void

const SettingsSchema = z.object({
  pageSize: z.number().int().min(10).max(100),
  defaultStatus: z.enum(['pending', 'approved', 'rejected']),
})
type Settings = z.infer<typeof SettingsSchema>

const DEFAULT_SETTINGS: Settings = { pageSize: 20, defaultStatus: 'pending' }
const KEY = 'handbook-ts8-settings'

// localStorage is a boundary too: an old app version, another tab or a user in
// DevTools could have stored anything. safeParse never throws; it returns
// { success: true, data } or { success: false, error }.
function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === null) return DEFAULT_SETTINGS
    const result = SettingsSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS // JSON.parse failed: not even valid JSON
  }
}

export default function run(log: Log) {
  localStorage.removeItem(KEY)
  log('nothing stored:', loadSettings())

  localStorage.setItem(KEY, JSON.stringify({ pageSize: 50, defaultStatus: 'approved' }))
  log('valid settings:', loadSettings())

  localStorage.setItem(KEY, JSON.stringify({ pageSize: '50', defaultStatus: 'aproved' })) // old/broken data
  log('invalid settings → fallback:', loadSettings())

  localStorage.setItem(KEY, '{not json')
  log('not JSON → fallback:', loadSettings())

  localStorage.removeItem(KEY) // clean up
}
