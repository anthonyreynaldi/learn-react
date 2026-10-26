import tsconfigOptionsCode from './examples/tsconfigOptions.txt?raw'
import uncheckedIndexCode from './examples/uncheckedIndex.txt?raw'
import typeOnlyImportCode from './examples/typeOnlyImport.txt?raw'
import aliasConfigCode from './examples/aliasConfig.txt?raw'
// The part file itself uses the new alias too:
import runAliasImport from '@/handbook/parts/ts09/examples/aliasImport.ts'
import aliasImportCode from './examples/aliasImport.ts?raw'
import typesPackagesCode from './examples/typesPackages.txt?raw'
import viteEnvCode from '@/vite-env.d.ts?raw'
import EnvDisplay from './examples/EnvDisplay.tsx'
import envDisplayCode from './examples/EnvDisplay.tsx?raw'
import expectErrorVsIgnoreCode from './examples/expectErrorVsIgnore.txt?raw'
import errPossiblyUndefinedCode from './examples/errPossiblyUndefined.txt?raw'
import errNeverArrayCode from './examples/errNeverArray.txt?raw'
import errImplicitAnyCode from './examples/errImplicitAny.txt?raw'
import errStringVsStatusCode from './examples/errStringVsStatus.txt?raw'
import errRecordIndexCode from './examples/errRecordIndex.txt?raw'
import errUnknownCatchCode from './examples/errUnknownCatch.txt?raw'
import errMissingAliasCode from './examples/errMissingAlias.txt?raw'
import errTypeOnlyImportCode from './examples/errTypeOnlyImport.txt?raw'
import CatchPattern from './examples/CatchPattern.tsx'
import catchPatternCode from './examples/CatchPattern.tsx?raw'

export default {
  id: 'ts09',
  number: 9,
  title: 'Working in a Real Project',
  topics: [
    {
      id: 'tsconfig-options',
      title: 'tsconfig options',
      summary:
        'Beyond strict, a few options catch more bugs: unchecked index access, unused code, and type-only imports. Turn them on at the start of a project; adding them later means fixing every old file at once.',
      notes: [
        'strict: the core checks. Always on.',
        'noUncheckedIndexedAccess: arr[0] may be undefined, so TypeScript makes you handle it.',
        'noUnusedLocals / noUnusedParameters: leftover variables and parameters become errors.',
        'verbatimModuleSyntax: type-only imports must use `import type` (this project has it on).',
        'This project only enables strict and verbatimModuleSyntax, so the existing JavaScript lessons keep working.',
      ],
      examples: [
        { title: 'Five useful options', type: 'code', code: tsconfigOptionsCode, lang: 'json' },
        { title: 'orders[0] with and without noUncheckedIndexedAccess', type: 'code', code: uncheckedIndexCode, lang: 'ts' },
        { title: 'The type-only import error and its fix', type: 'code', code: typeOnlyImportCode, lang: 'tsx' },
      ],
    },
    {
      id: 'path-aliases',
      title: 'Path aliases',
      summary:
        'A path alias replaces long relative imports (../../../utils) with a fixed prefix: @/utils/format.js always means src/utils/format.js. TypeScript and Vite both need to know it.',
      notes: [
        'tsconfig.json "paths" teaches TypeScript and the editor; vite.config.js resolve.alias teaches the bundler.',
        'Imports no longer break when a file moves to another folder.',
        '@/ is a convention; any prefix works, but don’t use one that looks like an npm package.',
        'This project now has the alias. Its own TS Part 9 index imports with @/ too.',
      ],
      examples: [
        { title: 'tsconfig paths + Vite alias', type: 'code', code: aliasConfigCode, lang: 'ts' },
        { title: 'Importing formatRupiah through @/', type: 'js', run: runAliasImport, code: aliasImportCode, lang: 'ts' },
      ],
    },
    {
      id: 'types-packages',
      title: '@types packages',
      summary: 'Libraries reach TypeScript in three ways: with built-in types, with a separate @types package, or with no types at all (then you declare them).',
      notes: [
        '1. Built-in types: most modern libraries (react-router, zod, @tanstack/react-query). Nothing extra to install.',
        '2. Separate types: JavaScript libraries with types maintained in @types/name (DefinitelyTyped), e.g. @types/react, @types/lodash. Install with -D.',
        '3. No types: write declare module \'name\' in a .d.ts file. Everything is any until you describe it.',
        'The error "Could not find a declaration file for module \'x\'. … implicitly has an \'any\' type." means case 2 or 3: try npm i -D @types/x first.',
      ],
      examples: [{ title: 'Installing types, or declaring them', type: 'code', code: typesPackagesCode, lang: 'ts' }],
    },
    {
      id: 'declaration-files',
      title: 'Declaration files',
      summary:
        'A .d.ts file contains only types. It describes things that exist at runtime but that TypeScript can’t see, like Vite’s import.meta.env variables.',
      notes: [
        'src/vite-env.d.ts references Vite’s types and declares this project’s VITE_ variables.',
        'interface ImportMetaEnv { … } doesn’t replace Vite’s interface: interfaces with the same name MERGE (declaration merging). That is one thing interface can do and type can’t (TS Part 4).',
        'VITE_API_URL?: string is optional because the variable may not be set, so TypeScript makes you handle undefined.',
        'Declarations are promises too: nothing checks that the .env file really sets the variable (TS Part 8).',
      ],
      examples: [
        { title: 'This project’s src/vite-env.d.ts (the real file)', type: 'code', code: viteEnvCode, lang: 'ts' },
        { title: 'Reading typed env variables', type: 'react', component: EnvDisplay, code: envDisplayCode, lang: 'tsx' },
      ],
    },
    {
      id: 'gradual-migration',
      title: 'Gradual migration',
      summary:
        'An existing JavaScript project doesn’t need a big-bang rewrite. With allowJs, .js and .ts files live side by side, and you convert one file at a time, exactly like this handbook.',
      notes: [
        'allowJs: true lets TypeScript files import JavaScript files (and the other way round).',
        'Order: 1. utilities (format, date helpers), 2. the API layer (client + schemas), 3. leaf components (buttons, rows), 4. pages and layouts.',
        'Start from the bottom of the import tree: converted files then give typed imports to everything above them.',
        'Rename .jsx → .tsx, fix the errors, commit. Small steps, each one working.',
        'If you must silence an error temporarily, use @ts-expect-error with a reason, not @ts-ignore.',
      ],
      examples: [{ title: '@ts-expect-error vs @ts-ignore', type: 'code', code: expectErrorVsIgnoreCode, lang: 'ts' }],
    },
    {
      id: 'common-errors',
      title: 'Common errors',
      summary: 'The errors you will meet most often in a React + TypeScript project, each with its message and its fix.',
      notes: [
        'Read the first line for the problem, the last line for the exact spot (TS Part 1).',
        'Most fixes are one of: handle undefined/null, add a type to an empty value, narrow a string, check unknown.',
      ],
      examples: [
        { title: '\'order\' is possibly \'undefined\'', type: 'code', code: errPossiblyUndefinedCode, lang: 'tsx' },
        { title: 'never[] from useState([])', type: 'code', code: errNeverArrayCode, lang: 'tsx' },
        { title: 'Parameter implicitly has an \'any\' type', type: 'code', code: errImplicitAnyCode, lang: 'ts' },
        { title: 'string is not assignable to OrderStatus', type: 'code', code: errStringVsStatusCode, lang: 'tsx' },
        { title: 'A string index on a Record', type: 'code', code: errRecordIndexCode, lang: 'ts' },
        { title: '\'err\' is of type \'unknown\'', type: 'code', code: errUnknownCatchCode, lang: 'ts' },
        { title: 'Cannot find module \'@/…\'', type: 'code', code: errMissingAliasCode, lang: 'ts' },
        { title: 'A type-only import', type: 'code', code: errTypeOnlyImportCode, lang: 'tsx' },
        {
          title: 'The catch pattern in a component',
          caption: 'Both buttons fail on purpose: one throws an Error, the other throws a plain string. err instanceof Error handles both.',
          type: 'react',
          component: CatchPattern,
          code: catchPatternCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'good-habits',
      title: 'Good habits',
      summary: 'A handful of habits keep TypeScript helpful instead of noisy.',
      notes: [
        'Run npm run typecheck regularly, and in CI before every deploy. Vite won’t stop a build with type errors.',
        'Add typescript-eslint for lint rules that understand types (no-floating-promises, no-explicit-any, …).',
        'Avoid any, as and !. Each one switches checking off. Use unknown + narrowing, or a schema, instead.',
        'Let inference work: annotate parameters, exports and empty values; leave the rest to TypeScript.',
        'Validate at the boundary (TS Part 8); trust the types inside.',
        'Derive types instead of repeating them (TS Part 6).',
      ],
      examples: [],
    },
    {
      id: 'ts-summary',
      title: 'TypeScript series summary',
      summary: 'The main idea of each TypeScript part, in one place.',
      notes: [
        'TS Part 1 — How TypeScript Works: JavaScript plus types, checked statically by the editor and tsc, then erased. Vite doesn’t check.',
        'TS Part 2 — Basic Types: string, number, boolean, arrays, object types, optional properties, null/undefined, and unknown instead of any.',
        'TS Part 3 — Functions: typed parameters and returns, optional/default parameters, object parameters, function types, Promise<T>.',
        'TS Part 4 — Combining Types: unions, literal types, narrowing, discriminated unions, intersections; prefer type over interface.',
        'TS Part 5 — Generics: type parameters for reusable functions and types, constraints, a typed API helper.',
        'TS Part 6 — Type Tools: derive types with Partial/Pick/Omit, Record, keyof, typeof, as const and satisfies.',
        'TS Part 7 — TypeScript with React: typed props, children, callbacks, state, events, reducers, refs, context, hooks and generic components.',
        'TS Part 8 — Data from the Outside World: types can lie at boundaries; validate and convert with Zod schemas.',
        'TS Part 9 — Working in a Real Project: tsconfig options, path aliases, @types and .d.ts files, gradual migration, common errors and habits.',
      ],
      examples: [],
    },
  ],
}
