import runLetScope from './examples/letScope.js'
import letScopeCode from './examples/letScope.js?raw'
import runConstMutation from './examples/constMutation.js'
import constMutationCode from './examples/constMutation.js?raw'
import runTemplateLiterals from './examples/templateLiterals.js'
import templateLiteralsCode from './examples/templateLiterals.js?raw'
import runArrowShortForms from './examples/arrowShortForms.js'
import arrowShortFormsCode from './examples/arrowShortForms.js?raw'
import runArrowReturnObject from './examples/arrowReturnObject.js'
import arrowReturnObjectCode from './examples/arrowReturnObject.js?raw'
import runArrowCallbacks from './examples/arrowCallbacks.js'
import arrowCallbacksCode from './examples/arrowCallbacks.js?raw'
import runObjectBasics from './examples/objectBasics.js'
import objectBasicsCode from './examples/objectBasics.js?raw'
import runShorthandProps from './examples/shorthandProps.js'
import shorthandPropsCode from './examples/shorthandProps.js?raw'
import runDestructureObject from './examples/destructureObject.js'
import destructureObjectCode from './examples/destructureObject.js?raw'
import runDestructureArray from './examples/destructureArray.js'
import destructureArrayCode from './examples/destructureArray.js?raw'
import runDestructureParams from './examples/destructureParams.js'
import destructureParamsCode from './examples/destructureParams.js?raw'
import runSpreadArrays from './examples/spreadArrays.js'
import spreadArraysCode from './examples/spreadArrays.js?raw'
import runSpreadObjects from './examples/spreadObjects.js'
import spreadObjectsCode from './examples/spreadObjects.js?raw'
import runRestDestructuring from './examples/restDestructuring.js'
import restDestructuringCode from './examples/restDestructuring.js?raw'
import runArrayMap from './examples/arrayMap.js'
import arrayMapCode from './examples/arrayMap.js?raw'
import runArrayFilterFind from './examples/arrayFilterFind.js'
import arrayFilterFindCode from './examples/arrayFilterFind.js?raw'
import runArrayReduce from './examples/arrayReduce.js'
import arrayReduceCode from './examples/arrayReduce.js?raw'
import runFilterReduceChain from './examples/filterReduceChain.js'
import filterReduceChainCode from './examples/filterReduceChain.js?raw'
import runSomeEveryFindIndex from './examples/someEveryFindIndex.js'
import someEveryFindIndexCode from './examples/someEveryFindIndex.js?raw'
import runSortCopy from './examples/sortCopy.js'
import sortCopyCode from './examples/sortCopy.js?raw'
import runUpdateItemImmutable from './examples/updateItemImmutable.js'
import updateItemImmutableCode from './examples/updateItemImmutable.js?raw'
import runTruthyFalsy from './examples/truthyFalsy.js'
import truthyFalsyCode from './examples/truthyFalsy.js?raw'
import runEquality from './examples/equality.js'
import equalityCode from './examples/equality.js?raw'
import runTernaryAnd from './examples/ternaryAnd.js'
import ternaryAndCode from './examples/ternaryAnd.js?raw'
import runOrVsNullish from './examples/orVsNullish.js'
import orVsNullishCode from './examples/orVsNullish.js?raw'
import runOptionalChaining from './examples/optionalChaining.js'
import optionalChainingCode from './examples/optionalChaining.js?raw'
import runLogicalVsBitwise from './examples/logicalVsBitwise.js'
import logicalVsBitwiseCode from './examples/logicalVsBitwise.js?raw'
import runShortCircuit from './examples/shortCircuit.js'
import shortCircuitCode from './examples/shortCircuit.js?raw'
import runImportMoney from './examples/importMoney.js'
import importMoneyCode from './examples/importMoney.js?raw'
import runAsyncOrder from './examples/asyncOrder.js'
import asyncOrderCode from './examples/asyncOrder.js?raw'
import runAsyncAwait from './examples/asyncAwait.js'
import asyncAwaitCode from './examples/asyncAwait.js?raw'
import runAsyncReturnsPromise from './examples/asyncReturnsPromise.js'
import asyncReturnsPromiseCode from './examples/asyncReturnsPromise.js?raw'
import moneyCode from './examples/money.js?raw'
import fakeFetchCode from './examples/fakeFetch.js?raw'
import onClickCompareCode from './examples/onClickCompare.txt?raw'
import importSyntaxCode from './examples/importSyntax.txt?raw'

// Helper so each "js" example entry stays short
const js = (title, run, code, caption) => ({ title, caption, type: 'js', run, code })

export default {
  id: 'part00',
  number: 0,
  title: 'Modern JavaScript',
  topics: [
    {
      id: 'let-const',
      title: 'let and const',
      summary:
        'Use const by default and let when the value must change. Never use var. Both are block-scoped: they only exist inside the { } where they are declared.',
      notes: [
        'let can be reassigned, const cannot.',
        'Block scope: a variable declared inside if/for { } does not exist outside it.',
        'const does not freeze objects or arrays: their contents can still be changed (mutated).',
      ],
      examples: [
        js('Block scope and reassignment', runLetScope, letScopeCode),
        js(
          'const objects can still be mutated',
          runConstMutation,
          constMutationCode,
          'const locks the variable, not the value. This matters in React, where you should not mutate state even when it is const.'
        ),
      ],
    },
    {
      id: 'template-literals',
      title: 'Template literals',
      summary:
        'Strings in backticks can contain ${ } placeholders with any JavaScript expression, similar to "{$var}" in PHP double-quoted strings.',
      notes: [
        'Use backticks (`), not quotes.',
        'Anything inside ${ } is evaluated: variables, math, function calls, ternaries.',
        'Template literals can span multiple lines.',
      ],
      examples: [js('Inserting values and expressions', runTemplateLiterals, templateLiteralsCode)],
    },
    {
      id: 'arrow-functions',
      title: 'Arrow functions',
      summary:
        'Arrow functions are a short way to write functions. React code uses them everywhere, especially for event handlers and array callbacks.',
      notes: [
        'Without { } the expression after => is returned automatically (implicit return).',
        'With { } you need an explicit return.',
        'To return an object directly, wrap it in parentheses: () => ({ ... }).',
        'Functions are values: you can store them and pass them to other functions (callbacks).',
        'In JSX, pass a function to onClick, do not call it.',
      ],
      examples: [
        js('Short forms', runArrowShortForms, arrowShortFormsCode),
        js(
          'Returning an object needs parentheses',
          runArrowReturnObject,
          arrowReturnObjectCode,
          'Without parentheses the braces are treated as a function body, so the function returns undefined.'
        ),
        js('Functions as values and callbacks', runArrowCallbacks, arrowCallbacksCode),
        {
          title: 'onClick: pass a function, do not call it',
          caption: 'A preview of React. The arrow function delays the call until the click happens.',
          type: 'code',
          code: onClickCompareCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'objects',
      title: 'Object basics and shorthand',
      summary:
        'Objects store key: value pairs, much like associative arrays in PHP. Shorthand properties let you write { customer } instead of { customer: customer }.',
      notes: [
        'Read with dot notation (order.status) or brackets (order[key]).',
        'Reading a missing property gives undefined, not an error.',
        'Shorthand: when the key and variable name match, write the name once.',
      ],
      examples: [
        js('Creating, reading and changing objects', runObjectBasics, objectBasicsCode),
        js('Shorthand properties', runShorthandProps, shorthandPropsCode),
      ],
    },
    {
      id: 'destructuring',
      title: 'Destructuring',
      summary:
        'Destructuring unpacks values from objects (by name) or arrays (by position) into variables. React uses it for props and for useState.',
      notes: [
        'Object: const { customer, status } = order',
        'Rename: const { customer: buyer } = order',
        'Default: const { discount = 0 } = order (used only when the value is undefined)',
        'Array: const [qty, setQty] = useState(1) takes values by position.',
        'Parameters: function OrderRow({ customer, status }) { ... }',
      ],
      examples: [
        js('Object destructuring, renaming and defaults', runDestructureObject, destructureObjectCode),
        js(
          'Array destructuring',
          runDestructureArray,
          destructureArrayCode,
          'useState returns an array of two items, so array destructuring lets you name them whatever you like.'
        ),
        js('Destructuring in function parameters', runDestructureParams, destructureParamsCode),
      ],
    },
    {
      id: 'spread-rest',
      title: 'Spread and rest',
      summary:
        'The same ... syntax does two jobs. Spread unpacks an array or object into a new one. Rest collects the remaining items into a variable.',
      notes: [
        '[...arr] and { ...obj } make shallow copies. React state updates rely on this.',
        'With objects, later keys win: { ...order, status: "approved" } overrides status.',
        'Rest must be last: const [first, ...others] = list',
        'Rest parameters: function sum(...numbers) gives you an array.',
      ],
      examples: [
        js('Copying and combining arrays', runSpreadArrays, spreadArraysCode),
        js(
          'Copying an object with an override',
          runSpreadObjects,
          spreadObjectsCode,
          'Key order matters: put the spread first and your overrides after it.'
        ),
        js('Rest in destructuring and parameters', runRestDestructuring, restDestructuringCode),
      ],
    },
    {
      id: 'array-methods',
      title: 'Array methods',
      summary:
        'map, filter, find and reduce replace most foreach loops. They return new values instead of changing the original array, which is exactly what React needs.',
      notes: [
        'map: transform every item, returns an array of the same length.',
        'filter: keep matching items. find: first match or undefined.',
        'reduce: combine all items into one value, such as a total.',
        'some / every return true or false. findIndex returns a position or -1.',
        'sort() mutates the original array, so copy it first: [...arr].sort()',
        'Update one item without mutation: arr.map(x => x.id === id ? { ...x, changed } : x)',
      ],
      examples: [
        js('map: transform every item', runArrayMap, arrayMapCode),
        js('filter and find', runArrayFilterFind, arrayFilterFindCode),
        js(
          'reduce: a running total',
          runArrayReduce,
          arrayReduceCode,
          'Each step logs the accumulator so you can see how the total is built up.'
        ),
        js('Chaining filter, map and reduce', runFilterReduceChain, filterReduceChainCode),
        js('some, every and findIndex', runSomeEveryFindIndex, someEveryFindIndexCode),
        js(
          'sort mutates: copy first',
          runSortCopy,
          sortCopyCode,
          'Compare the "before" and "after" lines for each version.'
        ),
        js(
          'Updating one item without mutation',
          runUpdateItemImmutable,
          updateItemImmutableCode,
          'Only the changed item becomes a new object. The others are reused, which helps React see what changed.'
        ),
      ],
    },
    {
      id: 'conditionals',
      title: 'Conditionals',
      summary:
        'JavaScript has its own truthy/falsy rules and a few operators you will use constantly in JSX: ternary, &&, ?? and ?.',
      notes: [
        'Falsy: false, 0, "", null, undefined, NaN. Everything else is truthy, including [] and {}.',
        'Always use === and !== (strict comparison).',
        'Ternary: condition ? a : b',
        'a && b returns b only if a is truthy. Watch out for 0.',
        '|| falls back on any falsy value. ?? falls back only on null or undefined.',
        'a?.b returns undefined instead of throwing when a is null or undefined.',
      ],
      examples: [
        js('Truthy and falsy', runTruthyFalsy, truthyFalsyCode),
        js('=== vs ==', runEquality, equalityCode),
        js('Ternary and &&', runTernaryAnd, ternaryAndCode),
        js(
          '|| vs ??',
          runOrVsNullish,
          orVsNullishCode,
          'Use ?? when 0 or an empty string are valid values.'
        ),
        js('Optional chaining ?. with ??', runOptionalChaining, optionalChainingCode),
      ],
    },
    {
      id: 'logical-vs-bitwise',
      title: 'Logical vs bitwise operators',
      summary:
        '&& and || are logical operators that return one of their operands and can skip the right side. & and | are bitwise operators for binary numbers and are rarely what you want.',
      notes: [
        '&& and || short-circuit: the right side runs only if needed.',
        '& and | convert both sides to numbers and always evaluate both.',
        'A single & in a condition is almost always a typo.',
      ],
      examples: [
        js('&& and || vs & and |', runLogicalVsBitwise, logicalVsBitwiseCode),
        js(
          'Short-circuit evaluation',
          runShortCircuit,
          shortCircuitCode,
          'Watch which calls to check() are logged.'
        ),
      ],
    },
    {
      id: 'modules',
      title: 'Modules: import and export',
      summary:
        'Each file is a module. Only exported values can be imported elsewhere; everything else stays private to the file.',
      notes: [
        'Named exports: export function x(). Import with braces: import { x } from "./file.js"',
        'Default export: one per file. Import without braces and with any name.',
        'Rename an import with "as": import { addTax as withTax }',
        'Anything not exported is private to its module.',
        'Packages are imported by name: import { useState } from "react"',
      ],
      examples: [
        js('Importing from our own module', runImportMoney, importMoneyCode),
        {
          title: 'The module itself: money.js',
          caption: 'addThousandsDots has no export keyword, so it is private to this file.',
          type: 'code',
          code: moneyCode,
          lang: 'js',
        },
        { title: 'Import and export syntax overview', type: 'code', code: importSyntaxCode, lang: 'js' },
      ],
    },
    {
      id: 'async',
      title: 'Async code: Promises and async/await',
      summary:
        'Fetching data takes time, so JavaScript does not wait for it. A Promise represents a value that arrives later, and async/await lets you write code that waits for it in a readable way.',
      notes: [
        'Code after an async call keeps running; the result arrives later.',
        'await pauses the async function until the Promise resolves.',
        'Wrap await in try/catch to handle errors.',
        'fetch() does not throw on 404 or 500. Check response.ok yourself.',
        'An async function always returns a Promise.',
      ],
      examples: [
        js(
          'The normal code runs first',
          runAsyncOrder,
          asyncOrderCode,
          'fakeFetch waits about 800 ms, so line 2 is logged before line 3.'
        ),
        js('async/await with try/catch and response.ok', runAsyncAwait, asyncAwaitCode),
        js(
          'An async function always returns a Promise',
          runAsyncReturnsPromise,
          asyncReturnsPromiseCode,
          '"Async contagion": once a function uses await, it must be async, and its callers must await it too to get the value.'
        ),
        {
          title: 'The helper: fakeFetch.js',
          caption: 'A pretend fetch() with no network. Unknown URLs resolve with ok: false and status 404.',
          type: 'code',
          code: fakeFetchCode,
          lang: 'js',
        },
      ],
    },
  ],
}
