import baseCode from './examples/base.ts?raw'
import runPartialPickOmit from './examples/partialPickOmit.ts'
import partialPickOmitCode from './examples/partialPickOmit.ts?raw'
import StatusLabels from './examples/StatusLabels.tsx'
import statusLabelsCode from './examples/StatusLabels.tsx?raw'
import recordMissingKeyCode from './examples/recordMissingKey.txt?raw'
import runValidationErrors from './examples/validationErrors.ts'
import validationErrorsCode from './examples/validationErrors.ts?raw'
import SortableOrders from './examples/SortableOrders.tsx'
import sortableOrdersCode from './examples/SortableOrders.tsx?raw'
import runIndexedAccess from './examples/indexedAccess.ts'
import indexedAccessCode from './examples/indexedAccess.ts?raw'
import runTypeofTypes from './examples/typeofTypes.ts'
import typeofTypesCode from './examples/typeofTypes.ts?raw'
import StatusSelectConst from './examples/StatusSelectConst.tsx'
import statusSelectConstCode from './examples/StatusSelectConst.tsx?raw'
import asConstCompareCode from './examples/asConstCompare.ts?raw'
import runSatisfiesDemo from './examples/satisfiesDemo.ts'
import satisfiesDemoCode from './examples/satisfiesDemo.ts?raw'
import satisfiesVsAnnotationCode from './examples/satisfiesVsAnnotation.ts?raw'

export default {
  id: 'ts06',
  number: 6,
  title: 'Type Tools',
  topics: [
    {
      id: 'why-derive-types',
      title: 'Why derive types',
      summary:
        'Write each fact once and derive everything else from it. If Order changes, every type built from Order changes with it, and nothing is left out of date.',
      notes: [
        'Copying a type by hand (a NewOrder that repeats Order’s fields) means two places to update. One is always forgotten.',
        'Derived types (Omit<Order, \'id\'>, Order[\'status\']) follow the original automatically.',
        'Derive types from values, too: OrderStatus comes from the STATUSES list, so the list (for a <select>) and the type can’t disagree.',
        'Same idea as the database: one source of truth, no duplicated columns (Part 5’s "don’t store what you can calculate").',
      ],
      examples: [
        {
          title: 'The shared base: STATUSES, OrderStatus and Order',
          caption: 'Every example in this part imports these definitions from base.ts.',
          type: 'code',
          code: baseCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'partial-pick-omit',
      title: 'Partial, Pick, Omit',
      summary: 'Utility types build new object types from existing ones: Omit removes properties, Pick keeps some, Partial makes all of them optional.',
      notes: [
        'Omit<Order, \'id\'>: everything except id. Typical for "create" data, where the database assigns the id.',
        'Pick<Order, \'id\' | \'customer\' | \'status\'>: only those properties. Typical for summaries and dropdowns.',
        'Partial<Order>: all properties optional. Typical for PATCH-style updates that send only what changed.',
        'The remaining properties keep their exact types, so an update with status: \'aproved\' is still an error.',
      ],
      examples: [
        { title: 'NewOrder, OrderSummary and OrderUpdate', type: 'js', run: runPartialPickOmit, code: partialPickOmitCode, lang: 'ts' },
      ],
    },
    {
      id: 'record',
      title: 'Record',
      summary: 'Record<Keys, Value> is an object type with the given keys, each holding a Value. With a union as keys, every key is required.',
      notes: [
        'Record<OrderStatus, string>: exactly one string for every status. A missing status is an error.',
        'When a new status is added to STATUSES, every Record<OrderStatus, …> that lacks it becomes an error, a free to-do list.',
        'Record<string, string[]>: any string key. Perfect for Laravel’s validation errors.',
        'Like a PHP associative array, but with typed keys and values.',
      ],
      examples: [
        {
          title: 'statusLabels: Record<OrderStatus, string>',
          type: 'react',
          component: StatusLabels,
          code: statusLabelsCode,
          lang: 'tsx',
        },
        { title: 'A new status, but a missing label', type: 'code', code: recordMissingKeyCode, lang: 'ts' },
        {
          title: 'ValidationErrors = Record<string, string[]>',
          type: 'js',
          run: runValidationErrors,
          code: validationErrorsCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'keyof-indexed-access',
      title: 'keyof and indexed access',
      summary: 'keyof Order is the union of Order’s property names. Order[\'status\'] is the type of one property. Both stay in sync with Order.',
      notes: [
        'keyof Order = \'id\' | \'customer\' | \'total\' | \'status\' | \'note\'.',
        'Use it for "a property name of Order", like a sort field or a table column.',
        'Order[\'status\'] gives the status type without repeating the union; Order[\'total\'] gives number.',
        'Order[keyof Order] is the type of any property: a union of all of them.',
      ],
      examples: [
        {
          title: 'A table sorted by keyof Order',
          caption: 'Click id, customer and total to change the sort field.',
          type: 'react',
          component: SortableOrders,
          code: sortableOrdersCode,
          lang: 'tsx',
        },
        { title: 'Order[\'status\'] and Order[\'total\']', type: 'js', run: runIndexedAccess, code: indexedAccessCode, lang: 'ts' },
      ],
    },
    {
      id: 'typeof-types',
      title: 'typeof for types',
      summary: 'In a type position, typeof value gives that value’s type. Write the value once and let the type follow it.',
      notes: [
        'type Filters = typeof defaultFilters: the type is read from the object.',
        'Add a filter to defaultFilters and Filters updates automatically.',
        'This is TypeScript’s typeof (in types), not JavaScript’s typeof x === \'string\' check (in code). The keyword is the same; the place decides.',
        '(typeof STATUSES)[number] combines typeof with indexed access: "the type of any item in STATUSES".',
      ],
      examples: [
        { title: 'Filters = typeof defaultFilters', type: 'js', run: runTypeofTypes, code: typeofTypesCode, lang: 'ts' },
      ],
    },
    {
      id: 'as-const',
      title: 'as const',
      summary:
        'as const tells TypeScript to keep the exact literal values and make them read-only. It turns a list of strings into the source of a literal union.',
      notes: [
        'Without it, [\'pending\', \'approved\'] is just string[] and (typeof list)[number] is string: no safety.',
        'With it, the type is readonly [\'pending\', \'approved\', \'rejected\'], and its items form the union.',
        'The list stays a normal runtime value: map over it to render <option>s.',
        'It also prevents accidental changes: push and item assignment are errors.',
      ],
      examples: [
        {
          title: 'A status select rendered from STATUSES',
          type: 'react',
          component: StatusSelectConst,
          code: statusSelectConstCode,
          lang: 'tsx',
        },
        { title: 'With and without as const', type: 'code', code: asConstCompareCode, lang: 'ts' },
      ],
    },
    {
      id: 'satisfies',
      title: 'satisfies',
      summary:
        'value satisfies Type checks the value against the type, but keeps the value’s own precise type. Ideal for lookup tables and configuration objects.',
      notes: [
        'Missing or misspelled keys are errors, just like with an annotation.',
        'Unlike an annotation, the exact values are kept: \'#f59e0b\', or a specific { bg, fg } shape.',
        'Annotation (: Type) when the variable should BE the general type; satisfies to CHECK a constant while keeping its details.',
      ],
      examples: [
        { title: 'statusColors satisfies Record<OrderStatus, string>', type: 'js', run: runSatisfiesDemo, code: satisfiesDemoCode, lang: 'ts' },
        { title: 'satisfies vs an annotation', type: 'code', code: satisfiesVsAnnotationCode, lang: 'ts' },
      ],
    },
  ],
}
