import formatRupiahJsCode from './examples/formatRupiah.js?raw'
import formatRupiahTsCode from './examples/formatRupiah.ts?raw'
import phpTypeHintCode from './examples/phpTypeHint.txt?raw'
import tsEditorErrorCode from './examples/tsEditorError.txt?raw'
import orderLabelCode from './examples/orderLabel.ts?raw'
import orderLabelCompiledCode from './examples/orderLabel.compiled.js?raw'
import runApiDataMismatch from './examples/apiDataMismatch.ts'
import apiDataMismatchCode from './examples/apiDataMismatch.ts?raw'
import tscCommandCode from './examples/tscCommand.txt?raw'
import reactTsScriptsCode from './examples/reactTsScripts.txt?raw'
import createViteTsCode from './examples/createViteTs.txt?raw'
import tsVsTsxCode from './examples/tsVsTsx.txt?raw'
import strictOptionCode from './examples/strictOption.txt?raw'
import projectTsconfigCode from '../../../../tsconfig.json?raw'
import runInference from './examples/inference.ts'
import inferenceCode from './examples/inference.ts?raw'
import annotationRulesCode from './examples/annotationRules.ts?raw'
import errNotAssignableCode from './examples/errNotAssignable.txt?raw'
import errArgumentCode from './examples/errArgument.txt?raw'
import errPropertyTypoCode from './examples/errPropertyTypo.txt?raw'
import errPossiblyUndefinedCode from './examples/errPossiblyUndefined.txt?raw'

export default {
  id: 'ts01',
  number: 1,
  title: 'How TypeScript Works',
  topics: [
    {
      id: 'what-is-typescript',
      title: 'What TypeScript is',
      summary:
        'TypeScript is JavaScript plus types. You write normal JavaScript and add type annotations after a colon; a checker then tells you about mistakes before the code runs.',
      notes: [
        'TypeScript is a superset of JavaScript: every valid JavaScript program is also valid TypeScript. You add types gradually.',
        'Types go after a colon: n: number for a parameter, ): string for a return value, let total: number for a variable.',
        'The extra syntax is only for the checker and your editor. The browser still runs plain JavaScript.',
        'In return you get errors while you type, autocomplete for every object and prop, and safer refactoring.',
      ],
      examples: [
        { title: 'JavaScript: formatRupiah.js', type: 'code', code: formatRupiahJsCode, lang: 'js' },
        { title: 'TypeScript: formatRupiah.ts', type: 'code', code: formatRupiahTsCode, lang: 'ts' },
      ],
    },
    {
      id: 'static-vs-dynamic',
      title: 'Static vs dynamic checking',
      summary:
        'PHP checks type hints while the code runs (dynamic). TypeScript checks types by reading the code, before it runs (static). Static checking finds mistakes even in code paths you never tested.',
      notes: [
        'Dynamic checking: types are verified at runtime, when the line executes. A wrong type is a TypeError, but only if that line actually runs.',
        'Static checking: a tool reads the source code and reports type errors without running anything, in the editor and in the terminal.',
        'Static checking covers every line, including rarely used branches, error handlers and month-end reports.',
        'PHP tools like PHPStan and Psalm do static checking for PHP. TypeScript is the same idea for JavaScript.',
      ],
      examples: [
        { title: 'PHP: int type hint → TypeError at runtime', type: 'code', code: phpTypeHintCode, lang: 'php' },
        { title: 'TypeScript: an error in the editor, before running', type: 'code', code: tsEditorErrorCode, lang: 'ts' },
      ],
    },
    {
      id: 'type-erasure',
      title: 'Type erasure',
      summary:
        'When TypeScript becomes JavaScript, every type annotation is simply deleted. Types exist while you write and check code; at runtime they are gone, and nothing checks them anymore.',
      notes: [
        'Type erasure: building removes type, interface, : Order, as Order and so on. The remaining code is plain JavaScript.',
        'So types cannot affect what the code does, and they can’t protect you at runtime.',
        'Data from outside (API responses, JSON, localStorage, form input) is NOT checked by TypeScript. The type only describes what you EXPECT.',
        'A type assertion (as Order) tells the checker "trust me". If you are wrong, nothing catches it.',
        'Checking API data at runtime needs a validator such as Zod (TS Part 8).',
      ],
      examples: [
        { title: 'What you write: orderLabel.ts', type: 'code', code: orderLabelCode, lang: 'ts' },
        {
          title: 'What runs: the same file with the types erased',
          type: 'code',
          code: orderLabelCompiledCode,
          lang: 'js',
        },
        {
          title: 'API data that doesn’t match the type',
          caption:
            'The JSON uses customer_name, but the type says customer. TypeScript is satisfied because of `as Order`, and at runtime the value is simply undefined, with no error.',
          type: 'js',
          run: runApiDataMismatch,
          code: apiDataMismatchCode,
          lang: 'ts',
        },
      ],
    },
    {
      id: 'where-checking-happens',
      title: 'Where checking happens',
      summary:
        'Types are checked by your editor while you type and by tsc in the terminal. Vite does NOT check types: it only strips them, so the dev server and vite build run code that has type errors.',
      notes: [
        'Editor (VS Code): checks continuously and underlines errors in red. Your first line of defence.',
        'tsc --noEmit: checks the whole project once. noEmit means "check only, don’t write JavaScript files".',
        'Vite removes types without checking them (very fast). A type error does not stop npm run dev or vite build.',
        'So a build should fail on type errors: the react-ts template runs tsc -b before vite build. In this project, run npm run typecheck before building.',
        'Run the type check in CI (GitHub Actions, GitLab CI) too, like running PHPUnit before deploying.',
      ],
      examples: [
        { title: 'Checking the whole project with tsc', type: 'code', code: tscCommandCode, lang: 'bash' },
        {
          title: 'The react-ts template: type check, then build',
          caption: 'tsc -b && vite build: if the type check fails, && stops and vite build never runs.',
          type: 'code',
          code: reactTsScriptsCode,
          lang: 'json',
        },
      ],
    },
    {
      id: 'project-setup',
      title: 'Project setup',
      summary:
        'Start new projects from Vite’s react-ts template, or add TypeScript to an existing one. Use .ts for code without JSX, .tsx for components, and keep "strict": true.',
      notes: [
        'New project: npm create vite@latest my-app -- --template react-ts.',
        'Existing project: install typescript, add a tsconfig.json, and convert files one at a time. allowJs lets .js and .ts live side by side (this handbook does exactly that).',
        '@types packages contain type definitions for libraries written in JavaScript. React’s are @types/react and @types/react-dom; many libraries ship their own types.',
        'Keep "strict": true. Without it TypeScript silently allows `any` and ignores undefined/null, which removes most of the benefit.',
        'tsconfig.json is to TypeScript what phpstan.neon is to PHPStan: which files, which rules.',
      ],
      examples: [
        { title: 'Creating a react-ts project', type: 'code', code: createViteTsCode, lang: 'bash' },
        { title: '.ts vs .tsx', type: 'code', code: tsVsTsxCode, lang: 'text' },
        { title: 'The strict option', type: 'code', code: strictOptionCode, lang: 'json' },
        {
          title: 'This project’s real tsconfig.json',
          caption: 'Loaded with ?raw from the project root, so it is always the current file.',
          type: 'code',
          code: projectTsconfigCode,
          lang: 'json',
        },
      ],
    },
    {
      id: 'annotations-inference',
      title: 'Annotations and inference',
      summary:
        'You don’t have to write types everywhere. TypeScript infers most types from values; you annotate function parameters and the few places where it can’t guess.',
      notes: [
        'Inference: let qty = 3 is a number, so writing let qty: number = 3 adds nothing.',
        'A const gets the exact literal type (const status = \'pending\' has the type "pending"); let widens it to string.',
        'Arrays and objects are inferred from their contents; map/filter/reduce results are inferred too.',
        'Always annotate function parameters. With strict, an unannotated parameter is an error (implicit any).',
        'Annotate variables without an initial value, and empty arrays you will fill later.',
        'Hover any variable in VS Code to see the type TypeScript inferred.',
      ],
      examples: [
        {
          title: 'Inferred types',
          caption: 'Run it, then read the comments: every type was inferred, and the only annotation is on run(log).',
          type: 'js',
          run: runInference,
          code: inferenceCode,
          lang: 'ts',
        },
        { title: 'When to annotate', type: 'code', code: annotationRulesCode, lang: 'ts' },
      ],
    },
    {
      id: 'reading-error-messages',
      title: 'Reading error messages',
      summary:
        'TypeScript error messages look long, but most follow a few patterns: "X is not assignable to Y", "property does not exist", and "possibly undefined". Read them as "you gave me X, I expected Y".',
      notes: [
        '"Type \'A\' is not assignable to type \'B\'": you put an A where a B was expected (assignment, return, prop).',
        '"Argument of type \'A\' is not assignable to parameter of type \'B\'": the same thing for a function argument.',
        '"Property \'x\' does not exist on type \'T\'. Did you mean \'y\'?": usually a typo, and the suggestion is the fix.',
        '"\'x\' is possibly \'undefined\'": handle the missing case first (if, ?., ??, early return).',
        'For long messages, read the LAST line first: it names the exact property that doesn’t match.',
        'The examples below are .txt snippets on purpose, so their errors don’t break npm run typecheck.',
      ],
      examples: [
        { title: 'Type \'string\' is not assignable to type \'number\'', type: 'code', code: errNotAssignableCode, lang: 'ts' },
        { title: 'Argument of type … is not assignable to parameter of type …', type: 'code', code: errArgumentCode, lang: 'ts' },
        { title: 'Property \'custmer\' does not exist … Did you mean \'customer\'?', type: 'code', code: errPropertyTypoCode, lang: 'ts' },
        { title: '\'order\' is possibly \'undefined\'', type: 'code', code: errPossiblyUndefinedCode, lang: 'tsx' },
      ],
    },
  ],
}
