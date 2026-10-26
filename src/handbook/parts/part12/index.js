import archSpaCode from './examples/archSpa.txt?raw'
import archIslandsBladeCode from './examples/archIslandsBlade.txt?raw'
import archIslandsEntryCode from './examples/archIslandsEntry.txt?raw'
import archIslandsViteCode from './examples/archIslandsVite.txt?raw'
import archInertiaCode from './examples/archInertia.txt?raw'
import RouterBasics from './examples/RouterBasics.jsx'
import routerBasicsCode from './examples/RouterBasics.jsx?raw'
import addressBarCode from './examples/router/AddressBar.jsx?raw'
import browserRouterMainCode from './examples/browserRouterMain.txt?raw'
import NestedLayout from './examples/NestedLayout.jsx'
import nestedLayoutCode from './examples/NestedLayout.jsx?raw'
import bladeLayoutCompareCode from './examples/bladeLayoutCompare.txt?raw'
import UrlParams from './examples/UrlParams.jsx'
import urlParamsCode from './examples/UrlParams.jsx?raw'
import QueryStrings from './examples/QueryStrings.jsx'
import queryStringsCode from './examples/QueryStrings.jsx?raw'
import NavigateFromCode from './examples/NavigateFromCode.jsx'
import navigateFromCodeCode from './examples/NavigateFromCode.jsx?raw'
import redirectCompareCode from './examples/redirectCompare.txt?raw'
import catchAllRouteCode from './examples/catchAllRoute.txt?raw'
import nginxTryFilesCode from './examples/nginxTryFiles.txt?raw'
import folderByTypeCode from './examples/folderByType.txt?raw'
import folderByFeatureCode from './examples/folderByFeature.txt?raw'
import apiClientCode from './examples/api/client.js?raw'
import fakeServerCode from './examples/api/fakeServer.js?raw'
import ApiClientDemo from './examples/ApiClientDemo.jsx'
import apiClientDemoCode from './examples/ApiClientDemo.jsx?raw'
import runApiErrorClass from './examples/apiErrorClass.js'
import apiErrorClassCode from './examples/apiErrorClass.js?raw'
import envFilesCode from './examples/envFiles.txt?raw'
import importMetaEnvCode from './examples/importMetaEnv.txt?raw'
import EnvVars from './examples/EnvVars.jsx'
import envVarsCode from './examples/EnvVars.jsx?raw'
import authCookieXsrfCode from './examples/authCookieXsrf.txt?raw'
import authLaravelRoutesCode from './examples/authLaravelRoutes.txt?raw'
import authBearerCode from './examples/authBearer.txt?raw'
import AuthApp from './examples/AuthApp.jsx'
import authAppCode from './examples/AuthApp.jsx?raw'
import authContextCode from './examples/auth/AuthContext.jsx?raw'
import requireAuthCode from './examples/auth/RequireAuth.jsx?raw'
import authorizeCompareCode from './examples/authorizeCompare.txt?raw'
import authorizeLaravelCode from './examples/authorizeLaravel.txt?raw'

export default {
  id: 'part12',
  number: 12,
  title: 'Real App Architecture',
  topics: [
    {
      id: 'react-with-laravel',
      title: 'Three ways to combine React with Laravel',
      summary:
        'React can own the whole UI and talk to Laravel as a JSON API (SPA), live as small "islands" inside Blade pages, or replace Blade views while Laravel keeps routing (Inertia).',
      notes: [
        '(A) SPA + JSON API: React Router handles pages, Laravel only answers /api requests. Works with Laravel 5 today.',
        '(B) Islands: Blade renders the page, React takes over one div. Data arrives through data-* attributes. Works with Laravel 5 today.',
        '(C) Inertia: controllers return Inertia::render() instead of view(). Elegant, but the current Laravel adapter requires PHP 8.1+ and Laravel 10+.',
        'Islands allow gradual adoption: convert one widget at a time (an order table, a form) without rewriting the app.',
        'An SPA gives the smoothest app-like feel, but you rebuild auth, routing and pages in React.',
      ],
      examples: [
        { title: '(A) SPA + JSON API', type: 'code', code: archSpaCode, lang: 'text' },
        { title: '(B) Islands: the Blade view', type: 'code', code: archIslandsBladeCode, lang: 'html' },
        { title: '(B) Islands: the React entry file', type: 'code', code: archIslandsEntryCode, lang: 'jsx' },
        {
          title: '(B) Islands: vite.config.js building into Laravel’s public/react',
          type: 'code',
          code: archIslandsViteCode,
          lang: 'js',
        },
        { title: '(C) Inertia controller', type: 'code', code: archInertiaCode, lang: 'php' },
      ],
    },
    {
      id: 'client-side-routing',
      title: 'Client-side routing',
      summary:
        'In an SPA there is only one HTML page. A router changes the URL and swaps the components on screen without asking the server for a new page.',
      notes: [
        'Client-side routing: clicking a link updates the address bar and renders a different component. No page reload, no lost state.',
        'It uses the browser’s History API (history.pushState) to change the URL without loading anything.',
        'Without a router an SPA has one URL for everything: no bookmarks, no shareable links, and Back leaves the app.',
        'With a router: every screen has its own URL, refresh and bookmarks work, and Back/Forward move between screens.',
        'Laravel decides the page on the server for each request. React Router decides it in the browser, after the first load.',
      ],
      examples: [],
    },
    {
      id: 'react-router-basics',
      title: 'React Router basics',
      summary:
        'Wrap the app in a router, list the pages with <Routes> and <Route path element>, and navigate with <Link> and <NavLink> instead of <a href>.',
      notes: [
        'The package is react-router (npm i react-router). react-router-dom was merged into it and removed in v8.',
        'Three modes: declarative (<BrowserRouter> + <Routes>, used here), data (createBrowserRouter with loaders/actions), and framework (full-stack, with its own build tool).',
        '<Route path="/orders" element={<OrdersPage />} /> is like Route::get(\'/orders\', ...) in routes/web.php.',
        'path="*" catches everything else: your 404 page.',
        '<NavLink> is a <Link> that knows if it is active, perfect for menus.',
        'In these examples MemoryRouter replaces BrowserRouter, because the handbook already uses the real URL. The fake address bar shows the in-memory URL.',
      ],
      examples: [
        {
          title: 'Routes, Link, NavLink and a 404 page',
          caption:
            'Click the links and watch the fake address bar. "Broken link" shows the 404 page. "Plain <a href>" explains why Link is used instead.',
          type: 'react',
          component: RouterBasics,
          code: routerBasicsCode,
        },
        { title: 'router/AddressBar.jsx (the fake address bar)', type: 'code', code: addressBarCode, lang: 'jsx' },
        { title: 'Real setup: BrowserRouter in main.jsx', type: 'code', code: browserRouterMainCode, lang: 'jsx' },
      ],
    },
    {
      id: 'layouts-nested-routes',
      title: 'Layouts and nested routes',
      summary:
        'A layout route renders the shared frame (sidebar, header) plus an <Outlet />, and its child routes appear inside the Outlet. Pages outside the layout, like /login, render without it.',
      notes: [
        '<Route element={<AppLayout />}> with child <Route>s: the children render where AppLayout puts <Outlet />.',
        'index marks the child shown at the parent’s own URL ("/").',
        'The layout stays mounted while you move between its pages, so its state (a collapsed sidebar) survives.',
        'Like @extends + @yield in Blade, except the layout isn’t rebuilt on every page.',
      ],
      examples: [
        {
          title: 'AppLayout with a collapsible sidebar',
          caption: 'Collapse the sidebar, then expand it and switch pages: the layout keeps its state. "Log out" goes to /login, which has no sidebar.',
          type: 'react',
          component: NestedLayout,
          code: nestedLayoutCode,
        },
        { title: 'Blade @extends / @yield vs <Outlet />', type: 'code', code: bladeLayoutCompareCode, lang: 'jsx' },
      ],
    },
    {
      id: 'url-parameters',
      title: 'URL parameters',
      summary:
        'path="/orders/:orderId" matches /orders/101, and useParams() gives you { orderId: "101" }. The page then loads the data for that id.',
      notes: [
        'Like Route::get(\'/orders/{order}\') in Laravel, but without automatic model binding: you load the data yourself.',
        'Params are always strings. Convert them with Number(orderId).',
        'Moving from /orders/101 to /orders/102 REUSES the same page component (same type, same position, Part 7). Only the params change.',
        'So effects must depend on the id, and local state that belongs to one order needs key={orderId}.',
      ],
      examples: [
        {
          title: 'Order list and OrderDetailPage with useParams',
          caption:
            'Open an order, type a note, then click "Next order". The page component is reused, so the effect reloads data for the new id, and key={orderId} gives the note form a fresh start.',
          type: 'react',
          component: UrlParams,
          code: urlParamsCode,
        },
      ],
    },
    {
      id: 'query-strings',
      title: 'Query strings',
      summary:
        'useSearchParams reads and writes the ?query part of the URL. Filters kept there survive a refresh and can be bookmarked and shared.',
      notes: [
        'The URL is a place for state: put filters, sorting and paging there when users should be able to refresh, bookmark, share, or use Back.',
        'searchParams.get(\'status\') is like $request->input(\'status\') in Laravel. Values are strings (or null).',
        'URLSearchParams is the browser’s helper for building query strings.',
        'Each setSearchParams creates a history entry, so Back undoes the last filter change.',
      ],
      examples: [
        {
          title: 'SalesReportPage with ?status and ?from',
          caption: 'Change the status and the date: the fake address bar shows the query string. Use ← to step back through your filter changes.',
          type: 'react',
          component: QueryStrings,
          code: queryStringsCode,
        },
      ],
    },
    {
      id: 'navigating-from-code',
      title: 'Navigating from code',
      summary:
        'useNavigate() returns a function to change the URL from your code, e.g. after saving a form. replace: true swaps the current history entry instead of adding one.',
      notes: [
        'navigate(\'/orders/109\') after a successful save, like redirect()->route(\'orders.show\', $order).',
        '{ replace: true } replaces the form in the history, so Back doesn’t return to a finished form.',
        'navigate(-1) is the browser’s Back button.',
        'Use <Link> for normal links. Use navigate() only when code decides, e.g. after an API call.',
      ],
      examples: [
        {
          title: 'NewOrderPage: save, then go to the new order',
          caption:
            'Click "+ New order", then "Save order". You land on the new order. Now click Back: you return to the list, not to the form, because of replace: true.',
          type: 'react',
          component: NavigateFromCode,
          code: navigateFromCodeCode,
        },
        { title: 'Laravel redirect() vs navigate()', type: 'code', code: redirectCompareCode, lang: 'jsx' },
      ],
    },
    {
      id: 'refresh-on-server',
      title: 'Refresh on the server',
      summary:
        'Client-side URLs only exist inside React. When the user refreshes /orders/101, the browser asks the SERVER for that path, so the server must answer with index.html for every app URL.',
      notes: [
        'A click on a <Link> never reaches the server. A refresh or a pasted link always does.',
        'Without a fallback, the server has no /orders/101 route and answers 404 before React can run.',
        'Fix: a catch-all route (Laravel) or try_files (Nginx) that returns index.html for every non-file, non-API URL.',
        'Put the Laravel catch-all LAST and exclude /api, so real routes and API errors still work.',
      ],
      examples: [
        { title: 'Laravel catch-all route', type: 'code', code: catchAllRouteCode, lang: 'php' },
        { title: 'Nginx try_files', type: 'code', code: nginxTryFilesCode, lang: 'text' },
      ],
    },
    {
      id: 'project-structure',
      title: 'Project structure',
      summary:
        'Small apps can group files by type (components, hooks, pages). As an app grows, grouping by feature (orders, customers, auth) keeps related files together.',
      notes: [
        'Type-based is like a default Laravel app: app/Http/Controllers, app/Models, resources/views, all separate.',
        'Feature-based is like Laravel modules/domains: everything about orders lives in one place.',
        'Put code used by several features in shared/ (API client, buttons, format helpers).',
        'There is no "Laravel way" enforced by React. Pick one structure and stay consistent.',
      ],
      examples: [
        { title: 'Type-based', type: 'code', code: folderByTypeCode, lang: 'text' },
        { title: 'Feature-based', type: 'code', code: folderByFeatureCode, lang: 'text' },
      ],
    },
    {
      id: 'api-client',
      title: 'Central API client',
      summary:
        'Put all HTTP details (base URL, headers, token, error handling) in one module. Components call api.get/post and catch one consistent ApiError.',
      notes: [
        'One place for the base URL, the Accept/Content-Type headers and the Authorization header.',
        'Non-2xx responses become an ApiError with status, message and Laravel’s errors object.',
        'A 422 maps straight to form field errors: err.errors.customer[0].',
        'A central 401 handler can log the user out everywhere (see "AuthProvider and protected routes").',
        'Like a Laravel service class wrapping Guzzle: callers don’t repeat HTTP details.',
      ],
      examples: [
        {
          title: 'Creating an order through the client',
          caption: 'Click the buttons in order: 401 without login, then log in, then a 422 with field errors, then 201 created.',
          type: 'react',
          component: ApiClientDemo,
          code: apiClientDemoCode,
        },
        { title: 'api/client.js', type: 'code', code: apiClientCode, lang: 'js' },
        {
          title: 'api/fakeServer.js (the pretend Laravel)',
          type: 'code',
          code: fakeServerCode,
          lang: 'js',
        },
        {
          title: 'class, extends, super and instanceof with ApiError',
          type: 'js',
          run: runApiErrorClass,
          code: apiErrorClassCode,
        },
      ],
    },
    {
      id: 'environment-variables',
      title: 'Environment variables',
      summary:
        'Vite reads .env files and exposes variables that start with VITE_ to your code as import.meta.env.VITE_…. They are copied into the JavaScript at build time.',
      notes: [
        'Only VITE_ variables reach the browser. Others stay on your machine (like the handbook’s ANTHROPIC_API_KEY).',
        'Values are baked in at BUILD time. Change .env.production → run npm run build again.',
        'Everything in import.meta.env is public: anyone can read it in the downloaded JS. Never put secrets (passwords, private API keys) there.',
        '.env.development is used by npm run dev, .env.production by npm run build, and .env.local overrides both on your machine.',
        'Unlike Laravel’s env(), which is read on the server at runtime.',
      ],
      examples: [
        { title: '.env files', type: 'code', code: envFilesCode, lang: 'bash' },
        { title: 'Reading import.meta.env', type: 'code', code: importMetaEnvCode, lang: 'js' },
        {
          title: 'This handbook’s environment',
          caption: 'Run npm run dev vs npm run build + npm run preview and compare MODE.',
          type: 'react',
          component: EnvVars,
          code: envVarsCode,
        },
      ],
    },
    {
      id: 'authentication',
      title: 'Authentication approaches',
      summary:
        'An SPA can log in with a session cookie (the browser sends it automatically) or with a token (your code sends it in a header). The right choice depends mostly on whether React and Laravel share a domain.',
      notes: [
        'Session cookie: Laravel’s normal login. The cookie is httpOnly (JS can’t read it), needs the same domain, and needs the CSRF token. Great for islands and same-domain SPAs.',
        'Token (Bearer): works across domains and for mobile apps. Your code must store the token and send it with every request.',
        'Storing tokens: memory is lost on refresh; localStorage survives but any XSS script can steal it. Keep XSS out (React escapes by default, Part 3) and keep tokens short-lived.',
        'routes/api.php is stateless in Laravel 5: no session, no CSRF. Use auth:api with a token guard.',
        'Laravel 5 options: the built-in token guard (api_token column), Passport (OAuth2), or a JWT package. Sanctum came later (Laravel 7+).',
      ],
      examples: [
        { title: 'Session cookie + XSRF-TOKEN header', type: 'code', code: authCookieXsrfCode, lang: 'js' },
        { title: 'Laravel 5 routes: web (session) vs api (stateless)', type: 'code', code: authLaravelRoutesCode, lang: 'php' },
        { title: 'Bearer token header', type: 'code', code: authBearerCode, lang: 'js' },
      ],
    },
    {
      id: 'auth-provider-protected-routes',
      title: 'AuthProvider and protected routes',
      summary:
        'An AuthProvider knows who is logged in and offers login/logout. A RequireAuth layout route sends guests to /login, remembers where they wanted to go, and sends them back after login.',
      notes: [
        'Three statuses: checking (asking the server), authenticated, guest. Don’t render protected pages or redirect while checking.',
        'RequireAuth is a layout route: <Route element={<RequireAuth />}> guards all its children, like Route::middleware(\'auth\')->group().',
        '<Navigate to="/login" replace state={{ from: location }} /> redirects and remembers the original page.',
        'After login, navigate(from, { replace: true }) returns the user to that page.',
        'A central 401 handler in the API client turns an expired session into a logout everywhere.',
        'This demo keeps the token in memory only, so a page refresh logs you out. Real apps choose between memory, localStorage and cookies (previous topic).',
      ],
      examples: [
        {
          title: 'A complete mini app',
          caption:
            'It starts at /orders: you are sent to /login. Log in as Budi (admin) and you return to /orders with Approve buttons. Log in as Sari (staff): no Approve buttons, and "Try approving via API" gets a 403 from the server. "Simulate expired session" sends you back to /login. (If you logged in under "Central API client", you are already logged in here: same in-memory token.)',
          type: 'react',
          component: AuthApp,
          code: authAppCode,
        },
        { title: 'auth/AuthContext.jsx', type: 'code', code: authContextCode, lang: 'jsx' },
        { title: 'auth/RequireAuth.jsx', type: 'code', code: requireAuthCode, lang: 'jsx' },
      ],
    },
    {
      id: 'server-side-authorization',
      title: 'Server-side authorization',
      summary:
        'React decides what to SHOW; only Laravel can decide what is ALLOWED. Every protected action must be checked on the server, for every request.',
      notes: [
        '**Hiding a button in React is UX. Laravel must check permissions on every request.**',
        'Anyone can call your API directly (DevTools console, curl, Postman) with a valid token.',
        'Use policies and $this->authorize() (or Gate::allows) in every controller action that changes data.',
        'The React check and the Laravel check should agree. The Laravel one is the one that counts.',
      ],
      examples: [
        { title: 'React: hiding the button', type: 'code', code: authorizeCompareCode, lang: 'jsx' },
        { title: 'Laravel: $this->authorize() in the controller', type: 'code', code: authorizeLaravelCode, lang: 'php' },
      ],
    },
    {
      id: 'deployment',
      title: 'Deployment',
      summary:
        'npm run build turns the app into static files in dist/. Serve them from Laravel’s public folder or from a separate web server, with an index.html fallback and sensible caching.',
      notes: [
        'npm run build → dist/index.html + dist/assets/*.js|css with hashed names. No Node.js is needed on the server.',
        'Same server: copy dist into Laravel’s public folder (e.g. public/app) and add the catch-all route. Same domain: no CORS, and cookies work.',
        'Separate server or domain (e.g. app.ptmaju.co.id + api.ptmaju.co.id): configure the index.html fallback there, and enable CORS in Laravel (Laravel 5: the barryvdh/laravel-cors package).',
        'Caching: hashed assets never change, so cache them for a year. Never cache index.html, so users always get the newest asset names.',
        'Environment variables are baked in at build time: build with the production .env (VITE_API_URL) for production.',
        'Deploy order: build → upload the new assets → then replace index.html, so no visitor ever loads an index.html that points to missing files.',
      ],
      examples: [],
    },
  ],
}
