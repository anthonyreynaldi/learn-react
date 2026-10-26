import { createContext } from 'react'

// A context is a "channel" that a parent can fill with a value and any
// component below can read, without passing props through every level.
//
// The argument is the DEFAULT value: used only by components that have
// no matching provider above them.
export const SettingsContext = createContext({ locale: 'en-GB', currency: 'GBP' })
