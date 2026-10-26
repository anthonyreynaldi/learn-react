import NormalVariable from './examples/NormalVariable.jsx'
import normalVariableCode from './examples/NormalVariable.jsx?raw'
import Counter from './examples/Counter.jsx'
import counterCode from './examples/Counter.jsx?raw'
import ClickHandler from './examples/ClickHandler.jsx'
import clickHandlerCode from './examples/ClickHandler.jsx?raw'
import ApproveWithArgument from './examples/ApproveWithArgument.jsx'
import approveWithArgumentCode from './examples/ApproveWithArgument.jsx?raw'
import SearchInput from './examples/SearchInput.jsx'
import searchInputCode from './examples/SearchInput.jsx?raw'
import FormSubmit from './examples/FormSubmit.jsx'
import formSubmitCode from './examples/FormSubmit.jsx?raw'
import onClickCompareCode from './examples/onClickCompare.txt?raw'
import Snapshot from './examples/Snapshot.jsx'
import snapshotCode from './examples/Snapshot.jsx?raw'
import PlusThree from './examples/PlusThree.jsx'
import plusThreeCode from './examples/PlusThree.jsx?raw'
import renderCycleCode from './examples/renderCycle.txt?raw'
import UpdaterFunction from './examples/UpdaterFunction.jsx'
import updaterFunctionCode from './examples/UpdaterFunction.jsx?raw'
import ObjectState from './examples/ObjectState.jsx'
import objectStateCode from './examples/ObjectState.jsx?raw'
import ArrayState from './examples/ArrayState.jsx'
import arrayStateCode from './examples/ArrayState.jsx?raw'
import NestedObject from './examples/NestedObject.jsx'
import nestedObjectCode from './examples/NestedObject.jsx?raw'
import mutateVsCopyCode from './examples/mutateVsCopy.txt?raw'
import TwoCounters from './examples/TwoCounters.jsx'
import twoCountersCode from './examples/TwoCounters.jsx?raw'
import QuantityPicker from './examples/QuantityPicker.jsx'
import quantityPickerCode from './examples/QuantityPicker.jsx?raw'
import derivedWrongCode from './examples/derivedWrong.txt?raw'
import OrderApproval from './examples/OrderApproval.jsx'
import orderApprovalCode from './examples/OrderApproval.jsx?raw'
import rulesOfHooksCode from './examples/rulesOfHooks.txt?raw'

export default {
  id: 'part05',
  number: 5,
  title: 'State and Events',
  topics: [
    {
      id: 'normal-variable',
      title: "Why a normal variable doesn't work",
      summary:
        'Changing a normal variable inside a component does not update the screen. React only re-renders when state changes, and every render starts again from the top of the function.',
      notes: [
        'React does not watch normal variables, so changing one never triggers a re-render.',
        'Even if the component re-rendered, let count = 0 would run again and reset the value.',
        'Like Laravel: each render starts from scratch, just like each request runs the controller from scratch.',
        'State is React’s memory between renders, a bit like the session in Laravel. It lives in the browser and is lost on a page refresh.',
      ],
      examples: [
        {
          title: 'A counter with let count = 0',
          caption:
            "React doesn't re-render when a normal variable changes, and local variables reset on every render. Click the button: the console shows 1, 2, 3… but the screen stays at 0.",
          type: 'react',
          component: NormalVariable,
          code: normalVariableCode,
        },
      ],
    },
    {
      id: 'use-state',
      title: 'useState',
      summary:
        'useState gives a component a piece of memory that survives re-renders. Calling its setter stores the new value and tells React to render the component again.',
      notes: [
        'useState returns an array of two things, [value, setter], which we name with array destructuring.',
        'Convention: [x, setX], for example [count, setCount] or [order, setOrder].',
        'The initial value (useState(0)) is used only on the first render. After that React remembers the current value.',
        'A component can call useState several times, one state variable per piece of information.',
        'A hook is a special React function whose name starts with "use". Hooks let components "hook into" React features such as state.',
      ],
      examples: [
        {
          title: 'A working counter',
          caption: 'Two state variables: count and step. Each setter call re-renders the component with the new values.',
          type: 'react',
          component: Counter,
          code: counterCode,
        },
      ],
    },
    {
      id: 'handling-events',
      title: 'Handling events',
      summary:
        'Event handlers are functions you pass to props like onClick, onChange and onSubmit. React calls them when the event happens and passes an event object.',
      notes: [
        'Pass the function itself: onClick={handleClick}. Do not call it: onClick={handleClick()}.',
        'To pass an argument, wrap the call in an arrow function: onClick={() => handleApprove(101)}.',
        'Handlers receive an event object e. For inputs, e.target.value is the current text.',
        'For forms, use onSubmit on the <form> and call e.preventDefault() to stop the page reload.',
        'Naming convention: handleClick, handleChange, handleSubmit, handleApprove.',
      ],
      examples: [
        {
          title: 'onClick with a handler function',
          type: 'react',
          component: ClickHandler,
          code: clickHandlerCode,
        },
        {
          title: 'Passing an argument with an arrow function',
          type: 'react',
          component: ApproveWithArgument,
          code: approveWithArgumentCode,
        },
        {
          title: 'onChange and e.target.value',
          type: 'react',
          component: SearchInput,
          code: searchInputCode,
        },
        {
          title: 'onSubmit and e.preventDefault()',
          caption: 'Click Save or press Enter in the input. The page does not reload.',
          type: 'react',
          component: FormSubmit,
          code: formSubmitCode,
        },
        {
          title: 'onClick={handleClick} vs onClick={handleClick()}',
          type: 'code',
          code: onClickCompareCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 're-rendering-snapshots',
      title: 'Re-rendering and snapshots',
      summary:
        'Setting state does not change the variable you already have. It schedules a new render, and that new render gets the new value. Inside one render, state is a fixed snapshot.',
      notes: [
        'setCount(count + 1) does not change count in the current function call.',
        'Reading count right after setCount still gives the old value.',
        'Calling setCount(count + 1) three times uses the same snapshot three times, so it only adds 1.',
        'Each render is a new call of your component function, with its own props, state and handlers.',
      ],
      examples: [
        {
          title: 'Reading state right after setting it',
          caption: 'The message is created in the same click handler, right after setCount, and it shows the OLD value.',
          type: 'react',
          component: Snapshot,
          code: snapshotCode,
        },
        {
          title: 'The "+3" button that only adds 1',
          type: 'react',
          component: PlusThree,
          code: plusThreeCode,
        },
        {
          title: 'The render cycle in 7 steps',
          type: 'code',
          code: renderCycleCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'updater-function-batching',
      title: 'Updater function and batching',
      summary:
        'Pass a function to the setter, setCount(c => c + 1), when the new value depends on the previous one. React also batches all state updates from one event into a single re-render.',
      notes: [
        'setCount(count + 1) uses the snapshot value. setCount(c => c + 1) uses the latest queued value.',
        'React runs queued updater functions in order: 0 → 1 → 2 → 3.',
        'Batching: React waits until the event handler finishes, then re-renders once, no matter how many setters you called.',
        'Use the updater form when you update the same state several times in a row, or when the update depends on the previous value.',
      ],
      examples: [
        {
          title: 'Value vs updater function',
          caption:
            'Both buttons call the setter three times, and both cause only ONE re-render because of batching. Only the updater version adds 3. (A render counter isn’t shown on purpose: counting renders with a mutable variable would make the component impure, see Part 3.)',
          type: 'react',
          component: UpdaterFunction,
          code: updaterFunctionCode,
        },
      ],
    },
    {
      id: 'objects-arrays-state',
      title: 'Objects and arrays in state',
      summary:
        'Treat objects and arrays in state as read-only. To change one, create a new copy with the change and pass that copy to the setter.',
      notes: [
        'React compares the old and new state with ===. Same object means "no change", so mutating it and passing it back does not re-render.',
        'Objects: { ...order, status: "approved" } copies the order and overrides one field.',
        'Arrays: add with [...arr, item], remove with filter, change one item with map + ternary + spread.',
        'Nested objects: copy every level you change, e.g. { ...order, customer: { ...order.customer, city } }.',
        'Avoid push, splice, arr[i] = ... and sort() on state. They change the original array.',
      ],
      examples: [
        {
          title: 'Mutating vs copying an object',
          caption:
            'The buggy button changes the object but passes the SAME object to setOrder. React sees no change and skips the re-render, so the screen stays "pending" even though the data was changed. The fixed button passes a new object, and the screen updates.',
          type: 'react',
          component: ObjectState,
          code: objectStateCode,
        },
        {
          title: 'Add, remove and update items in an array',
          type: 'react',
          component: ArrayState,
          code: arrayStateCode,
        },
        {
          title: 'Updating a nested object',
          caption: 'Type a new city. Both the outer order object and the inner customer object are copied.',
          type: 'react',
          component: NestedObject,
          code: nestedObjectCode,
        },
        {
          title: 'Mutating methods vs non-mutating alternatives',
          type: 'code',
          code: mutateVsCopyCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'own-state-per-instance',
      title: 'Each instance has its own state',
      summary:
        'State belongs to one specific component on the screen, not to the component function. Render the same component twice and each copy has its own separate state.',
      notes: [
        'Two <Counter /> elements means two separate count values.',
        'Clicking one counter re-renders only that one.',
        'It works like two objects created from one PHP class: same code, separate data.',
      ],
      examples: [
        {
          title: 'Two counters side by side',
          type: 'react',
          component: TwoCounters,
          code: twoCountersCode,
        },
      ],
    },
    {
      id: 'derived-values',
      title: "Don't store what you can calculate",
      summary:
        'If a value can be calculated from existing state or props, calculate it during render instead of storing it in its own state. This is called a derived value.',
      notes: [
        'A derived value is calculated from other data on every render, like const total = qty * price.',
        'Storing it as separate state means you must keep two values in sync by hand, and sooner or later you will forget.',
        'Database analogy: don’t store a total column that can get out of sync with the order lines. Calculate it from the lines instead.',
        'Calculating on every render is cheap for normal amounts of data.',
      ],
      examples: [
        {
          title: 'Quantity picker with a derived total',
          type: 'react',
          component: QuantityPicker,
          code: quantityPickerCode,
        },
        {
          title: 'WRONG: total stored in its own state',
          type: 'code',
          code: derivedWrongCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'child-changes-parent-state',
      title: "Changing a parent's state from a child",
      summary:
        'A child cannot change its parent’s state directly. The parent passes down a function as a prop, and the child calls that function. The parent then updates its own state.',
      notes: [
        'Only the component that owns the state changes it. Here that is the parent, OrderApproval.',
        'Naming convention: the prop is onSomething (onChangeStatus), the parent’s function is handleSomething (handleChangeStatus).',
        'Data flows down through props, and events flow up by calling functions passed as props.',
        'The "Waiting for approval" count is derived from the orders array, not stored separately.',
      ],
      examples: [
        {
          title: 'Order approval: parent state, child buttons',
          caption: 'The OrderRow children have no state. Their buttons call onChangeStatus, which is the parent’s handleChangeStatus.',
          type: 'react',
          component: OrderApproval,
          code: orderApprovalCode,
        },
      ],
    },
    {
      id: 'rules-of-hooks',
      title: 'Rules of hooks',
      summary:
        'Hooks like useState must be called at the top level of a component, in the same order on every render. Never inside if, loops or nested functions.',
      notes: [
        'React matches hooks by call order, not by name: the first useState call is slot 1, the second is slot 2, and so on.',
        'If a hook is skipped on some renders, every hook after it gets the wrong slot.',
        'Only call hooks in React components or in custom hooks (functions whose name starts with "use").',
        'The ESLint plugin eslint-plugin-react-hooks warns you when you break these rules.',
      ],
      examples: [
        {
          title: 'useState inside an if vs at the top level',
          type: 'code',
          code: rulesOfHooksCode,
          lang: 'jsx',
        },
      ],
    },
  ],
}
