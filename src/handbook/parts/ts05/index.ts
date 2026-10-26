import theProblemCode from './examples/theProblem.ts?raw'
import runGenericFunctions from './examples/genericFunctions.ts'
import genericFunctionsCode from './examples/genericFunctions.ts?raw'
import alreadyUsedCode from './examples/alreadyUsed.tsx?raw'
import runGenericTypes from './examples/genericTypes.ts'
import genericTypesCode from './examples/genericTypes.ts?raw'
import RequestStateView from './examples/RequestStateView.tsx'
import requestStateViewCode from './examples/RequestStateView.tsx?raw'
import runConstraints from './examples/constraints.ts'
import constraintsCode from './examples/constraints.ts?raw'
import runApiHelper from './examples/apiHelper.ts'
import apiHelperCode from './examples/apiHelper.ts?raw'

export default {
  id: 'ts05',
  number: 5,
  title: 'Generics',
  topics: [
    {
      id: 'the-problem',
      title: 'The problem',
      summary:
        'Some logic is the same for every type: "give me the first item", "find by id", "load from the API". Without generics you either copy the function for every type or use any and lose the type.',
      notes: [
        'One function per type: correct, but endless copy-paste.',
        'any: one function, but the result is any, so typos and wrong types are no longer caught.',
        'Generics give you both: one function, and the exact type is kept.',
      ],
      examples: [{ title: 'Copy-paste or any', type: 'code', code: theProblemCode, lang: 'ts' }],
    },
    {
      id: 'generic-functions',
      title: 'Generic functions',
      summary: 'A type parameter <T> is a placeholder for a type, filled in by each call. first<T>(items: T[]): T | undefined works for orders, strings and numbers alike.',
      notes: [
        '<T> after the function name declares the type parameter; T is then used like any type.',
        'TypeScript infers T from the arguments: first(orders) → T = Order.',
        'The result keeps the real type, so typos are still caught.',
        'You can pass T explicitly (first<Order>(orders)), but you rarely need to.',
      ],
      examples: [{ title: 'first<T>(items: T[])', type: 'js', run: runGenericFunctions, code: genericFunctionsCode, lang: 'ts' }],
    },
    {
      id: 'generics-you-use',
      title: 'Generics you already use',
      summary: 'Array<string>, Promise<Order> and useState<Order[]> are all generic types: the part in <...> says what they contain.',
      notes: [
        'string[] is shorthand for Array<string>.',
        'An async function returning orders has the type Promise<Order[]>.',
        'useState<Order[]>([]) tells TypeScript what the empty array will hold.',
        'Usually inference fills in the <...>; you write it when the initial value isn’t enough ([], null).',
      ],
      examples: [{ title: 'Array, Promise and useState', type: 'code', code: alreadyUsedCode, lang: 'tsx' }],
    },
    {
      id: 'generic-types',
      title: 'Generic types',
      summary:
        'Types can have type parameters too. Paginated<T> describes Laravel’s paginate() response for any item type, and RequestState<T> describes loading any data.',
      notes: [
        'type Paginated<T> = { data: T[]; current_page: number; … } matches Order::paginate() JSON.',
        'Paginated<Order> and Paginated<Customer> share one definition.',
        'RequestState<T> is a generic discriminated union: the success case carries data: T.',
        'Write the shape once and reuse it everywhere, like a generic Laravel resource collection.',
      ],
      examples: [
        { title: 'Paginated<T> and RequestState<T>', type: 'js', run: runGenericTypes, code: genericTypesCode, lang: 'ts' },
        {
          title: 'RequestState<Order[]> in a component',
          type: 'react',
          component: RequestStateView,
          code: requestStateViewCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'constraints',
      title: 'Constraints',
      summary: 'T extends { id: number } limits a type parameter to types that have certain properties, so the function may use them.',
      notes: [
        'Without a constraint, T could be anything, so item.id is an error.',
        '<T extends { id: number }> means "any type that has a numeric id".',
        'Orders and customers both work, and the result keeps their full type (customer.city still exists).',
        'Types without an id, like plain strings, are rejected.',
      ],
      examples: [{ title: 'findById<T extends { id: number }>', type: 'js', run: runConstraints, code: constraintsCode, lang: 'ts' }],
    },
    {
      id: 'typed-api-helper',
      title: 'Typed API helper',
      summary:
        'A generic apiGet<T>(path) lets each caller say what it expects: apiGet<Order[]>(\'/api/orders\'). Everything after the call is fully typed.',
      notes: [
        'apiGet<T> returns Promise<T>; the caller picks T with an explicit type argument.',
        'apiGet<Paginated<Order>>(…) combines the generic helper with a generic type.',
        'The as T inside the helper TRUSTS the server. If Laravel changes the response, TypeScript won’t notice.',
        'TS Part 8 replaces that trust with runtime validation.',
      ],
      examples: [
        {
          title: 'apiGet<T> on a fake server',
          type: 'js',
          run: runApiHelper,
          code: apiHelperCode,
          lang: 'ts',
        },
      ],
    },
  ],
}
