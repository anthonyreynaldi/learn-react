import runPrimitives from './examples/primitives.ts'
import primitivesCode from './examples/primitives.ts?raw'
import runArrays from './examples/arrays.ts'
import arraysCode from './examples/arrays.ts?raw'
import runObjectTypes from './examples/objectTypes.ts'
import objectTypesCode from './examples/objectTypes.ts?raw'
import runOptionalProps from './examples/optionalProps.ts'
import optionalPropsCode from './examples/optionalProps.ts?raw'
import FindOrder from './examples/FindOrder.tsx'
import findOrderCode from './examples/FindOrder.tsx?raw'
import possiblyUndefinedCode from './examples/possiblyUndefined.txt?raw'
import runNullableId from './examples/nullableId.ts'
import nullableIdCode from './examples/nullableId.ts?raw'
import anyHidesBugCode from './examples/anyHidesBug.ts?raw'
import runUnknownJson from './examples/unknownJson.ts'
import unknownJsonCode from './examples/unknownJson.ts?raw'

export default {
  id: 'ts02',
  number: 2,
  title: 'Basic Types',
  topics: [
    {
      id: 'primitive-types',
      title: 'Primitive types',
      summary: 'The basic building blocks are string, number and boolean, written in lowercase.',
      notes: [
        'string, number, boolean: always lowercase (String with a capital S is something else).',
        'number covers integers AND decimals. There is no separate int or float like in PHP.',
        'Usually you don’t write them: const qty = 3 is already inferred as number (TS Part 1).',
      ],
      examples: [{ title: 'string, number, boolean', type: 'js', run: runPrimitives, code: primitivesCode, lang: 'ts' }],
    },
    {
      id: 'arrays',
      title: 'Arrays',
      summary: 'Type[] describes an array whose items all have that type: string[], number[], Order[].',
      notes: [
        'string[] is an array of strings; adding a number is an error.',
        'Array<string> means exactly the same. Both styles appear in real code.',
        'Every array method knows the item type: in totals.reduce((sum, t) => …), t is a number.',
      ],
      examples: [{ title: 'string[] and number[]', type: 'js', run: runArrays, code: arraysCode, lang: 'ts' }],
    },
    {
      id: 'object-types',
      title: 'Object types',
      summary:
        'A type alias describes the shape of an object: its property names and their types. TypeScript then checks every object you claim is an Order.',
      notes: [
        'type Order = { id: number; customer: string; ... } names the shape so you can reuse it.',
        'A missing property is an error ("Property \'status\' is missing").',
        'An unknown property in an object literal is an error too, and usually a typo ("Did you mean to write \'customer\'?").',
        'Like a PHP class with typed properties, but only for checking: no code is generated.',
      ],
      examples: [{ title: 'type Order and Order[]', type: 'js', run: runObjectTypes, code: objectTypesCode, lang: 'ts' }],
    },
    {
      id: 'optional-properties',
      title: 'Optional properties',
      summary: 'A ? after a property name makes it optional. Its type then includes undefined, so you must handle the missing case.',
      notes: [
        'note?: string means: may be missing; if present, it is a string. Its type is string | undefined.',
        'Reading a missing optional property gives undefined, not an error.',
        'Use ?. and ?? to work with it safely (Part 0).',
      ],
      examples: [
        { title: 'An order with and without a note', type: 'js', run: runOptionalProps, code: optionalPropsCode, lang: 'ts' },
      ],
    },
    {
      id: 'null-undefined',
      title: 'null and undefined',
      summary:
        'With strict on, null and undefined are only allowed where the type says so. Values that may be missing (find results, optional props, "nothing selected") must be checked before use.',
      notes: [
        'orders.find(...) returns Order | undefined: maybe nothing matched.',
        'Handle it with an if check (narrowing), optional chaining ?., or a fallback with ??.',
        'Use a union like number | null for "a value or nothing yet", e.g. a selected id.',
        'Inside if (x !== null) or after if (!order) return, TypeScript knows the value is there.',
      ],
      examples: [
        {
          title: 'Three ways to handle a find() result',
          caption: 'Type 999: the if check and ?? show "Not found", and ?. shows nothing.',
          type: 'react',
          component: FindOrder,
          code: findOrderCode,
          lang: 'tsx',
        },
        { title: 'The error without a check', type: 'code', code: possiblyUndefinedCode, lang: 'ts' },
        { title: 'let selectedId: number | null', type: 'js', run: runNullableId, code: nullableIdCode, lang: 'ts' },
      ],
    },
    {
      id: 'any-unknown',
      title: 'any and unknown',
      summary:
        'any turns type checking off for a value, so bugs slip through. unknown also accepts anything, but forces you to check what it is before using it.',
      notes: [
        'any: "allow everything". Typos and wrong types are no longer reported, and anything read from an any is any too.',
        'unknown: "could be anything, prove it first". You need typeof / in checks before using it.',
        'Prefer unknown for data from outside (JSON, API responses, localStorage).',
        'JSON.parse is typed as returning any, so store its result as unknown on purpose.',
        'Avoid writing any yourself. With strict, TypeScript never adds it silently.',
      ],
      examples: [
        {
          title: 'any hiding a bug',
          caption: 'This file passes npm run typecheck, yet printCustomer crashes at runtime.',
          type: 'code',
          code: anyHidesBugCode,
          lang: 'ts',
        },
        { title: 'JSON.parse into unknown, then check', type: 'js', run: runUnknownJson, code: unknownJsonCode, lang: 'ts' },
      ],
    },
  ],
}
