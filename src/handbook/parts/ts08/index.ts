import TypesCanLie from './examples/TypesCanLie.tsx'
import typesCanLieCode from './examples/TypesCanLie.tsx?raw'
import asDangerousCode from './examples/asDangerous.ts?raw'
import schemasCode from './examples/schemas.ts?raw'
import apiGetCode from './examples/apiGet.ts?raw'
import ValidatedLoad from './examples/ValidatedLoad.tsx'
import validatedLoadCode from './examples/ValidatedLoad.tsx?raw'
import BoundaryFix from './examples/BoundaryFix.tsx'
import boundaryFixCode from './examples/BoundaryFix.tsx?raw'
import laravelCastsCode from './examples/laravelCasts.txt?raw'
import laravelSchemasCode from './examples/laravelSchemas.ts?raw'
import PaginatedDemo from './examples/PaginatedDemo.tsx'
import paginatedDemoCode from './examples/PaginatedDemo.tsx?raw'
import OrderIdInput from './examples/OrderIdInput.tsx'
import orderIdInputCode from './examples/OrderIdInput.tsx?raw'
import runLocalStorageSettings from './examples/localStorageSettings.ts'
import localStorageSettingsCode from './examples/localStorageSettings.ts?raw'

export default {
  id: 'ts08',
  number: 8,
  title: 'Data from the Outside World',
  topics: [
    {
      id: 'types-can-lie',
      title: 'Types can lie',
      summary:
        'A type is a promise about data, not a check. When data comes from outside, like an API response, nothing verifies that promise, and wrong data flows through "type-safe" code.',
      notes: [
        'apiGet<Order[]> with `as T` makes TypeScript believe the JSON is Order[].',
        'If Laravel sends customer_name and total as "750000.00", o.customer is undefined and o.total + 1000 joins strings.',
        'TypeScript can’t know: the JSON arrives at runtime, and types are erased (TS Part 1).',
      ],
      examples: [
        {
          title: 'Trusting a drifted API response',
          caption:
            'The customer column is empty, and "Total + 1000" shows 750000.001000: string concatenation, not addition. TypeScript reported nothing, because `as T` told it the data was already Order[].',
          type: 'react',
          component: TypesCanLie,
          code: typesCanLieCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'boundaries',
      title: 'Boundaries',
      summary:
        'A boundary is any place where data enters your app from somewhere TypeScript can’t see. Check data at the boundary; inside, trust the types.',
      notes: [
        'API responses: fetch(...).json() (Laravel can change, errors return different bodies).',
        'JSON.parse: returns any, whatever the string contained.',
        'localStorage / sessionStorage: old app versions, other tabs, or users in DevTools may have stored anything.',
        'URL params and query strings: always strings, typed by users (useParams, useSearchParams).',
        'Form values: e.target.value and FormData are strings, even for <input type="number">.',
        'Validate once at the edge; everything after it can then rely on correct types.',
      ],
      examples: [],
    },
    {
      id: 'why-as-is-dangerous',
      title: 'Why as is dangerous',
      summary:
        'A type assertion (as Order) and the non-null assertion (!) don’t check anything. They switch TypeScript’s checking off, and the crash happens later, far from the cause.',
      notes: [
        'res.json() as Order accepts renamed fields, error bodies and null alike.',
        'find(...)! removes | undefined from the type, but not from reality.',
        'Every as and ! is a spot where you took over the checking from TypeScript.',
        'At boundaries, replace them with real checks: a schema (next topic).',
      ],
      examples: [
        {
          title: 'as Order and find(...)!',
          caption: 'This file passes npm run typecheck, which is exactly the problem.',
          type: 'code',
          code: asDangerousCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'validating-with-zod',
      title: 'Validating with Zod',
      summary:
        'Zod schemas describe the expected data AND check it at runtime. z.infer derives the TypeScript type from the schema, so the check and the type can never disagree.',
      notes: [
        'const OrderSchema = z.object({ … }); type Order = z.infer<typeof OrderSchema>: one definition, two uses.',
        'schema.parse(data) returns typed data or throws a ZodError listing every problem (path + message).',
        'apiGet(path, schema) replaces apiGet<T>(path): no `as` left.',
        'Show users a calm message; log or display the detailed issues for developers.',
        'Like Laravel’s $request->validate(), but for data coming INTO the browser.',
      ],
      examples: [
        { title: 'schemas.ts', type: 'code', code: schemasCode, lang: 'ts' },
        { title: 'apiGet.ts: the validating helper', type: 'code', code: apiGetCode, lang: 'ts' },
        {
          title: 'Correct data vs drifted data',
          caption: 'orders.json passes and is fully typed. orders-laravel.json fails, with every issue listed by path.',
          type: 'react',
          component: ValidatedLoad,
          code: validatedLoadCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'fixing-at-boundary',
      title: 'Fixing data at the boundary',
      summary:
        'A schema can also CONVERT data: z.coerce.number() turns "750000.00" into 750000, and .transform() renames customer_name to customer. The rest of the app only sees clean Orders.',
      notes: [
        'z.coerce.number() converts first, then checks (like (float) in PHP, but "abc" still fails).',
        '.transform() reshapes data after it passed the checks; its return value is what parse() gives you.',
        'Choose one naming convention for the frontend (customer or customer_name) and convert at the boundary, not in every component.',
        'Even better: fix it in Laravel ($casts, API Resources), so every client gets clean data.',
      ],
      examples: [
        {
          title: 'Loading orders-laravel.json successfully',
          type: 'react',
          component: BoundaryFix,
          code: boundaryFixCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'laravel-specifics',
      title: 'Laravel specifics',
      summary:
        'Laravel APIs have recurring patterns: decimals as strings, two date formats, nullable columns, paginate() wrappers and 422 error bodies. A few schemas cover them all.',
      notes: [
        'Decimal columns arrive as strings unless cast; $casts = [\'total\' => \'float\'] fixes it in Laravel.',
        'Laravel 5 dates look like "2026-10-02 14:30:00"; Laravel 7+ sends ISO "2026-10-02T07:30:00.000000Z". Validate the format you actually get.',
        '.nullable() for null values (nullable columns); .optional() for keys that may be missing.',
        'paginated(itemSchema) builds a schema for any Model::paginate() response.',
        'ValidationErrorSchema uses z.record(z.string(), z.array(z.string())) for Laravel’s errors object.',
      ],
      examples: [
        { title: 'Laravel $casts', type: 'code', code: laravelCastsCode, lang: 'php' },
        { title: 'Dates, nullable vs optional, paginated(), 422 errors', type: 'code', code: laravelSchemasCode, lang: 'ts' },
        {
          title: 'paginated.json through paginated(OrderSchema)',
          type: 'react',
          component: PaginatedDemo,
          code: paginatedDemoCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'other-boundaries',
      title: 'Other boundaries',
      summary: 'The same tools work for every boundary: inputs and URL params, localStorage, JSON from anywhere.',
      notes: [
        'z.coerce.number().int().positive() turns an input or URL param into a valid id, or a clear error.',
        'safeParse never throws: check result.success, then use result.data or result.error.',
        'For stored settings, fall back to defaults when the data is missing, invalid, or not even JSON.',
      ],
      examples: [
        {
          title: 'An order id input',
          caption: 'Try 102, abc, -5 and 1.5.',
          type: 'react',
          component: OrderIdInput,
          code: orderIdInputCode,
          lang: 'tsx',
        },
        {
          title: 'Settings from localStorage with safeParse',
          type: 'js',
          run: runLocalStorageSettings,
          code: localStorageSettingsCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'keeping-types-in-sync',
      title: 'Keeping types in sync',
      summary: 'The backend and frontend describe the same data twice. A few habits keep them from drifting apart.',
      notes: [
        'Laravel API Resources (5.5+) define the JSON shape in one place on the server (toArray), instead of returning raw models.',
        'Keep all frontend schemas in one folder (e.g. src/schemas/), one file per resource, mirroring the API Resources.',
        'Zod catches drift the moment it happens: a renamed column fails loudly at the boundary instead of showing blank cells.',
        'For large APIs, describe the API with OpenAPI (Swagger) and generate TypeScript types or Zod schemas from it.',
        'When the API changes: update the Resource, the schema, then let npm run typecheck show every place that needs attention.',
      ],
      examples: [],
    },
  ],
}
