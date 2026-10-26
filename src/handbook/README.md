# React Handbook

A reference app for the React lessons. The sidebar lists every part and topic.
Each topic page shows a summary, key points, and examples with their live
result and source code.

Open it with `npm run dev`. The selected topic is kept in the URL hash
(e.g. `#part03/jsx-rules`), so refresh and the Back button work.

## Folder structure

```
src/handbook/
├── Handbook.jsx          page layout (header, sidebar, topic)
├── HeaderBar.jsx         title + light/dark toggle + menu button
├── Sidebar.jsx           search box + part groups (drawer on narrow screens)
├── SidebarPartGroup.jsx  one collapsible part in the sidebar
├── TopicView.jsx         breadcrumb, summary, key points, examples, prev/next
├── KeyPoints.jsx         "Key points" callout
├── PrevNext.jsx          Previous/Next cards
├── ExampleBlock.jsx      one example card (Result/Output + Code)
├── ReactResult.jsx       renders a "react" example live
├── JsRunner.jsx          Run button + console output for "js" examples
├── CodeBlock.jsx         highlighted code + Copy button
├── ChatPanel.jsx         "Ask AI" button + chat panel
├── ChatMessage.jsx       one chat message (Markdown answer)
├── ai/                   AI helpers: context builder, useChat, Vite server plugin
├── lib/                  small helpers (hash routing, theme, highlighter, ...)
├── handbook.css          Tailwind + base styles for the Result box
├── registry.js           the tracks (React, TypeScript) and their parts, in order
└── parts/
    ├── part00/           React track: "Part 0" ... "Part 13"
    │   ├── index.js      the part object (topics + examples)
    │   └── examples/     the example files you study
    ├── part01/
    ├── ...
    ├── ts01/             TypeScript track: "TS Part 1", "TS Part 2", ...
    └── tan01/            TanStack track: "TanStack Part 1" ... (registered like TS parts)
        ├── index.ts      the part object, written in TypeScript
        └── examples/     .ts / .tsx examples (+ .txt snippets)
```

The **shell** files (everything outside `parts/`) use concepts from later parts
and libraries. You don't need to understand them yet. The **example** files in
`parts/*/examples/` are plain React + JavaScript, with no libraries and no
Tailwind, so the code you study is pure React. Two parts have a deliberate
exception (see "Library exceptions in examples" below).

## Add a new part

1. Create `src/handbook/parts/part05/` with an `examples/` folder.
2. Create `part05/index.js`:

   ```js
   export default {
     id: 'part05',
     number: 5,
     title: 'State',
     topics: [
       // topics go here (see below)
     ],
   }
   ```

3. Register it in `src/handbook/registry.js`: one import, plus one entry in the
   React track's `parts` array:

   ```js
   import part05 from './parts/part05'

   export const tracks = [
     { id: 'react', title: 'React', label: 'Part', parts: [part00, /* ... */ part05] },
     // ...
   ]
   ```

## Add a TypeScript part

The sidebar shows groups ("tracks"): **React** (Part 0, Part 1, ...),
**TypeScript** (TS Part 1, TS Part 2, ...) and **TanStack** (TanStack Part 1, ...). TypeScript parts work
exactly like React parts, with three differences:

1. The folder is `src/handbook/parts/tsNN/` (e.g. `ts02`) and the part object
   lives in `index.ts`:

   ```ts
   import runNarrowing from './examples/narrowing.ts'
   import narrowingCode from './examples/narrowing.ts?raw'

   export default {
     id: 'ts02',
     number: 2, // shown as "TS Part 2", sidebar badge "TS2"
     title: 'Everyday Types',
     topics: [
       // same topic shape as React parts
     ],
   }
   ```

2. Example files are `.ts` (no JSX) or `.tsx` (with JSX). Set `lang: 'ts'` or
   `lang: 'tsx'` on every example so the code is highlighted as TypeScript
   (runnable "js" examples then show a "TypeScript" badge). A runnable example
   types its parameter: `export default function run(log: Log)` with
   `type Log = (...values: unknown[]) => void`.

3. Register it in the TypeScript track in `registry.js`:

   ```js
   import ts02 from './parts/ts02/index.ts'

   // in tracks: { id: 'typescript', title: 'TypeScript', label: 'TS Part', ..., parts: [ts01, ts02] }
   ```

**Examples must pass the type check.** Real `.ts`/`.tsx` files in `examples/`
are checked by `npm run typecheck` (`tsc --noEmit`, see `tsconfig.json`). Code
that is *supposed* to show a type error goes into a `.txt` snippet (or into a
comment), never into a real `.ts` file. Vite itself doesn't check types, so run
`npm run typecheck` before `npm run build`.

## Add a new topic

Add an object to the part's `topics` array. The order in the array is the order
in the sidebar and for Previous/Next.

```js
{
  id: 'use-state',               // kebab-case, unique within the part → #part05/use-state
  title: 'useState',
  summary: '1–3 plain sentences.',
  notes: ['Key point 1', 'Key point 2'],
  examples: [ /* see below */ ],
}
```

## Add an example

Every example has a `title`, an optional `caption`, a `type`, and `code`.
`code` always comes from a `?raw` import of the real file. That is Vite's way
of importing a file's text, so the displayed code is exactly the code that runs.

**"react": live result + code.** The file default-exports a component.

```js
import Counter from './examples/Counter.jsx'
import counterCode from './examples/Counter.jsx?raw'

{ title: 'A counter', type: 'react', component: Counter, code: counterCode }
```

**"js": Run button + console output + code.** The file default-exports
`run(log)` (may be `async`). Each `log(...values)` call prints one line.

```js
// examples/mapDemo.js
export default function run(log) {
  log([1, 2, 3].map((n) => n * 2))
}
```

```js
import runMap from './examples/mapDemo.js'
import mapCode from './examples/mapDemo.js?raw'

{ title: 'map', type: 'js', run: runMap, code: mapCode }
```

**"code": for reading only, not runnable.** Put the snippet in a `.txt` file.

```js
import bladeCode from './examples/bladeView.txt?raw'

{ title: 'The Blade version', type: 'code', code: bladeCode, lang: 'php' }
```

`lang` sets the syntax highlighting: `jsx`, `js`, `html`, `json`, `bash`,
`php`, `ts`, `tsx` or `text`. It defaults to `jsx` for "react", `js` for "js" and `text`
for "code". Set it for "code" examples, and to `jsx` for a "js" example
whose file is `.jsx`.

## Libraries used (shell only)

| Library | Used for |
| --- | --- |
| [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/vite` | Styling of the handbook shell (utility classes, dark mode). The Vite plugin is added in `vite.config.js`. |
| [Shiki](https://shiki.style) | Syntax highlighting in code blocks. Only the needed languages and one theme are loaded, lazily, in `lib/highlighter.js`. |
| [lucide-react](https://lucide.dev) | Icons (menu, search, sun/moon, copy, play, ...). |
| [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) | Render the AI's Markdown answers (lists, tables, code blocks). |
| [@anthropic-ai/sdk](https://github.com/anthropics/anthropic-sdk-typescript) | Calls Claude from the Vite server plugin (Node only, never in the browser). |

Example files never import these libraries.

## Library exceptions in examples

Some parts teach libraries, so their example files may import them:

| Part | Library | Notes |
| --- | --- | --- |
| Part 12 — Real App Architecture | [react-router](https://reactrouter.com) | Runnable examples use `MemoryRouter` (the handbook already uses the real URL hash) with a fake address bar (`parts/part12/examples/router/AddressBar.jsx`). Real apps use `BrowserRouter` in `main.jsx`. |
| Part 13 — Where to Go Next | [@tanstack/react-query](https://tanstack.com/query) | Only the TanStack Query example imports it; it creates its own `QueryClient`. |
| TS Part 8 — Data from the Outside World | [zod](https://zod.dev) | Runtime validation of API data, JSON and storage. The examples fetch real JSON files from `public/handbook-data/ts8/`. |
| TanStack Parts 1–4 (`tan01`–`tan04`) | [@tanstack/react-query](https://tanstack.com/query), [@tanstack/react-form](https://tanstack.com/form), [@tanstack/react-table](https://tanstack.com/table) (V9), zod | A third sidebar group, "TanStack". All four parts share the fake API in `parts/tan01/examples/shared/ordersApi.ts` and import across parts with the `@/` alias. |

Every other tool in Part 13 (TypeScript, React Hook Form, Zod, Zustand,
react-error-boundary, Vitest, Testing Library, component libraries) is shown as
"code" examples only and is **not** installed.

Build notes for these parts (in `vite.config.js`): React Router, TanStack
Query and Zod get their own output files, and every part's content is split into its own
file too, so no file goes over Vite's 500 kB warning. Files named `*.lazy.jsx`
are excluded from that split on purpose, so `lazy()` examples really load a
separate file on demand.

## Notes

- `handbook.css` overrides the default Vite styles from `src/index.css`
  (centered `#root`, big headings) without editing that file.
- The Result box always has a white background and its own base styles for
  plain HTML (headings, lists, tables, buttons, inputs), because Tailwind's
  reset removes browser defaults.
- Examples render inside React's `StrictMode`, so in development some code
  runs twice. A few examples (Part 3 pure components, Part 4 read-only props)
  use this on purpose. The ↺ button in a Result box remounts the example.

## Ask AI (chatbot)

The **Ask AI** button (bottom right) opens a chat panel. Every question is sent
together with the topic that is open at that moment (title, summary, key points
and the source code of every example) plus the table of contents of the whole
handbook, so the AI knows what you are looking at and can point to other topics.
The conversation is kept when you switch topics; **New chat** clears it.

### Setup (once)

1. Get an API key at <https://platform.claude.com> (API keys page).
2. Copy `.env.example` (project root) to `.env.local` and fill it in:

   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

   `.env.local` is git-ignored, so the key is never committed.
3. Restart `npm run dev`.

### How it works

```
Browser (ChatPanel) ──POST /__handbook/chat──► Vite server plugin ──► Claude API
                    ◄────── answer streamed back as plain text ◄──────┘
```

- `ai/chatServerPlugin.js` runs **in Node** inside the Vite dev and preview
  servers. It is the only place that sees the API key. `vite.config.js` reads
  the key with `loadEnv` and, because it has no `VITE_` prefix, Vite never puts
  it into browser code.
- The chat only works with `npm run dev` or `npm run preview`. A static
  `dist/` upload has no server, so there is no chat endpoint there.
- Model: `claude-opus-5-5`, streaming, effort `medium`. If a question is
  declined by the model's safety classifiers, `fallbacks: "default"` re-runs it
  on a fallback model automatically.
- Prompt caching: the instructions, the table of contents and the topic
  context are cached, so follow-up questions on the same topic are cheaper and
  faster. The terminal running `npm run dev` logs the token usage of each
  answer, including how many tokens came from the cache.
- Cost: Claude Opus 5.5 is $4 per million input tokens and $20 per million
  output tokens (cached input is much cheaper). A typical question about one
  topic costs around a few cents.
- To change the AI's behaviour, edit `INSTRUCTIONS` in `ai/chatServerPlugin.js`.
  To change what context is sent, edit `ai/buildContext.js`.

