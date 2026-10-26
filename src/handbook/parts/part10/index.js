import stateLocationTreeCode from './examples/stateLocationTree.txt?raw'
import OrdersPage from './examples/OrdersPage.jsx'
import ordersPageCode from './examples/OrdersPage.jsx?raw'
import CustomerNotes from './examples/CustomerNotes.jsx'
import customerNotesCode from './examples/CustomerNotes.jsx?raw'
import ControlledPanels from './examples/ControlledPanels.jsx'
import controlledPanelsCode from './examples/ControlledPanels.jsx?raw'
import DuplicationBug from './examples/DuplicationBug.jsx'
import duplicationBugCode from './examples/DuplicationBug.jsx?raw'
import StatusString from './examples/StatusString.jsx'
import statusStringCode from './examples/StatusString.jsx?raw'
import contradictoryBooleansCode from './examples/contradictoryBooleans.txt?raw'
import nestedVsNormalizedCode from './examples/nestedVsNormalized.txt?raw'
import PropDrilling from './examples/PropDrilling.jsx'
import propDrillingCode from './examples/PropDrilling.jsx?raw'
import propDrillingTreeCode from './examples/propDrillingTree.txt?raw'
import Composition from './examples/Composition.jsx'
import compositionCode from './examples/Composition.jsx?raw'
import settingsContextCode from './examples/SettingsContext.js?raw'
import ContextPrice from './examples/ContextPrice.jsx'
import contextPriceCode from './examples/ContextPrice.jsx?raw'
import authContextCode from './examples/AuthContext.jsx?raw'
import AuthDemo from './examples/AuthDemo.jsx'
import authDemoCode from './examples/AuthDemo.jsx?raw'
import linesReducerCode from './examples/linesReducer.js?raw'
import ReducerOrderLines from './examples/ReducerOrderLines.jsx'
import reducerOrderLinesCode from './examples/ReducerOrderLines.jsx?raw'
import runTestLinesReducer from './examples/testLinesReducer.js'
import testLinesReducerCode from './examples/testLinesReducer.js?raw'
import useStateVsReducerCode from './examples/useStateVsReducer.txt?raw'
import cartContextCode from './examples/CartContext.jsx?raw'
import CartDemo from './examples/CartDemo.jsx'
import cartDemoCode from './examples/CartDemo.jsx?raw'

export default {
  id: 'part10',
  number: 10,
  title: 'Organizing State',
  topics: [
    {
      id: 'where-state-lives',
      title: 'Where should state live',
      summary:
        'Put each piece of state in the closest common parent of all the components that use it, and no higher. Keep it as low in the tree as you can.',
      notes: [
        'Step 1: find every component that reads or changes the state.',
        'Step 2: find their closest common parent. The state goes there.',
        'Step 3: pass the value down as props, and pass a function down for changes.',
        'If only one component uses the state, keep it inside that component.',
        'Lower state means fewer components re-render when it changes, and the code is easier to follow.',
      ],
      examples: [
        {
          title: 'Finding the right place on the tree',
          type: 'code',
          code: stateLocationTreeCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'lifting-state-up',
      title: 'Lifting state up',
      summary:
        'When two siblings need the same state, move it up into their parent. The parent passes the value down and the children report changes through callback props.',
      notes: [
        'The parent owns the state; the children become simple "display + report" components.',
        'Store ids, and derive objects: orders.find((o) => o.id === selectedId).',
        'Changes always happen in the owner. Children call onSelect, onApprove, onChange.',
        'Lifting state up is how you KEEP state that a key would reset (Part 7).',
      ],
      examples: [
        {
          title: 'OrdersPage: list + detail share selectedId',
          caption: 'Click an order on the left, then Approve it on the right: the list updates too, because both read the same orders array.',
          type: 'react',
          component: OrdersPage,
          code: ordersPageCode,
        },
        {
          title: 'CustomerNotes: one note per customer',
          caption:
            'In Part 7 the note either stuck to the wrong customer (no key) or was lost (with a key). Here the parent remembers a note for every customer, and NoteForm has no state at all.',
          type: 'react',
          component: CustomerNotes,
          code: customerNotesCode,
        },
      ],
    },
    {
      id: 'controlled-uncontrolled-components',
      title: 'Controlled vs uncontrolled components',
      summary:
        'A component is uncontrolled when it keeps its own state, and controlled when its parent drives it through props. The same idea as controlled inputs, applied to your own components.',
      notes: [
        'Uncontrolled: the component owns its state (Panel with its own isOpen). Easy to use, but the parent can’t coordinate it.',
        'Controlled: the important information comes from props (isOpen, onToggle). More wiring, but the parent is in full control.',
        'Use controlled when the parent must coordinate children, e.g. "only one panel open at a time".',
        'Many components start uncontrolled and are lifted to controlled when a new requirement appears.',
      ],
      examples: [
        {
          title: 'Independent panels vs an accordion',
          caption: 'Left: each panel opens on its own. Right: opening one panel closes the other, because the parent stores which one is open.',
          type: 'react',
          component: ControlledPanels,
          code: controlledPanelsCode,
        },
      ],
    },
    {
      id: 'choosing-state-structure',
      title: 'Choosing state structure',
      summary:
        'Well-structured state makes bugs impossible instead of merely unlikely. Five principles help: group related state, avoid contradictions, redundancy, duplication and deep nesting.',
      notes: [
        'Group related state: if two values always change together, put them in one object.',
        'Avoid contradictions: one status string instead of several booleans that can disagree.',
        'Avoid redundancy: don’t store what you can calculate (Part 5).',
        'Avoid duplication: store an id, not a copy of an object that already lives in a list.',
        'Avoid deep nesting: keep state flat (normalized), like database tables linked by ids.',
      ],
      examples: [
        {
          title: 'Duplication bug: storing a copy vs storing the id',
          caption:
            'On both sides, click Select on #101, then Approve on #101. The left detail still says "pending" because it shows a stale copy. The right one derives the order and says "approved".',
          type: 'react',
          component: DuplicationBug,
          code: duplicationBugCode,
        },
        {
          title: 'One status string',
          type: 'react',
          component: StatusString,
          code: statusStringCode,
        },
        {
          title: 'Three booleans vs one status string',
          type: 'code',
          code: contradictoryBooleansCode,
          lang: 'jsx',
        },
        {
          title: 'Nested vs normalized state',
          type: 'code',
          code: nestedVsNormalizedCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'prop-drilling',
      title: 'Prop drilling',
      summary:
        'Prop drilling is passing a prop through several components that don’t need it, only to reach one deep component that does. It works, but it couples every component on the way.',
      notes: [
        'A little drilling (one or two levels) is fine and very explicit.',
        'Deep drilling makes the middle components depend on data they don’t use.',
        'Fixes: composition (pass finished elements down) or context (let deep components read it).',
        'Try composition first. It needs no new concepts.',
      ],
      examples: [
        {
          title: 'currentUser through Layout → Sidebar → Menu → UserBadge',
          type: 'react',
          component: PropDrilling,
          code: propDrillingCode,
        },
        {
          title: 'The drilling path',
          type: 'code',
          code: propDrillingTreeCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'composition',
      title: 'Composition',
      summary:
        'Instead of passing data down for a deep child to render, let the top component render the child itself and pass the finished element down through children or a "slot" prop.',
      notes: [
        'Components that accept children (or props like sidebar) don’t need to know what is inside.',
        'The component that HAS the data creates the element that USES it.',
        'Like Blade layouts with @yield and @section, or {{ $slot }} in components.',
        'This often removes the need for context entirely.',
      ],
      examples: [
        {
          title: 'The same UI with children and a sidebar prop',
          caption: 'Same screen as "Prop drilling", but Layout, Sidebar and Menu no longer receive the user.',
          type: 'react',
          component: Composition,
          code: compositionCode,
        },
      ],
    },
    {
      id: 'context',
      title: 'Context',
      summary:
        'Context lets a parent provide a value to its whole subtree. Any component below can read it with useContext, however deep it is, without props in between.',
      notes: [
        'createContext(defaultValue) creates the context. The default is used only when there is no provider above.',
        '<SettingsContext value={...}> provides a value (React 19). Older code uses <SettingsContext.Provider value={...}>.',
        'useContext(SettingsContext) reads the value of the NEAREST provider above.',
        'Nested providers override the value for their part of the tree.',
        'Similar to View::share() in Laravel: data every view can use without passing it in.',
        'Every component that reads a context re-renders when the provided value changes.',
        'Good for: current user, theme, language/locale, settings. Not a replacement for all props.',
      ],
      examples: [
        {
          title: 'SettingsContext.js',
          type: 'code',
          code: settingsContextCode,
          lang: 'js',
        },
        {
          title: 'Price reads locale and currency from context',
          type: 'react',
          component: ContextPrice,
          code: contextPriceCode,
        },
      ],
    },
    {
      id: 'provider-pattern',
      title: 'Provider pattern',
      summary:
        'Wrap a context, its state and its rules in one file: a Provider component that owns the state, and a custom hook to read it. The rest of the app only sees AuthProvider and useAuth().',
      notes: [
        'The provider owns the state (useState) and shares the value plus the functions to change it.',
        'useAuth() is a small custom hook (Part 11) around useContext, with a clear error if no provider is above.',
        'The context object itself is not exported, so nobody can bypass the provider or read it differently.',
        'Hiding the Approve button for staff is only UX: Laravel must still check permissions on the server.',
      ],
      examples: [
        {
          title: 'AuthContext.jsx: AuthProvider + useAuth',
          type: 'code',
          code: authContextCode,
          lang: 'jsx',
        },
        {
          title: 'Log in as admin or staff',
          caption: 'Log in as Budi: Approve buttons appear. Log in as Sari: they disappear. LoginBar, UserBadge and OrderList share no props.',
          type: 'react',
          component: AuthDemo,
          code: authDemoCode,
        },
      ],
    },
    {
      id: 'use-reducer',
      title: 'useReducer',
      summary:
        'useReducer moves all update logic into one pure function, the reducer. Event handlers only dispatch actions that describe what happened, and the reducer decides the next state.',
      notes: [
        'const [state, dispatch] = useReducer(reducer, initialState).',
        'reducer(state, action) returns the next state. It must be pure: no side effects, no random ids, no mutation.',
        'Actions are plain objects such as { type: "removed_line", id }. Name types after what happened.',
        'Side effects (logging, fetch, crypto.randomUUID) go in the event handler, and their results are passed in the action.',
        'Reducers are plain functions, so you can test them without React.',
        'Use it when many handlers update the same state in different ways.',
      ],
      examples: [
        {
          title: 'OrderLinesForm with linesReducer',
          caption: 'Every change dispatches an action. The Action log shows each one, logged in the event handler, never in the reducer.',
          type: 'react',
          component: ReducerOrderLines,
          code: reducerOrderLinesCode,
        },
        {
          title: 'linesReducer.js',
          type: 'code',
          code: linesReducerCode,
          lang: 'js',
        },
        {
          title: 'Testing the reducer without React',
          caption: 'The last call uses an unknown action type on purpose, so the red error at the end is expected.',
          type: 'js',
          run: runTestLinesReducer,
          code: testLinesReducerCode,
        },
        {
          title: 'useState version vs useReducer version',
          type: 'code',
          code: useStateVsReducerCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'reducer-and-context',
      title: 'Reducer + context',
      summary:
        'Combine them for app-wide state: useReducer holds the logic, context delivers the state and dispatch to any component. It is a small store without extra libraries.',
      notes: [
        'The provider calls useReducer and provides both the state and dispatch.',
        'Two contexts (state and dispatch) let components that only dispatch avoid depending on the data.',
        'Any component below can read the cart or dispatch actions. No props connect them.',
        'Totals stay derived: calculate them from the items, don’t store them.',
      ],
      examples: [
        {
          title: 'CartContext.jsx: reducer + two contexts',
          type: 'code',
          code: cartContextCode,
          lang: 'jsx',
        },
        {
          title: 'A small cart',
          caption: 'Add products on the left; the separate cart summary on the right updates. Use −/+ to change quantities.',
          type: 'react',
          component: CartDemo,
          code: cartDemoCode,
        },
      ],
    },
    {
      id: 'when-to-use-what',
      title: 'When to use what',
      summary: 'A decision list for where state goes, from the simplest option to the most powerful.',
      notes: [
        'Only one component needs it → local useState in that component.',
        'Siblings need it → lift it up to the closest common parent.',
        'A prop passes through components that don’t use it → try composition (children, slot props) first.',
        'Many components at different depths need it (user, theme, locale) → context.',
        'Complex update logic with many actions → useReducer.',
        'App-wide state with complex updates → context + reducer.',
        'Data from the server (orders, customers) → a server-state library such as TanStack Query (Part 13).',
        'Zustand and Redux exist for large client-side stores, but most Laravel-backed apps don’t need them.',
      ],
      examples: [],
    },
  ],
}
