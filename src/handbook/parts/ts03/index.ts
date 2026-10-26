import runParamReturnTypes from './examples/paramReturnTypes.ts'
import paramReturnTypesCode from './examples/paramReturnTypes.ts?raw'
import runOptionalDefaultParams from './examples/optionalDefaultParams.ts'
import optionalDefaultParamsCode from './examples/optionalDefaultParams.ts?raw'
import runObjectParams from './examples/objectParams.ts'
import objectParamsCode from './examples/objectParams.ts?raw'
import objectParamsWrongCode from './examples/objectParamsWrong.txt?raw'
import runCallbacks from './examples/callbacks.ts'
import callbacksCode from './examples/callbacks.ts?raw'
import OrderApproval from './examples/OrderApproval.tsx'
import orderApprovalCode from './examples/OrderApproval.tsx?raw'
import runAsyncFunctions from './examples/asyncFunctions.ts'
import asyncFunctionsCode from './examples/asyncFunctions.ts?raw'

export default {
  id: 'ts03',
  number: 3,
  title: 'Functions',
  topics: [
    {
      id: 'parameter-return-types',
      title: 'Parameter and return types',
      summary: 'Give every parameter a type, and optionally the return value. Callers then get an error for wrong types and for too few or too many arguments.',
      notes: [
        'function calculateTotal(price: number, qty: number): number — types after each parameter and after the ().',
        'Wrong argument type → "Argument of type … is not assignable to parameter of type …".',
        'Wrong number of arguments → "Expected 2 arguments, but got 1". Plain JavaScript would silently use undefined.',
        'The return type is usually inferred; writing it on exported functions documents and checks your intent.',
      ],
      examples: [
        { title: 'calculateTotal(price, qty)', type: 'js', run: runParamReturnTypes, code: paramReturnTypesCode, lang: 'ts' },
      ],
    },
    {
      id: 'optional-default-parameters',
      title: 'Optional and default parameters',
      summary: 'customer?: string makes a parameter optional (it may be undefined); rate = 0.11 gives it a default value (never undefined inside).',
      notes: [
        'param?: Type → may be left out; inside the function its type is Type | undefined.',
        'param = value → may be left out; the default is used, and the type is inferred from it.',
        'Optional and default parameters go after the required ones, like default values in PHP.',
      ],
      examples: [
        {
          title: 'orderLabel(id, customer?) and applyTax(amount, rate = 0.11)',
          type: 'js',
          run: runOptionalDefaultParams,
          code: optionalDefaultParamsCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'object-parameters',
      title: 'Object parameters',
      summary: 'When a function takes an object and destructures it, the type goes after the whole pattern: ({ name, price }: Product).',
      notes: [
        '({ name, price }: Product): destructure first, then one type for the whole object.',
        '({ name: string }) is NOT a type: it renames name to a variable called string (Part 0 destructuring).',
        'Passing an object with extra properties (stock) is fine when it comes from a variable.',
      ],
      examples: [
        { title: 'formatProduct({ name, price }: Product)', type: 'js', run: runObjectParams, code: objectParamsCode, lang: 'ts' },
        { title: 'The renaming trap', type: 'code', code: objectParamsWrongCode, lang: 'ts' },
      ],
    },
    {
      id: 'callbacks',
      title: 'Callbacks',
      summary: 'Callbacks passed to map, filter, find and reduce need no annotations: TypeScript already knows what they receive.',
      notes: [
        'Contextual typing: when a function is passed somewhere that expects a known function type, TypeScript infers its parameter types from that context.',
        'orders is Order[], so in orders.map((o) => …) o is an Order, and the result type follows from what you return.',
        'find returns Order | undefined, and reduce’s accumulator gets the type of the initial value (0 → number).',
        'Typos inside callbacks are still caught.',
      ],
      examples: [{ title: 'map / filter / find / reduce', type: 'js', run: runCallbacks, code: callbacksCode, lang: 'ts' }],
    },
    {
      id: 'function-types',
      title: 'Function types',
      summary: 'A function can be a prop. Its type is written like an arrow: (id: number) => void means "takes a number, returns nothing useful".',
      notes: [
        '(id: number) => void: the parameter list, an arrow, then the return type.',
        'void means the return value is ignored, typical for event handlers and onX props.',
        'The parent’s handleApprove(id: number) matches the type, so it can be passed as onApprove.',
        'Calling onApprove with a string would be an error inside the child.',
      ],
      examples: [
        {
          title: 'OrderRow with onApprove: (id: number) => void',
          type: 'react',
          component: OrderApproval,
          code: orderApprovalCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'async-functions',
      title: 'Async functions',
      summary: 'An async function always returns a Promise, so its return type is Promise<Something>. await unwraps it back to Something.',
      notes: [
        'async function fakeFetchOrder(id: number): Promise<Order>: "eventually gives an Order".',
        'Promise<void>: finishes, but gives back no value.',
        'const order = await fakeFetchOrder(101): order has the type Order.',
        'In catch (err), err is unknown in strict mode: check err instanceof Error before reading err.message.',
        'Promise<Order> is a promise about the data, not a check. Real API data is validated in TS Part 8.',
      ],
      examples: [
        { title: 'Promise<Order> and Promise<void>', type: 'js', run: runAsyncFunctions, code: asyncFunctionsCode, lang: 'ts' },
      ],
    },
  ],
}
