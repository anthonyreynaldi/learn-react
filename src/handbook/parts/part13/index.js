import tsFormatRupiahCode from './examples/tsFormatRupiah.txt?raw'
import tsOrderTypeCode from './examples/tsOrderType.txt?raw'
import tsOrderRowPropsCode from './examples/tsOrderRowProps.txt?raw'
import tsVsPhpCode from './examples/tsVsPhp.txt?raw'
import TanStackOrders from './examples/TanStackOrders.jsx'
import tanStackOrdersCode from './examples/TanStackOrders.jsx?raw'
import fakeOrdersApiCode from './examples/fakeOrdersApi.js?raw'
import manualVsQueryCode from './examples/manualVsQuery.txt?raw'
import rhfZodCode from './examples/rhfZod.txt?raw'
import useActionStateCode from './examples/useActionState.txt?raw'
import zustandCartCode from './examples/zustandCart.txt?raw'
import ErrorBoundaryDemo from './examples/ErrorBoundaryDemo.jsx'
import errorBoundaryDemoCode from './examples/ErrorBoundaryDemo.jsx?raw'
import reactErrorBoundaryCode from './examples/reactErrorBoundary.txt?raw'
import LazyDemo from './examples/LazyDemo.jsx'
import lazyDemoCode from './examples/LazyDemo.jsx?raw'
import salesChartCode from './examples/SalesChart.lazy.jsx?raw'
import PortalDemo from './examples/PortalDemo.jsx'
import portalDemoCode from './examples/PortalDemo.jsx?raw'
import vitestReducerCode from './examples/vitestReducer.txt?raw'
import rtlComponentCode from './examples/rtlComponent.txt?raw'
import cheatSheetCode from './examples/cheatSheet.txt?raw'

export default {
  id: 'part13',
  number: 13,
  title: 'Where to Go Next',
  topics: [
    {
      id: 'typescript',
      title: 'TypeScript',
      summary:
        'TypeScript is JavaScript with types. Your editor checks props, function arguments and object shapes while you type, so many bugs never reach the browser.',
      notes: [
        'Catches typos in props and properties (onAprove, totl), wrong argument types, and missing null checks before you run anything.',
        'Autocomplete everywhere: your editor knows every field of an Order and every prop of a component.',
        'Like PHP type hints, but checked at build time instead of at runtime, and much more expressive (unions such as \'pending\' | \'approved\').',
        'New project: npm create vite@latest my-app -- --template react-ts.',
        'Existing project: rename files to .ts/.tsx one at a time. TypeScript and JavaScript files can live side by side.',
        'The browser never sees TypeScript: the types are removed during the build.',
      ],
      examples: [
        { title: 'A typed formatRupiah', type: 'code', code: tsFormatRupiahCode, lang: 'ts' },
        { title: 'An Order type with a status union', type: 'code', code: tsOrderTypeCode, lang: 'ts' },
        { title: 'Typed props for OrderRow', type: 'code', code: tsOrderRowPropsCode, lang: 'tsx' },
        { title: 'PHP type hints vs TypeScript', type: 'code', code: tsVsPhpCode, lang: 'php' },
      ],
    },
    {
      id: 'tanstack-query',
      title: 'TanStack Query',
      summary:
        'TanStack Query manages server state: data that lives in Laravel and is only borrowed by the browser. It caches it, shares it, refetches it in the background, and handles loading, errors and race conditions for you.',
      notes: [
        'Server state: data owned by the server (orders, customers). It can change without your app knowing, so it needs caching and refreshing, unlike UI state such as "is the sidebar open".',
        'Query key: ["orders", { status }] identifies the data. Same key → same cached data; a different status → a separate cache entry.',
        'Caching: unmount and remount a component and the cached data shows instantly, while a background refetch checks for updates (stale-while-revalidate).',
        'Deduplication: ten components using the same key while it loads cause ONE request.',
        'Cancellation: the queryFn receives a signal. Pass it to fetch(url, { signal }) so outdated requests are aborted.',
        'Invalidation: after a mutation, invalidateQueries({ queryKey: ["orders"] }) marks matching queries stale and refetches the ones on screen.',
        'isPending = no data yet (first load). isFetching = a request is running (including background refetches).',
      ],
      examples: [
        {
          title: 'Orders with useQuery and useMutation',
          caption:
            'Watch the request counter. Switch status and back: the earlier list shows instantly from the cache while isFetching refreshes it. Hide and show the list: the data appears immediately (isPending stays false). Approve an order: ["orders"] is invalidated and refetched.',
          type: 'react',
          component: TanStackOrders,
          code: tanStackOrdersCode,
        },
        { title: 'fakeOrdersApi.js', type: 'code', code: fakeOrdersApiCode, lang: 'js' },
        { title: 'Part 8’s manual version vs useQuery', type: 'code', code: manualVsQueryCode, lang: 'jsx' },
      ],
    },
    {
      id: 'form-tools',
      title: 'Form tools',
      summary:
        'For large forms, React Hook Form handles field state and validation with little code, and Zod describes the rules like a Laravel rules array. React 19 also has built-in form actions.',
      notes: [
        'React Hook Form: register() connects inputs (uncontrolled, Part 9) so typing doesn’t re-render the whole form. It also tracks errors, isSubmitting and dirty fields.',
        'Zod: a schema of rules, like Laravel’s $rules array. One schema can validate the form and describe the data shape.',
        'Laravel’s 422 errors still matter: setError(field, { message }) shows them on the right fields.',
        'React 19 <form action={fn}> + useActionState(action, initialState): the action receives FormData, and you get [state, formAction, isPending].',
        'useOptimistic: show the expected result immediately (e.g. "approved") while the request is still running, and roll back if it fails.',
        'useFormStatus: lets a component inside a <form>, like a SubmitButton, read whether its form is pending, without props.',
      ],
      examples: [
        { title: 'React Hook Form + Zod', type: 'code', code: rhfZodCode, lang: 'jsx' },
        { title: 'React 19: useActionState and <form action>', type: 'code', code: useActionStateCode, lang: 'jsx' },
      ],
    },
    {
      id: 'zustand',
      title: 'Zustand',
      summary:
        'Zustand is a small library for global client state: a store created once and used from any component with a hook. No provider, little boilerplate.',
      notes: [
        'create() returns a hook. Components call it with a selector and re-render only when the selected value changes.',
        'Compared with context (Part 10): no Provider and no "every consumer re-renders" problem. Context is still fine for rarely changing values (user, theme).',
        'Compared with Redux: the same idea (a central store, immutable updates) with much less ceremony. Redux Toolkit is still common in large existing codebases.',
        'Use it for client state only (cart, UI preferences, wizard steps). Server data belongs in TanStack Query.',
      ],
      examples: [{ title: 'A cart store and a component selecting from it', type: 'code', code: zustandCartCode, lang: 'jsx' }],
    },
    {
      id: 'business-building-blocks',
      title: 'Building blocks for business apps',
      summary: 'Most ERP-style screens are tables, forms, filters and charts. These tools save the most time.',
      notes: [
        'Tailwind CSS: utility classes for styling (this handbook’s shell uses it). Fast, consistent, no separate CSS files to name.',
        'Component libraries: shadcn/ui (copy-paste components on Tailwind, you own the code), MUI (Material Design), Mantine (batteries included, many hooks), Ant Design (dense, enterprise-style tables and forms).',
        'Data grids: TanStack Table (headless: sorting, filtering, grouping logic, your own markup) or AG Grid (a full-featured spreadsheet-like grid, with paid enterprise features).',
        'Charts: Recharts (React components for line, bar and pie charts).',
        'Numbers and dates: the built-in Intl APIs (toLocaleString, Intl.NumberFormat, Intl.DateTimeFormat for id-ID) and date-fns for date arithmetic.',
        'Big data: let PostgreSQL do the work. Paginate with Laravel’s paginate() and aggregate (SUM, GROUP BY) in SQL. Never send 100,000 rows to the browser to filter there.',
      ],
      examples: [],
    },
    {
      id: 'error-boundaries',
      title: 'Error boundaries',
      summary:
        'An error boundary catches errors thrown while rendering its children and shows a fallback instead. One crashed widget no longer takes the whole page down.',
      notes: [
        'Without a boundary, an error during render unmounts the WHOLE app: a blank page.',
        'Wrap independent areas (widgets, panels, routes) so a failure stays local.',
        'Boundaries catch errors during rendering. Errors in event handlers and async code need try/catch.',
        'They must be class components (getDerivedStateFromError). In practice, use the react-error-boundary package.',
        'Report caught errors (componentDidCatch / onError), e.g. to a Laravel logging endpoint.',
      ],
      examples: [
        {
          title: 'A widget that breaks, and a page that keeps working',
          caption: 'Click "Break this widget": only that widget shows the error. The other widget still works. "Try again" renders it fresh.',
          type: 'react',
          component: ErrorBoundaryDemo,
          code: errorBoundaryDemoCode,
        },
        { title: 'Using react-error-boundary', type: 'code', code: reactErrorBoundaryCode, lang: 'jsx' },
      ],
    },
    {
      id: 'lazy-suspense',
      title: 'Lazy loading and Suspense',
      summary:
        'lazy(() => import(\'./SalesChart.jsx\')) splits a component into its own file that is downloaded only when it is first rendered. <Suspense fallback> shows something in the meantime.',
      notes: [
        'Code splitting: the first page load downloads less JavaScript, and rarely used screens load on demand.',
        'Typical candidates: whole routes (reports, admin pages) and heavy widgets (charts, PDF viewers, rich text editors).',
        'lazy() must be called at module level, never inside a component.',
        'Suspense can wrap several lazy components and show one fallback for all of them.',
        'After the first load the module is cached, so showing it again is instant.',
      ],
      examples: [
        {
          title: 'Load the sales chart on demand',
          caption:
            'Click "Show sales chart": "Loading chart…" appears for 1.5 s (an artificial delay), then the chart. In the production build SalesChart is a separate file; open DevTools → Network to see it download. Hide and show it again: instant, it is cached.',
          type: 'react',
          component: LazyDemo,
          code: lazyDemoCode,
        },
        { title: 'SalesChart.lazy.jsx (the lazily loaded file)', type: 'code', code: salesChartCode, lang: 'jsx' },
      ],
    },
    {
      id: 'portals',
      title: 'Portals',
      summary:
        'createPortal(jsx, document.body) renders a component’s DOM somewhere else, usually at the end of <body>, while it stays in the same place in the React tree. Use it for modals, tooltips and dropdowns.',
      notes: [
        'Parents with overflow: hidden, a transform or a low z-index can clip or cover a modal rendered inside them.',
        'A portal moves only the DOM. Props, state, context and event handlers work as if it were still inside.',
        'Events bubble through the React tree, not the DOM tree. A click in the portal reaches the React parent.',
        'Component libraries use portals for every dialog, popover and menu.',
      ],
      examples: [
        {
          title: 'Modal inside a clipped box: no portal vs portal',
          caption: '"No portal" opens inside the box and gets cut off. "Portal" covers the whole page. Click outside it or Close to close it.',
          type: 'react',
          component: PortalDemo,
          code: portalDemoCode,
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing',
      summary:
        'Test pure logic (reducers, helpers) with Vitest, components with React Testing Library, and complete user flows in a real browser with Playwright.',
      notes: [
        'Vitest is to JavaScript what PHPUnit is to PHP: describe/it/expect instead of test classes and assertions. It uses the same config as Vite.',
        'Reducers and helpers are pure functions, the easiest and most valuable things to test (Part 10).',
        'React Testing Library: render a component, then find elements the way a user does (by role, label, visible text) and click or type.',
        'Test what the user sees, not implementation details (state variable names, class names). Tests then survive refactoring.',
        'Playwright drives a real browser through whole flows (log in, create an order), like Laravel Dusk.',
      ],
      examples: [
        { title: 'Vitest: testing the linesReducer', type: 'code', code: vitestReducerCode, lang: 'js' },
        { title: 'React Testing Library: testing a component', type: 'code', code: rtlComponentCode, lang: 'jsx' },
      ],
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      summary:
        'React frameworks add server-side rendering, routing and data loading on top of React. They shine for public websites; an internal app behind a login often doesn’t need them.',
      notes: [
        'SSR (server-side rendering): the server renders the HTML first, so the page shows content before JavaScript loads. Good for SEO and slow devices.',
        'Server Components: components that run only on the server (they can read the database directly) and send finished UI to the browser.',
        'Next.js: the most popular React framework (SSR, Server Components, file-based routing, API routes). It needs a Node.js server.',
        'React Router framework mode: the router you know from Part 12, grown into a full-stack framework with loaders and actions.',
        'An internal ERP behind a login has no SEO needs, and Laravel already is your backend: a Vite SPA or islands (Part 12) is usually simpler.',
      ],
      examples: [],
    },
    {
      id: 'react-compiler',
      title: 'React Compiler',
      summary:
        'The React Compiler is an optional build step that adds memoization automatically, so you rarely need memo, useMemo or useCallback by hand (Part 11).',
      notes: [
        'It analyses your components at build time and caches values and JSX where it is safe.',
        'It relies on your code following React’s rules: pure components, immutable props and state, hooks at the top level. Code that breaks them is skipped.',
        'The lint rules you met in this handbook (purity, immutability, set-state-in-effect) are the compiler’s rules. Fixing them makes code compiler-ready.',
        'Setup steps change between versions. Check react.dev → "React Compiler" for the current installation guide for Vite.',
      ],
      examples: [],
    },
    {
      id: 'suggested-path',
      title: 'Suggested path',
      summary: 'A practical order for bringing React into an existing Laravel 5 application and team.',
      notes: [
        '1. Build your first island: one interactive widget (e.g. an order table with filters) inside an existing Blade page (Part 12).',
        '2. Add TypeScript once the first island works, so new code is typed from early on.',
        '3. Use TanStack Query for all data from Laravel instead of hand-written effects.',
        '4. Pick a component library and a table library, so forms and grids look consistent and need less custom code.',
        '5. Add tests: Vitest for reducers and helpers first, then React Testing Library for key components.',
        '6. Plan the Laravel upgrade (PHP 8.x, a current Laravel). It unlocks Sanctum, Inertia and current packages.',
        'Team: write down your conventions (folder structure, naming, the API client, how errors are shown) and share this handbook as a common reference.',
      ],
      examples: [],
    },
    {
      id: 'course-summary',
      title: 'Course summary',
      summary: 'The main idea of every part, in one place, plus a one-page cheat sheet.',
      notes: [
        'Part 0 — Modern JavaScript: const/let, arrow functions, destructuring, spread, array methods, modules and async/await are everyday React syntax.',
        'Part 1 — The Big Picture: describe WHAT the UI should look like for the current data (UI = f(state)) instead of changing the DOM step by step.',
        'Part 2 — Setup: Node, npm and Vite build the app; index.html and main.jsx start it; npm run build makes static files.',
        'Part 3 — Components and JSX: components are functions that return JSX. Keep them pure and follow the JSX rules.',
        'Part 4 — Props: data flows down through props, which are read-only. children and composition make components flexible.',
        'Part 5 — State and Events: useState gives memory, setters trigger re-renders, and objects and arrays are updated immutably.',
        'Part 6 — Lists and Conditional Rendering: map with stable keys, derive filtered and sorted data, and pick a clear conditional pattern.',
        'Part 7 — How React Renders: trigger → render → commit, state belongs to a position in the tree, and keys reset state.',
        'Part 8 — Side Effects: effects synchronize with the outside world. Clean up, handle race conditions, and avoid unnecessary effects.',
        'Part 9 — Forms: controlled inputs, one state object, submit as JSON, show Laravel’s 422 errors under each field.',
        'Part 10 — Organizing State: put state in the closest common parent, avoid duplication, use context and reducers when they help.',
        'Part 11 — More Hooks: refs for non-rendered values and DOM nodes, memoization when measured, custom hooks to reuse logic.',
        'Part 12 — Real App Architecture: SPA or islands with Laravel, React Router, a central API client, auth, and server-side authorization.',
        'Part 13 — Where to Go Next: TypeScript, TanStack Query, form and state libraries, error boundaries, lazy loading, testing.',
      ],
      examples: [{ title: 'One-page cheat sheet', type: 'code', code: cheatSheetCode, lang: 'jsx' }],
    },
    {
      id: 'resources',
      title: 'Resources',
      summary: 'Where to look things up after this handbook.',
      notes: [
        'react.dev → Learn: the official tutorial, which this handbook follows closely. react.dev → Reference: every hook, component and API.',
        'MDN Web Docs (developer.mozilla.org): JavaScript, the DOM, fetch, Intl and every browser API.',
        'reactrouter.com: React Router documentation (declarative, data and framework modes).',
        'tanstack.com/query: TanStack Query guides and reference.',
        'typescriptlang.org: the TypeScript Handbook and an online playground.',
      ],
      examples: [],
    },
  ],
}
