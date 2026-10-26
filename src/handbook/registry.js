// Handbook shell — uses concepts from later parts. You don't need to understand it yet.
//
// All handbook parts, grouped into TRACKS (React, TypeScript, TanStack), in reading order.
// To add a part: create its folder under src/handbook/parts/ and add ONE import
// + ONE array entry below. See README.md.
import part00 from './parts/part00'
import part01 from './parts/part01'
import part02 from './parts/part02'
import part03 from './parts/part03'
import part04 from './parts/part04'
import part05 from './parts/part05'
import part06 from './parts/part06'
import part07 from './parts/part07'
import part08 from './parts/part08'
import part09 from './parts/part09'
import part10 from './parts/part10'
import part11 from './parts/part11'
import part12 from './parts/part12'
import part13 from './parts/part13'
import ts01 from './parts/ts01/index.ts'
import ts02 from './parts/ts02/index.ts'
import ts03 from './parts/ts03/index.ts'
import ts04 from './parts/ts04/index.ts'
import ts05 from './parts/ts05/index.ts'
import ts06 from './parts/ts06/index.ts'
import ts07 from './parts/ts07/index.ts'
import ts08 from './parts/ts08/index.ts'
import ts09 from './parts/ts09/index.ts'
import tan01 from './parts/tan01/index.ts'
import tan02 from './parts/tan02/index.ts'
import tan03 from './parts/tan03/index.ts'
import tan04 from './parts/tan04/index.ts'

export const tracks = [
  {
    id: 'react',
    title: 'React',
    label: 'Part', // shown as "Part 5"
    parts: [part00, part01, part02, part03, part04, part05, part06, part07, part08, part09, part10, part11, part12, part13],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    label: 'TS Part', // shown as "TS Part 1"
    badgePrefix: 'TS', // sidebar badge "TS1"
    parts: [ts01, ts02, ts03, ts04, ts05, ts06, ts07, ts08, ts09],
  },
  {
    id: 'tanstack',
    title: 'TanStack',
    label: 'TanStack Part', // shown as "TanStack Part 1"
    badgePrefix: 'T', // sidebar badge "T1"
    parts: [tan01, tan02, tan03, tan04],
  },
]

// Attach the track to every part, so the shell can label it ("Part 5" / "TS Part 1")
for (const track of tracks) {
  for (const part of track.parts) part.track = track
}

// All parts of all tracks, in reading order
export const parts = tracks.flatMap((track) => track.parts)

// "Part 5" or "TS Part 1"
export function partLabel(part) {
  return `${part.track.label} ${part.number}`
}

// Every topic in reading order, with its part attached.
// Used for the default topic and the Previous/Next buttons.
export const flatTopics = parts.flatMap((part) =>
  part.topics.map((topic) => ({ part, topic })),
)
