import effectsVsHandlersCode from './examples/effectsVsHandlers.txt?raw'
import DocumentTitle from './examples/DocumentTitle.jsx'
import documentTitleCode from './examples/DocumentTitle.jsx?raw'
import effectTimelineCode from './examples/effectTimeline.txt?raw'
import DependencyArray from './examples/DependencyArray.jsx'
import dependencyArrayCode from './examples/DependencyArray.jsx?raw'
import objectDependencyTrapCode from './examples/objectDependencyTrap.txt?raw'
import LiveClock from './examples/LiveClock.jsx'
import liveClockCode from './examples/LiveClock.jsx?raw'
import WindowWidth from './examples/WindowWidth.jsx'
import windowWidthCode from './examples/WindowWidth.jsx?raw'
import startStopPairsCode from './examples/startStopPairs.txt?raw'
import StrictModeEffect from './examples/StrictModeEffect.jsx'
import strictModeEffectCode from './examples/StrictModeEffect.jsx?raw'
import buggyIntervalCode from './examples/buggyInterval.txt?raw'
import OrderListFetch from './examples/OrderListFetch.jsx'
import orderListFetchCode from './examples/OrderListFetch.jsx?raw'
import FetchWithControls from './examples/FetchWithControls.jsx'
import fetchWithControlsCode from './examples/FetchWithControls.jsx?raw'
import fakeApiCode from './examples/fakeApi.js?raw'
import asyncEffectWrongCode from './examples/asyncEffectWrong.txt?raw'
import RaceCondition from './examples/RaceCondition.jsx'
import raceConditionCode from './examples/RaceCondition.jsx?raw'
import abortControllerCode from './examples/abortController.txt?raw'
import laravelRouteCode from './examples/laravelRoute.txt?raw'
import viteProxyCode from './examples/viteProxy.txt?raw'
import proxyDiagramCode from './examples/proxyDiagram.txt?raw'
import derivedNotEffectCode from './examples/derivedNotEffect.txt?raw'
import handlerNotEffectCode from './examples/handlerNotEffect.txt?raw'
import keyNotEffectCode from './examples/keyNotEffect.txt?raw'
import EffectVsDerived from './examples/EffectVsDerived.jsx'
import effectVsDerivedCode from './examples/EffectVsDerived.jsx?raw'
import useQueryShapeCode from './examples/useQueryShape.txt?raw'

export default {
  id: 'part08',
  number: 8,
  title: 'Side Effects and Data Fetching',
  topics: [
    {
      id: 'effects-vs-handlers',
      title: 'Effects vs event handlers',
      summary:
        'Ask "why does this code run?". If it runs because the user did something, put it in an event handler. If it runs because the component is being displayed, put it in an effect.',
      notes: [
        'User action (click, submit, typing) → event handler. Example: POST an approval when Approve is clicked.',
        'Component being on screen → effect. Example: load the orders when the order list appears.',
        'Effects synchronize a component with something outside React: the network, timers, the browser window, document.title.',
        'When in doubt, prefer an event handler. Effects are an escape hatch, not the default.',
      ],
      examples: [
        {
          title: 'POST in a click handler vs loading data in an effect',
          type: 'code',
          code: effectsVsHandlersCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'use-effect-basics',
      title: 'useEffect basics',
      summary:
        'useEffect(fn, deps) runs your function after React has committed the changes to the DOM and the browser has painted them. That is the place for side effects, which must never run during render.',
      notes: [
        'The effect runs AFTER commit and paint, so it never delays showing the UI.',
        'Side effects cannot go in the render body: render must stay pure (Part 7).',
        'Return a cleanup function to undo what the effect did. React calls it before the next run and when the component unmounts.',
        'An effect can only run code. It cannot return JSX.',
      ],
      examples: [
        {
          title: 'Updating document.title',
          caption: 'Click the button and watch the browser tab title. When you leave this topic, the cleanup restores the original title.',
          type: 'react',
          component: DocumentTitle,
          code: documentTitleCode,
        },
        {
          title: 'Timeline: render → commit → paint → effect',
          type: 'code',
          code: effectTimelineCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'dependency-array',
      title: 'The dependency array',
      summary:
        'The second argument of useEffect tells React when to run the effect again. No array means after every render, [] means only on mount, and [a, b] means when a or b changed.',
      notes: [
        'useEffect(fn): after every render of the component.',
        'useEffect(fn, []): once, after the first render (mount).',
        'useEffect(fn, [status]): on mount, and again whenever status changed since the last render (compared with Object.is).',
        'List every prop, state or variable from the component that the effect uses. The ESLint rule react-hooks/exhaustive-deps checks this for you.',
        'Objects and arrays created during render are new every time, so as dependencies they make the effect run on every render.',
        'An effect with no array that sets state causes an endless loop: set state → re-render → effect → set state → …',
      ],
      examples: [
        {
          title: 'No array vs [] vs [status]',
          caption:
            'Click "Clear log" first: on load, every effect appears twice because StrictMode mounts twice in development (see "StrictMode and effects"). Then click Count: only "no array" runs. Change the status: "no array" and "[status]" run. "[]" never runs again. The memo comment in the code explains how this demo avoids an endless loop.',
          type: 'react',
          component: DependencyArray,
          code: dependencyArrayCode,
        },
        {
          title: 'The object-dependency trap and the fix',
          type: 'code',
          code: objectDependencyTrapCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'cleanup',
      title: 'Cleanup',
      summary:
        'If an effect starts something (a timer, a listener, a connection), it must return a cleanup function that stops it. React runs the cleanup before re-running the effect and when the component unmounts.',
      notes: [
        'Pairs: setInterval ↔ clearInterval, addEventListener ↔ removeEventListener, connect ↔ disconnect.',
        'removeEventListener needs the SAME function that was added, so define the handler inside the effect.',
        'Memory leak: something that keeps running and holding memory after nobody needs it anymore, like a timer for a clock that is no longer on screen.',
        'Cleanup runs before every re-run of the effect too, not only on unmount.',
      ],
      examples: [
        {
          title: 'LiveClock: setInterval + clearInterval',
          caption: 'Hide the clock: its cleanup clears the interval. Show it again: a fresh clock starts a new interval.',
          type: 'react',
          component: LiveClock,
          code: liveClockCode,
        },
        {
          title: 'Window width: addEventListener + removeEventListener',
          type: 'react',
          component: WindowWidth,
          code: windowWidthCode,
        },
        {
          title: 'Start ↔ stop pairs',
          type: 'code',
          code: startStopPairsCode,
          lang: 'js',
        },
      ],
    },
    {
      id: 'strict-mode-effects',
      title: 'StrictMode and effects',
      summary:
        'In development, StrictMode mounts every component, immediately unmounts it, and mounts it again. A correct cleanup makes this invisible to the user; a missing cleanup becomes an obvious bug.',
      notes: [
        'Development only: mount → cleanup → mount. Production runs the effect once.',
        'It is a stress test: if your app breaks after mount → unmount → mount, the cleanup is missing or wrong.',
        'Don’t "fix" it by removing StrictMode. Fix the cleanup.',
        'Fetching twice in development is normal. The ignore flag (see "Race conditions") makes the first response harmless.',
      ],
      examples: [
        {
          title: 'Watching effect and cleanup calls',
          caption:
            'On first load in development (npm run dev) the log shows "effect ran → cleanup ran → effect ran": StrictMode’s mount → cleanup → mount. In a production build it is just "effect ran". Unmount shows "cleanup ran". Mount again repeats the double run, because StrictMode tests every new mount.',
          type: 'react',
          component: StrictModeEffect,
          code: strictModeEffectCode,
        },
        {
          title: 'BUGGY: an interval without cleanup',
          caption:
            'Not rendered live on purpose. Without clearInterval, StrictMode’s double mount already leaves two timers running, and every hide/show adds another. They keep calling setTime forever.',
          type: 'code',
          code: buggyIntervalCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'fetching-data',
      title: 'Fetching data',
      summary:
        'Load data in an effect: keep loading, error and data in state, check response.ok, and handle every state in the JSX: loading, error, empty and data.',
      notes: [
        'Three pieces of state: data, loading and error. Show each case with early returns.',
        'fetch only rejects on network failures. A 404 or 500 still resolves, so always check response.ok.',
        'try / catch / finally: finally turns loading off after both success and failure.',
        'The effect function can’t be async. Define an async function inside it and call it.',
        'A dependency like reloadCount lets a button trigger a refetch.',
      ],
      examples: [
        {
          title: 'OrderList with the real fetch()',
          caption:
            'This uses a real request to /handbook-data/orders.json (a static file in public/). Open DevTools → Network and remount (↺) to see it. In development you will see it twice because of StrictMode.',
          type: 'react',
          component: OrderListFetch,
          code: orderListFetchCode,
        },
        {
          title: 'Delay, server error and Reload (fakeFetch)',
          caption: 'Try 4s, then tick "Simulate server error", then Reload. Every change runs the effect again.',
          type: 'react',
          component: FetchWithControls,
          code: fetchWithControlsCode,
        },
        {
          title: 'fakeApi.js: the fake server used above',
          type: 'code',
          code: fakeApiCode,
          lang: 'js',
        },
        {
          title: 'Why useEffect(async () => …) is wrong',
          type: 'code',
          code: asyncEffectWrongCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'race-conditions',
      title: 'Race conditions',
      summary:
        'When requests overlap, an old slow response can arrive after a newer fast one and overwrite it. The cleanup function fixes this by ignoring (or aborting) out-of-date requests.',
      notes: [
        'Responses don’t always arrive in the order the requests were sent.',
        'Fix: let ignore = false at the start of the effect, set it to true in the cleanup, and only set state if !ignore.',
        'This works because React runs the previous effect’s cleanup before running the new effect.',
        'AbortController goes one step further and actually cancels the old request.',
      ],
      examples: [
        {
          title: 'Buggy vs fixed: customer 1 (3s) then customer 2 (0.5s)',
          caption:
            'In each panel, click Customer 1, then quickly Customer 2. After 3 seconds the buggy panel shows customer 1 although customer 2 is selected. The fixed panel keeps showing customer 2.',
          type: 'react',
          component: RaceCondition,
          code: raceConditionCode,
        },
        {
          title: 'Alternative: AbortController',
          type: 'code',
          code: abortControllerCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'connecting-to-laravel',
      title: 'Connecting to Laravel',
      summary:
        'In development, React runs on Vite (port 5173) and Laravel on port 8000. A Vite proxy forwards /api requests to Laravel, so the browser sees one origin and CORS never comes up.',
      notes: [
        'Origin = protocol + host + port. http://localhost:5173 and http://localhost:8000 are different origins.',
        'CORS: browsers block a page from reading responses from another origin unless that server explicitly allows it with CORS headers.',
        'The Vite proxy makes the browser call its own origin (5173). Vite forwards /api to Laravel server-to-server, where CORS does not apply.',
        'With the proxy, React code just uses relative URLs: fetch("/api/orders").',
        'Production setups (same domain, or CORS configured in Laravel) are covered in Part 12.',
      ],
      examples: [
        {
          title: 'routes/api.php returning orders as JSON',
          type: 'code',
          code: laravelRouteCode,
          lang: 'php',
        },
        {
          title: 'vite.config.js: proxy /api to Laravel',
          type: 'code',
          code: viteProxyCode,
          lang: 'js',
        },
        {
          title: 'Browser → Vite (5173) → Laravel (8000)',
          type: 'code',
          code: proxyDiagramCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'you-might-not-need-an-effect',
      title: 'You might not need an effect',
      summary:
        'Many effects are unnecessary. If you can calculate a value during render, handle it in an event handler, or reset it with a key, do that instead: less code, fewer renders, fewer bugs.',
      notes: [
        'Derived values: calculate during render instead of effect + state.',
        'User actions: run the logic in the event handler, not in an effect watching a state flag.',
        'Resetting state when a prop changes: use a key (Part 7) instead of an effect that clears it.',
        'Effects are for synchronizing with things OUTSIDE React (network, timers, browser APIs).',
      ],
      examples: [
        {
          title: 'Case 1: derived value instead of effect + state',
          type: 'code',
          code: derivedNotEffectCode,
          lang: 'jsx',
        },
        {
          title: 'Case 2: event handler instead of state + effect',
          type: 'code',
          code: handlerNotEffectCode,
          lang: 'jsx',
        },
        {
          title: 'Case 3: key instead of an effect that resets state',
          type: 'code',
          code: keyNotEffectCode,
          lang: 'jsx',
        },
        {
          title: 'Effect-based filter vs derived filter',
          caption:
            'Type in the search box. Both lists start rendering at the same moment, but the effect version renders AGAIN after its effect runs, so its "rendered at" time is a few milliseconds later. That extra render (with the old list first) happens on every keystroke.',
          type: 'react',
          component: EffectVsDerived,
          code: effectVsDerivedCode,
        },
      ],
    },
    {
      id: 'real-world-data-fetching',
      title: 'Real-world data fetching',
      summary:
        'useEffect + fetch is the foundation, but real apps also need caching, refetching and retries. Libraries like TanStack Query handle all of that for you.',
      notes: [
        'Caching: going back to a page should show the data you already loaded, instantly.',
        'Refetching: refresh stale data when the window regains focus or after a mutation.',
        'Retries: automatically try again when a request fails because of a network glitch.',
        'Deduplication: ten components asking for the same data should cause one request.',
        'TanStack Query does all of this, plus race-condition handling. Covered in Part 13.',
        'Learn the useEffect version first, so you understand what the library does for you.',
      ],
      examples: [
        {
          title: 'The shape of useQuery (Part 13)',
          caption: 'For reading only: TanStack Query is not installed in this project.',
          type: 'code',
          code: useQueryShapeCode,
          lang: 'jsx',
        },
      ],
    },
  ],
}
