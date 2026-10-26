import runUnionTypes from './examples/unionTypes.ts'
import unionTypesCode from './examples/unionTypes.ts?raw'
import StatusSelect from './examples/StatusSelect.tsx'
import statusSelectCode from './examples/StatusSelect.tsx?raw'
import runNarrowing from './examples/narrowing.ts'
import narrowingCode from './examples/narrowing.ts?raw'
import OrdersStateView from './examples/OrdersStateView.tsx'
import ordersStateViewCode from './examples/OrdersStateView.tsx?raw'
import optionalPropsStateCode from './examples/optionalPropsState.txt?raw'
import lineActionsCode from './examples/lineActions.ts?raw'
import runIntersections from './examples/intersections.ts'
import intersectionsCode from './examples/intersections.ts?raw'
import typeVsInterfaceCode from './examples/typeVsInterface.ts?raw'

export default {
  id: 'ts04',
  number: 4,
  title: 'Combining Types',
  topics: [
    {
      id: 'union-types',
      title: 'Union types',
      summary: 'A union type, A | B, means "either A or B". Inside the function you check which one you got before using type-specific features.',
      notes: [
        'number | string accepts both; anything else (a boolean) is an error.',
        'Before narrowing, only what both types share is allowed.',
        'Unions are everywhere in React code: string | null, Order | undefined, and status unions.',
      ],
      examples: [{ title: 'formatId(id: number | string)', type: 'js', run: runUnionTypes, code: unionTypesCode, lang: 'ts' }],
    },
    {
      id: 'literal-types',
      title: 'Literal types',
      summary:
        'A literal type is one exact value, like \'approved\'. A union of literals lists every allowed value, which is perfect for statuses.',
      notes: [
        'type OrderStatus = \'pending\' | \'approved\' | \'rejected\': only these three strings are valid.',
        'Typos such as \'aproved\' are errors, and the editor autocompletes the valid values.',
        'Like a PostgreSQL enum type or a CHECK (status IN (...)) constraint, but checked while you write code, not when a row is inserted.',
        'Values from the outside (e.target.value, query strings, JSON) are plain strings. Check them against the allowed list before treating them as an OrderStatus.',
      ],
      examples: [
        {
          title: 'A status select and badge typed with OrderStatus',
          type: 'react',
          component: StatusSelect,
          code: statusSelectCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'narrowing',
      title: 'Narrowing',
      summary:
        'Narrowing is how TypeScript follows your checks: after typeof, a null check, an equality check or an early return, it knows a more specific type.',
      notes: [
        'typeof id === \'number\' narrows number | string to number (and to string in the other branch).',
        'x !== null removes null; if (!order) return removes undefined for the rest of the function.',
        'status === \'approved\' narrows a literal union to that one value.',
        'You write normal JavaScript checks. TypeScript just reads them. No special syntax is needed.',
      ],
      examples: [{ title: 'Four kinds of narrowing', type: 'js', run: runNarrowing, code: narrowingCode, lang: 'ts' }],
    },
    {
      id: 'discriminated-unions',
      title: 'Discriminated unions',
      summary:
        'A discriminated union is a union of object shapes that share one literal property (like status). Checking that property tells TypeScript exactly which shape, and which properties, you have.',
      notes: [
        'Each shape carries only its own data: success has orders, error has message, loading has neither.',
        'switch (state.status) narrows to one shape per case.',
        'Impossible states (loading with an error message, success without orders) can’t even be written.',
        'Reducer actions are the classic use: one shape per action type, each with its own payload.',
        'A const x: never = action in the default case makes TypeScript complain when a new action isn’t handled.',
      ],
      examples: [
        {
          title: 'OrdersState: loading | success | error',
          caption: 'Switch between the states. Each one renders different data, and the JSON shows the exact object.',
          type: 'react',
          component: OrdersStateView,
          code: ordersStateViewCode,
          lang: 'tsx',
        },
        { title: 'The weaker version with optional properties', type: 'code', code: optionalPropsStateCode, lang: 'ts' },
        { title: 'LineAction: a union for reducer actions', type: 'code', code: lineActionsCode, lang: 'ts' },
      ],
    },
    {
      id: 'intersections',
      title: 'Intersections',
      summary: 'An intersection, A & B, combines two types: the value must have everything from both.',
      notes: [
        'Order & { lines: OrderLine[] } = an Order with an extra lines property.',
        'Useful for "the same thing plus more": an order with its lines, a user with permissions.',
        'Union (|) = one OR the other; intersection (&) = both at once.',
      ],
      examples: [
        { title: 'OrderWithLines = Order & { lines: OrderLine[] }', type: 'js', run: runIntersections, code: intersectionsCode, lang: 'ts' },
      ],
    },
    {
      id: 'type-vs-interface',
      title: 'type vs interface',
      summary:
        'Both type and interface describe object shapes and are checked the same way. type can also describe unions and literals, so this handbook uses type everywhere.',
      notes: [
        'interface Order { … } and type Order = { … } describe the same shape.',
        'Extending: interface uses extends (like PHP); type uses & (intersection).',
        'Only type can express unions, literal types and discriminated unions.',
        'Use type consistently in your own code, and recognize interface in libraries and older code.',
      ],
      examples: [{ title: 'The same shape both ways', type: 'code', code: typeVsInterfaceCode, lang: 'ts' }],
    },
  ],
}
