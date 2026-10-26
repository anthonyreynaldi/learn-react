import Stopwatch from './examples/Stopwatch.jsx'
import stopwatchCode from './examples/Stopwatch.jsx?raw'
import stateVsRefCode from './examples/stateVsRef.txt?raw'
import StaleRefReport from './examples/StaleRefReport.jsx'
import staleRefReportCode from './examples/StaleRefReport.jsx?raw'
import refDuringRenderCode from './examples/refDuringRender.txt?raw'
import FocusSearch from './examples/FocusSearch.jsx'
import focusSearchCode from './examples/FocusSearch.jsx?raw'
import ScrollToNewLine from './examples/ScrollToNewLine.jsx'
import scrollToNewLineCode from './examples/ScrollToNewLine.jsx?raw'
import RefAsProp from './examples/RefAsProp.jsx'
import refAsPropCode from './examples/RefAsProp.jsx?raw'
import forwardRefOldCode from './examples/forwardRefOld.txt?raw'
import MemoOrderTable from './examples/MemoOrderTable.jsx'
import memoOrderTableCode from './examples/MemoOrderTable.jsx?raw'
import UseMemoHeavy from './examples/UseMemoHeavy.jsx'
import useMemoHeavyCode from './examples/UseMemoHeavy.jsx?raw'
import consoleTimeCode from './examples/consoleTime.txt?raw'
import contextUseMemoCode from './examples/contextUseMemo.txt?raw'
import useCallbackExplainedCode from './examples/useCallbackExplained.txt?raw'
import UseIdFields from './examples/UseIdFields.jsx'
import useIdFieldsCode from './examples/UseIdFields.jsx?raw'
import ResponsiveOrders from './examples/ResponsiveOrders.jsx'
import responsiveOrdersCode from './examples/ResponsiveOrders.jsx?raw'
import useWindowWidthCode from './examples/hooks/useWindowWidth.js?raw'
import CustomerDetail from './examples/CustomerDetail.jsx'
import customerDetailCode from './examples/CustomerDetail.jsx?raw'
import useFetchCode from './examples/hooks/useFetch.js?raw'
import PreferredWarehouse from './examples/PreferredWarehouse.jsx'
import preferredWarehouseCode from './examples/PreferredWarehouse.jsx?raw'
import useLocalStorageCode from './examples/hooks/useLocalStorage.js?raw'
import DebouncedSearch from './examples/DebouncedSearch.jsx'
import debouncedSearchCode from './examples/DebouncedSearch.jsx?raw'
import useDebouncedValueCode from './examples/hooks/useDebouncedValue.js?raw'
import SharedLogicNotState from './examples/SharedLogicNotState.jsx'
import sharedLogicNotStateCode from './examples/SharedLogicNotState.jsx?raw'

export default {
  id: 'part11',
  number: 11,
  title: 'More Hooks',
  topics: [
    {
      id: 'use-ref-basics',
      title: 'useRef basics',
      summary:
        'useRef gives a component a box, { current: … }, that it keeps for its whole life. You can read and change ref.current freely, and changing it does not re-render. Use it for values the screen doesn’t show.',
      notes: [
        'const timerRef = useRef(null) creates a box. Read and write timerRef.current.',
        'Changing ref.current does NOT re-render the component.',
        'React returns the same box on every render, so the value survives re-renders (a normal variable would reset).',
        'If it is shown on screen, use state. If you only need it later (timer id, DOM element, latest value), use a ref.',
      ],
      examples: [
        {
          title: 'Stopwatch: times in state, interval id in a ref',
          type: 'react',
          component: Stopwatch,
          code: stopwatchCode,
        },
        {
          title: 'State vs ref',
          type: 'code',
          code: stateVsRefCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'stale-values-ref',
      title: 'Fixing stale values with a ref',
      summary:
        'A callback that runs later (a timer, a request) sees the state snapshot from the render that created it. A ref is the same box in every render, so reading ref.current later gives the latest value.',
      notes: [
        'State inside a callback is a snapshot (Parts 5 and 7).',
        'ref.current is read when the code runs, not when the callback was created.',
        'Keep the ref in sync where the state changes, e.g. in the same event handler.',
        'Use an updater function when you only need to UPDATE state with the latest value. Use a ref when you need to READ the latest value.',
      ],
      examples: [
        {
          title: 'Snapshot vs ref',
          caption:
            'Click both "Report" buttons, then +1 several times within 3 seconds. The snapshot message shows the count from when you clicked; the ref message shows the latest count.',
          type: 'react',
          component: StaleRefReport,
          code: staleRefReportCode,
        },
      ],
    },
    {
      id: 'refs-during-render',
      title: "Don't read or write refs during render",
      summary:
        'Refs belong in event handlers and effects. Reading or writing them while rendering makes the output depend on something React doesn’t track, so the screen can show stale or wrong values.',
      notes: [
        'Changing a ref doesn’t re-render, so a value read from it during render goes stale.',
        'StrictMode and concurrent rendering may call your component more often than the screen updates.',
        'If a value must appear on screen, it belongs in state.',
      ],
      examples: [
        {
          title: 'The render-count ref and why it is wrong',
          type: 'code',
          code: refDuringRenderCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'refs-to-dom',
      title: 'Refs to DOM elements',
      summary:
        'Pass a ref to a JSX element with ref={myRef}, and React puts the real DOM element into myRef.current. Use it for things React has no prop for: focus, scrolling, measuring.',
      notes: [
        'During render ref.current is still null. React sets it in the commit step, before effects run.',
        'Use the DOM element in event handlers and effects, never during render.',
        'Refs are an escape hatch. Use them for focus, scroll and size, never to change text, classes or children; that is React’s job.',
        'A ref callback, ref={(element) => …}, runs when the element is attached. It is handy for lists, where one useRef is not enough.',
      ],
      examples: [
        {
          title: 'Focus search (and auto-focus on mount)',
          caption: 'The input was focused automatically when this topic opened. Click elsewhere, then use the button.',
          type: 'react',
          component: FocusSearch,
          code: focusSearchCode,
        },
        {
          title: 'Scroll to and focus a new order line',
          caption: 'Click "+ Add line" several times: the box scrolls to the new line and its product input gets focus.',
          type: 'react',
          component: ScrollToNewLine,
          code: scrollToNewLineCode,
        },
      ],
    },
    {
      id: 'ref-as-prop',
      title: 'Passing a ref to your own component',
      summary:
        'In React 19, ref is an ordinary prop for function components. Your component receives it and passes it on to the DOM element inside, so the parent can focus or scroll it.',
      notes: [
        'function TextField({ label, ref }) { return <input ref={ref} /> }',
        'The parent uses it like any element: <TextField ref={customerRef} />.',
        'Older code (React 18 and earlier) uses forwardRef. You will still see it in libraries.',
        'Expose the DOM element only when the parent really needs it (focus, scroll).',
      ],
      examples: [
        {
          title: 'TextField receives ref as a prop',
          type: 'react',
          component: RefAsProp,
          code: refAsPropCode,
        },
        {
          title: 'The older forwardRef syntax',
          type: 'code',
          code: forwardRefOldCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'memo',
      title: 'memo',
      summary:
        'memo(Component) lets React skip re-rendering a component when its props haven’t changed. It only helps if the props really stay the same, which often needs useMemo and useCallback too.',
      notes: [
        'Memoization = remembering a result and reusing it while the inputs are unchanged.',
        'memo compares each prop with Object.is (Part 7). One changed prop means the component re-renders.',
        'Arrays, objects and functions created during render are new every time, so they always count as changed.',
        'useMemo keeps the same array or object; useCallback keeps the same function. Together they make memo effective.',
        'memo only skips re-renders caused by the PARENT. A component’s own state or context changes still re-render it.',
      ],
      examples: [
        {
          title: 'OrderTable with 300 rows: three versions',
          caption:
            'For each version, toggle "Help" and watch the "table rendered at" time. A and B re-render the table every time. Only C skips it. In every version, typing still re-renders the table, because the filtered list really changes.',
          type: 'react',
          component: MemoOrderTable,
          code: memoOrderTableCode,
        },
      ],
    },
    {
      id: 'use-memo',
      title: 'useMemo',
      summary:
        'useMemo(() => calculate(a, b), [a, b]) caches the result of a calculation and only recalculates when a dependency changed. Use it for expensive calculations and for keeping objects stable.',
      notes: [
        'It runs the function on the first render, then returns the cached value until a dependency changes.',
        'It is an optimization only: the code must work correctly without it. React may also throw the cache away.',
        'Measure first. Most calculations take well under a millisecond and don’t need it.',
        'Also useful to keep an object or array the same for memo children or as a context value.',
      ],
      examples: [
        {
          title: 'Filtering and sorting 20,000 orders',
          caption:
            'Click "Unrelated re-render" with useMemo on: the "finished at" time doesn’t change, so the cached result was reused. Untick useMemo and click again: it recalculates every time. Typing always recalculates, because search is a dependency.',
          type: 'react',
          component: UseMemoHeavy,
          code: useMemoHeavyCode,
        },
        {
          title: 'Measuring with console.time',
          type: 'code',
          code: consoleTimeCode,
          lang: 'js',
        },
        {
          title: 'A context value stabilized with useMemo',
          type: 'code',
          code: contextUseMemoCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'use-callback',
      title: 'useCallback',
      summary:
        'useCallback(fn, deps) returns the same function between renders until a dependency changes. It is useMemo for functions, mainly used when passing callbacks to memo children.',
      notes: [
        'useCallback(fn, deps) is the same as useMemo(() => fn, deps).',
        'Without it, every render creates a new function, which breaks memo on the child.',
        'Use the updater form (setX(prev => …)) so the callback reads nothing from the render, and the dependency array can be empty.',
        'State setters and dispatch never change. They never need to be dependencies.',
      ],
      examples: [
        {
          title: 'useCallback explained',
          type: 'code',
          code: useCallbackExplainedCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'when-to-memoize',
      title: 'When to use memoization',
      summary:
        'memo, useMemo and useCallback make code harder to read and only pay off in specific cases. Measure a real slowdown first, then memoize exactly where it helps.',
      notes: [
        'Measure first: React DevTools → Profiler shows which components rendered and how long each took.',
        'Measure in a production build. Development mode and StrictMode are slower.',
        'Good candidates: slow lists or charts that re-render often with the same props, and expensive calculations.',
        'Costs of overusing: more code, dependency arrays to maintain, memory for caches, and bugs from missing dependencies.',
        'Often a better fix: move state down (Part 10), or pass slow parts as children so they aren’t re-created.',
        'React Compiler (an optional build step) adds memoization automatically, so manual memo/useMemo/useCallback is needed much less.',
      ],
      examples: [],
    },
    {
      id: 'use-id',
      title: 'useId',
      summary:
        'useId generates a unique, stable id for each component instance. Use it to connect labels and error messages to inputs in reusable components.',
      notes: [
        'const id = useId() gives every instance its own id, even when the component is used many times.',
        'Use it for htmlFor/id pairs and aria-describedby links between an input and its error text.',
        'Derive related ids from it: `${id}-error`.',
        'Not for list keys. Keys must come from your data (database ids).',
      ],
      examples: [
        {
          title: 'One TextField, three unique ids',
          type: 'react',
          component: UseIdFields,
          code: useIdFieldsCode,
        },
      ],
    },
    {
      id: 'custom-hooks',
      title: 'Custom hooks',
      summary:
        'A custom hook is a function whose name starts with "use" and that calls other hooks. It packs reusable stateful logic (fetching, listeners, storage, debouncing) behind a simple call.',
      notes: [
        'The name must start with "use", so React and the linter know the rules of hooks apply.',
        'Rules of hooks still apply inside and around it: top level only, never in conditions or loops.',
        'Hooks combine: useFetch uses useState and useEffect, and a hook can use other custom hooks.',
        'Return whatever is convenient: a value (width), a [value, setter] pair, or an object ({ data, error, loading }).',
        'Renaming while destructuring: const { data: customer } = useFetch(url) names the data property "customer".',
      ],
      examples: [
        {
          title: 'useWindowWidth: cards below 768px, a table above',
          caption: 'Resize the browser window (or open DevTools beside the page) to cross 768px.',
          type: 'react',
          component: ResponsiveOrders,
          code: responsiveOrdersCode,
        },
        { title: 'hooks/useWindowWidth.js', type: 'code', code: useWindowWidthCode, lang: 'js' },
        {
          title: 'useFetch: customer details from public/handbook-data',
          caption:
            'Customer 99 doesn’t exist. Vite answers missing files with index.html (status 200), so useFetch also checks that the response is JSON.',
          type: 'react',
          component: CustomerDetail,
          code: customerDetailCode,
        },
        { title: 'hooks/useFetch.js', type: 'code', code: useFetchCode, lang: 'js' },
        {
          title: 'useLocalStorage: a preference that survives refresh',
          type: 'react',
          component: PreferredWarehouse,
          code: preferredWarehouseCode,
        },
        { title: 'hooks/useLocalStorage.js', type: 'code', code: useLocalStorageCode, lang: 'js' },
        {
          title: 'useDebouncedValue: search after you stop typing',
          caption: 'Type "maju bersama" at normal speed: many keystrokes, but only one or two requests.',
          type: 'react',
          component: DebouncedSearch,
          code: debouncedSearchCode,
        },
        { title: 'hooks/useDebouncedValue.js', type: 'code', code: useDebouncedValueCode, lang: 'js' },
      ],
    },
    {
      id: 'hooks-share-logic',
      title: 'Custom hooks share logic, not state',
      summary:
        'Every component that calls a custom hook gets its own, independent state. Two components using useLocalStorage with the same key don’t see each other’s changes.',
      notes: [
        'A custom hook is just a function: each call runs its own useState.',
        'Like a Laravel trait: the trait’s code is copied into every class that uses it, but each object has its own properties.',
        'To truly SHARE state, lift it up (Part 10) or put it in context (Part 10).',
      ],
      examples: [
        {
          title: 'Two editors, same key, separate state',
          caption:
            'Type in Editor A: Editor B doesn’t change. Both save to the same localStorage key, so after a refresh (or the ↺ remount button) both show the last saved text.',
          type: 'react',
          component: SharedLogicNotState,
          code: sharedLogicNotStateCode,
        },
      ],
    },
    {
      id: 'other-hooks',
      title: 'Other hooks',
      summary: 'A short tour of hooks you will meet later or only need in special cases.',
      notes: [
        'useLayoutEffect: like useEffect, but runs before the browser paints. Use it only for measuring layout before showing something (e.g. tooltip position).',
        'useTransition: marks a state update as non-urgent so typing stays responsive while a slow update renders. Gives you an isPending flag.',
        'useDeferredValue: like a built-in debounce for rendering. Shows the old value while the new one renders in the background.',
        'useSyncExternalStore: subscribes to a store outside React (browser APIs, external libraries) safely.',
        'useActionState (React 19): manages a form action’s result and pending state (Part 13).',
        'useOptimistic (React 19): shows an optimistic result (e.g. "approved") immediately while the request is still running (Part 13).',
        'use (React 19): reads a Promise or a context, and can be called conditionally (Part 13).',
      ],
      examples: [],
    },
  ],
}
