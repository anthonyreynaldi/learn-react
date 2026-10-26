import threeStepsCode from './examples/threeSteps.txt?raw'
import RenderTriggers from './examples/RenderTriggers.jsx'
import renderTriggersCode from './examples/RenderTriggers.jsx?raw'
import sideEffectInRenderCode from './examples/sideEffectInRender.txt?raw'
import CommitOnlyChanges from './examples/CommitOnlyChanges.jsx'
import commitOnlyChangesCode from './examples/CommitOnlyChanges.jsx?raw'
import WrapperTypeChange from './examples/WrapperTypeChange.jsx'
import wrapperTypeChangeCode from './examples/WrapperTypeChange.jsx?raw'
import SameTypeKept from './examples/SameTypeKept.jsx'
import sameTypeKeptCode from './examples/SameTypeKept.jsx?raw'
import NoteFormBug from './examples/NoteFormBug.jsx'
import noteFormBugCode from './examples/NoteFormBug.jsx?raw'
import NoteFormKey from './examples/NoteFormKey.jsx'
import noteFormKeyCode from './examples/NoteFormKey.jsx?raw'
import keyResetUsesCode from './examples/keyResetUses.txt?raw'
import NestedComponentBug from './examples/NestedComponentBug.jsx'
import nestedComponentBugCode from './examples/NestedComponentBug.jsx?raw'
import runObjectIs from './examples/objectIs.js'
import objectIsCode from './examples/objectIs.js?raw'
import ImmutableUpdate from './examples/ImmutableUpdate.jsx'
import immutableUpdateCode from './examples/ImmutableUpdate.jsx?raw'
import StaleClosure from './examples/StaleClosure.jsx'
import staleClosureCode from './examples/StaleClosure.jsx?raw'
import phpClosureCode from './examples/phpClosure.txt?raw'

export default {
  id: 'part07',
  number: 7,
  title: 'How React Renders Under the Hood',
  topics: [
    {
      id: 'trigger-render-commit',
      title: 'Trigger, render, commit',
      summary:
        'Think of a restaurant. A guest places an order (trigger), the kitchen prepares it (render), and the waiter brings it to the table (commit). After the commit, the browser paints the updated DOM to the screen.',
      notes: [
        'Trigger: the initial render, or a state update somewhere in the tree.',
        'Render: React calls your component functions to work out what the screen should look like. Nothing visible changes yet.',
        'Commit: React applies the differences to the real DOM. On re-renders it touches only the nodes that changed.',
        'Paint: the browser draws the updated DOM on the screen. That part is the browser’s job, not React’s.',
        '"Rendering" in React means "calling your component", not "updating the screen".',
      ],
      examples: [
        {
          title: 'The three steps',
          type: 'code',
          code: threeStepsCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'what-triggers-a-render',
      title: 'What triggers a render',
      summary:
        'Only two things start a render: the initial render and a state update. Everything else (new props, children re-rendering) follows from a state update in some parent.',
      notes: [
        'Triggers: the initial render, and state updates (setX). That’s it.',
        'Props only change because the parent re-rendered and passed new values.',
        'When a component re-renders, all of its children re-render too, even if their props did not change.',
        'Only the subtree BELOW the state owner re-renders. Siblings and parents of the owner are not touched.',
      ],
      examples: [
        {
          title: 'Which components re-render?',
          caption:
            'Click +1: the parent and both children get a new timestamp; the sibling keeps its old one. Tip: in React DevTools, enable "Highlight updates when components render" to see this on any page.',
          type: 'react',
          component: RenderTriggers,
          code: renderTriggersCode,
        },
      ],
    },
    {
      id: 'render-must-be-pure',
      title: 'Render must be pure',
      summary:
        'React may call your component more often than you expect, or start a render and throw it away. So rendering must only calculate JSX: no side effects.',
      notes: [
        'A side effect changes something outside the function: a network request, writing to localStorage, changing a global variable, or mutating props or state.',
        'StrictMode (development only) renders every component twice to help you find impure code.',
        'Concurrent rendering: React may pause a render, restart it, or discard it if something more urgent happens. Side effects in render could run 0, 1 or many times.',
        'Side effects belong in event handlers (Part 5), or in useEffect when they must run because the component appeared (Part 8).',
      ],
      examples: [
        {
          title: 'A side effect in render vs in an event handler',
          type: 'code',
          code: sideEffectInRenderCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'commit-only-changes',
      title: 'Commit: render does not mean DOM update',
      summary:
        'A re-render creates new JSX for the whole component, but the commit step only changes the DOM nodes that are actually different. Everything else stays untouched.',
      notes: [
        'Re-rendering is calling the function. Committing is touching the DOM. These are different steps.',
        'React compares the new JSX with the previous JSX and updates only the differences.',
        'Unchanged DOM nodes keep their browser state: typed text, cursor position, focus, scroll position.',
      ],
      examples: [
        {
          title: 'Tick: only the time text changes',
          caption:
            'Type in the input, then click Tick several times. The component re-renders each time, but your text and focus are kept because React only updates the changed time text.',
          type: 'react',
          component: CommitOnlyChanges,
          code: commitOnlyChangesCode,
        },
      ],
    },
    {
      id: 'reconciliation',
      title: 'Reconciliation rules',
      summary:
        'Reconciliation is how React compares the new JSX with the previous JSX. Three simple rules decide whether a component (and its state) is kept or recreated.',
      notes: [
        'Rule 1: same type in the same position → React keeps the element and its state, and only updates changed props.',
        'Rule 2: different type in the same position (e.g. <div> → <section>) → React destroys the whole subtree, state included, and builds a new one.',
        'Rule 3: in lists, React matches items by key instead of by position (Part 6).',
        'React looks at the position in the JSX tree, not at variable names or how you wrote the code.',
      ],
      examples: [
        {
          title: 'Different wrapper type: the counter resets',
          caption: 'Increase the counter, then toggle "Use section wrapper". The counter resets to 0.',
          type: 'react',
          component: WrapperTypeChange,
          code: wrapperTypeChangeCode,
        },
        {
          title: 'Same type, different style: the counter is kept',
          caption: 'Increase the counter, then toggle "Highlight". Only the style changes; the count stays.',
          type: 'react',
          component: SameTypeKept,
          code: sameTypeKeptCode,
        },
      ],
    },
    {
      id: 'state-belongs-to-position',
      title: 'State belongs to a position',
      summary:
        'React stores state by position in the tree, not by the data a component shows. If the same component stays in the same position, it keeps its state, even when its props change completely.',
      notes: [
        'Changing props does not reset state. useState’s initial value is only used on the first render.',
        'NoteForm at the same position with customer="CV Sinar Abadi" is still the same NoteForm to React.',
        'This is usually what you want, but sometimes it is a bug: data from one item "leaks" into the next.',
      ],
      examples: [
        {
          title: 'The note follows the position, not the customer',
          caption:
            'Type a note for PT Maju Jaya, then switch to CV Sinar Abadi. The note stays: React kept the same NoteForm because its type and position did not change.',
          type: 'react',
          component: NoteFormBug,
          code: noteFormBugCode,
        },
      ],
    },
    {
      id: 'reset-state-with-key',
      title: 'Resetting state with a key',
      summary:
        'Give a component a key to tell React "this is a different one now". When the key changes, React unmounts the old component and mounts a fresh one with fresh state.',
      notes: [
        'key is not only for lists. Any element can have one.',
        '<NoteForm key={selected} /> gives each customer its own NoteForm, so switching customer resets the note.',
        'Common uses: key={order.id} on edit forms, key={reportVersion} for a Reset button.',
        'A key RESETS state. It does not remember the old note. To keep a note per customer, lift the state up into the parent (Part 10).',
      ],
      examples: [
        {
          title: 'Without key vs with key',
          caption: 'Type a note on both sides, then switch customer on both sides. Only the right one starts fresh.',
          type: 'react',
          component: NoteFormKey,
          code: noteFormKeyCode,
        },
        {
          title: 'Common uses of a key to reset state',
          type: 'code',
          code: keyResetUsesCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'components-inside-components',
      title: 'Components inside components',
      summary:
        'A component defined inside another component is re-created on every render. React sees a new type each time, so it remounts it and its state and focus are lost.',
      notes: [
        'Functions defined inside a component are created anew on every render.',
        'A new function is a new component type to React (Object.is says "different").',
        'Different type in the same position → destroy and remount (reconciliation rule 2).',
        'Fix: define every component at the top level of the file and pass data in through props.',
      ],
      examples: [
        {
          title: 'Two search boxes: inside vs top level',
          caption:
            'Type in both boxes. The left one loses focus after every keystroke: each render creates a new SearchInput function → new type → React unmounts the old input and mounts a new one.',
          type: 'react',
          component: NestedComponentBug,
          code: nestedComponentBugCode,
        },
      ],
    },
    {
      id: 'why-immutability',
      title: 'Why immutability matters',
      summary:
        'React decides whether state changed with Object.is: same reference means "unchanged". Creating new objects instead of mutating is what makes this quick check correct.',
      notes: [
        'Cheap change detection: comparing two references is instant, with no need to compare every field.',
        'Old snapshots stay correct: earlier renders and closures still see the data they were created with.',
        'memo, useMemo and useCallback (Part 11) rely on the same reference check to skip work.',
        'Mutating state breaks all of this: React sees "the same object" and skips the update.',
      ],
      examples: [
        {
          title: 'Object.is with primitives, the same object, and a copy',
          type: 'js',
          run: runObjectIs,
          code: objectIsCode,
        },
        {
          title: 'Mutated object vs new object',
          caption: 'Click Approve on both. Only the right one updates.',
          type: 'react',
          component: ImmutableUpdate,
          code: immutableUpdateCode,
        },
      ],
    },
    {
      id: 'closures-stale-values',
      title: 'Closures and stale values',
      summary:
        'Every render has its own variables, and functions created during that render remember them. A delayed callback still sees the value from the render where it was created, even if newer renders exist.',
      notes: [
        'A closure is a function that remembers the variables around it, like PHP’s function () use ($count).',
        'An event handler belongs to one render and sees that render’s state snapshot.',
        'Fix for updates: use an updater function, setX(prev => …), so React gives you the latest value.',
        'Need to READ the latest value later (not just update it)? A ref can hold it. That is Part 11.',
      ],
      examples: [
        {
          title: 'A delayed report sees the old count',
          caption:
            'Click "Report…", then quickly click +1 several times. After 3 seconds the message shows the count from the moment you clicked Report, not the current count.',
          type: 'react',
          component: StaleClosure,
          code: staleClosureCode,
        },
        {
          title: 'PHP closures: use ($count)',
          type: 'code',
          code: phpClosureCode,
          lang: 'php',
        },
      ],
    },
    {
      id: 'performance-basics',
      title: 'Performance basics',
      summary:
        'React is fast by default. Re-rendering is usually cheap, and the commit only touches what changed. Optimize only when you can see or measure a real problem.',
      notes: [
        'Rendering is just calling functions and comparing objects. That is cheap for normal component trees.',
        'The commit only changes DOM nodes that differ, and DOM work is the expensive part.',
        'Optimize only when needed: measure first (React DevTools Profiler), don’t guess.',
        'Keep state as low in the tree as possible, so a state change re-renders a smaller subtree.',
        'Never create component types during render (see "Components inside components").',
        'The React Compiler can add memoization automatically at build time.',
        'Manual tools: memo, useMemo and useCallback, covered in Part 11.',
      ],
      examples: [],
    },
    {
      id: 'summary',
      title: 'Summary: rules and their reasons',
      summary:
        'Most React rules from earlier parts come from how rendering works. This table connects each rule to its reason.',
      notes: [
        'Keep components pure (Part 3) → React may render twice (StrictMode) or discard renders (concurrent rendering).',
        'Give list items a key (Part 6) → React matches list items between renders by key.',
        'Don’t use the index as key (Part 6) → state is kept by key, so it would stick to a position instead of an item.',
        'Don’t define components inside components (Part 3) → each render creates a new type, so React remounts and loses state and focus.',
        'Don’t mutate state (Part 5) → React detects changes with Object.is; the same object means "no change".',
        'Use updater functions for repeated or delayed updates (Part 5) → handlers see a stale snapshot; setX(prev => …) gets the latest value.',
        'Use a key to reset a form (this part) → same type and position keep state; a new key forces a fresh component.',
      ],
      examples: [],
    },
  ],
}
