import ProductList from './examples/ProductList.jsx'
import productListCode from './examples/ProductList.jsx?raw'
import foreachBladeCode from './examples/foreachBlade.txt?raw'
import foreachMapCode from './examples/foreachMap.txt?raw'
import mapReturnStylesCode from './examples/mapReturnStyles.txt?raw'
import ProductRows from './examples/ProductRows.jsx'
import productRowsCode from './examples/ProductRows.jsx?raw'
import keyMatchingCode from './examples/keyMatching.txt?raw'
import IndexKeyBug from './examples/IndexKeyBug.jsx'
import indexKeyBugCode from './examples/IndexKeyBug.jsx?raw'
import OrderReport from './examples/OrderReport.jsx'
import orderReportCode from './examples/OrderReport.jsx?raw'
import ordersCode from './examples/orders.js?raw'
import EmptyState from './examples/EmptyState.jsx'
import emptyStateCode from './examples/EmptyState.jsx?raw'
import EarlyReturn from './examples/EarlyReturn.jsx'
import earlyReturnCode from './examples/EarlyReturn.jsx?raw'
import TernaryPattern from './examples/TernaryPattern.jsx'
import ternaryPatternCode from './examples/TernaryPattern.jsx?raw'
import AndPattern from './examples/AndPattern.jsx'
import andPatternCode from './examples/AndPattern.jsx?raw'
import ReturnNull from './examples/ReturnNull.jsx'
import returnNullCode from './examples/ReturnNull.jsx?raw'
import JsxVariable from './examples/JsxVariable.jsx'
import jsxVariableCode from './examples/JsxVariable.jsx?raw'
import StatusLookup from './examples/StatusLookup.jsx'
import statusLookupCode from './examples/StatusLookup.jsx?raw'
import ConditionalClassName from './examples/ConditionalClassName.jsx'
import conditionalClassNameCode from './examples/ConditionalClassName.jsx?raw'
import nestedTernaryCode from './examples/nestedTernary.txt?raw'
import HidingVsUnmounting from './examples/HidingVsUnmounting.jsx'
import hidingVsUnmountingCode from './examples/HidingVsUnmounting.jsx?raw'
import GroupByStatus from './examples/GroupByStatus.jsx'
import groupByStatusCode from './examples/GroupByStatus.jsx?raw'
import groupByLaravelCode from './examples/groupByLaravel.txt?raw'
import groupByJsCode from './examples/groupByJs.txt?raw'

export default {
  id: 'part06',
  number: 6,
  title: 'Lists and Conditional Rendering',
  topics: [
    {
      id: 'rendering-lists',
      title: 'Rendering lists with map',
      summary:
        'To show a list, turn an array of data into an array of JSX elements with map. JSX renders arrays directly, and every item needs a key.',
      notes: [
        'There is no @foreach in JSX. You use the plain JavaScript array method map.',
        'map((item) => ( <li>…</li> )) with parentheses returns the JSX implicitly.',
        'With braces { … } you must write return yourself. Forgetting it renders nothing, with no error.',
        'Every element returned from map needs a key prop, usually the database id.',
        'For bigger rows, extract a component (ProductRow) and put the key on it inside the map.',
      ],
      examples: [
        {
          title: 'A product list with map and key',
          type: 'react',
          component: ProductList,
          code: productListCode,
        },
        {
          title: 'Blade: @foreach',
          type: 'code',
          code: foreachBladeCode,
          lang: 'php',
        },
        {
          title: 'React: map',
          type: 'code',
          code: foreachMapCode,
          lang: 'jsx',
        },
        {
          title: 'Parentheses (implicit return) vs braces with return',
          type: 'code',
          code: mapReturnStylesCode,
          lang: 'jsx',
        },
        {
          title: 'Extracting a ProductRow component',
          caption: 'The key belongs on <ProductRow> in the map, because that is the element React compares between renders.',
          type: 'react',
          component: ProductRows,
          code: productRowsCode,
        },
      ],
    },
    {
      id: 'keys',
      title: 'Keys',
      summary:
        'Keys tell React which list item is which between renders. With keys, React can match items that moved, were added or removed, and keep the right state with the right item.',
      notes: [
        'A key must be unique among its siblings. It doesn’t need to be unique in the whole app.',
        'A key must be stable: the same item gets the same key on every render.',
        'Use database IDs. They are unique and stable by design.',
        'Never use Math.random() as a key. Every render gives new keys, so React throws away and recreates every item.',
        'key is used by React itself and is NOT passed to your component as a prop. Pass the id separately if the component needs it.',
        'When map returns a Fragment, use <Fragment key={…}> (import { Fragment } from "react"). The short <>…</> syntax cannot take a key.',
      ],
      examples: [
        {
          title: 'How React matches items: key = id vs key = index',
          type: 'code',
          code: keyMatchingCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'index-as-key',
      title: 'Index as key bug',
      summary:
        'Using the array index as a key looks fine until items are removed, inserted or reordered. Then React matches the wrong items and state ends up on the wrong row.',
      notes: [
        'The index describes a position, not an item. After removing the first item, every remaining item gets a new index.',
        'React keeps state by key. So with key={index}, state stays at a position while the data moves.',
        'Index as key is only safe for static lists that never change order and whose items have no state.',
        'Fix: key={order.id}.',
      ],
      examples: [
        {
          title: 'key = index vs key = id',
          caption:
            'Type a note in the first row of both lists, then click "Remove first" in both. In the index version the note moves to the wrong customer; in the id version it disappears together with its order.',
          type: 'react',
          component: IndexKeyBug,
          code: indexKeyBugCode,
        },
      ],
    },
    {
      id: 'filtering-sorting',
      title: 'Filtering and sorting',
      summary:
        'Keep only the filter settings in state, and derive the visible list on every render with filter and sort. Totals are derived the same way.',
      notes: [
        'Think SQL: filter is your WHERE, sort is your ORDER BY, reduce is your SUM().',
        'Store the search text, the selected status and the sort field in state, but not the filtered list.',
        'Sorting: toSorted() returns a new sorted array. [...arr].sort() does the same in older code. Never call arr.sort() on state or props.',
        'For case-insensitive search, lower-case both sides: name.toLowerCase().includes(search.toLowerCase()).',
      ],
      examples: [
        {
          title: 'Order report with search, status filter and sorting',
          caption: 'Try "maju", choose a status, sort by total, or type something that matches nothing.',
          type: 'react',
          component: OrderReport,
          code: orderReportCode,
        },
        {
          title: 'The shared sample data (orders.js)',
          type: 'code',
          code: ordersCode,
          lang: 'js',
        },
      ],
    },
    {
      id: 'empty-states',
      title: 'Empty states',
      summary:
        'When a list is empty, show a helpful message instead of an empty table. Watch out for the length && pitfall, which renders a stray 0.',
      notes: [
        'Check the derived list: visible.length === 0 ? <EmptyMessage /> : <Table />.',
        'Pitfall: {orders.length && <List />} renders "0" when the array is empty, because React renders numbers.',
        'Fix: compare to get a real boolean, {orders.length > 0 && <List />}, or use a ternary.',
        'The Order report in "Filtering and sorting" shows "No orders match your filter." as a table row.',
      ],
      examples: [
        {
          title: 'The length && pitfall and an empty-state message',
          caption: 'The first section shows a stray "0" on purpose.',
          type: 'react',
          component: EmptyState,
          code: emptyStateCode,
        },
      ],
    },
    {
      id: 'conditional-patterns',
      title: 'Conditional rendering patterns',
      summary:
        'JSX has no @if, so you use plain JavaScript: early return, ternary, &&, returning null, a variable holding JSX, or a lookup object. Pick the one that reads best for the case.',
      notes: [
        'Early return: handle the "nothing to show" case first with if (…) return …',
        'Ternary a ? b : c: choose between two things inline.',
        '&&: show something or nothing. Make sure the left side is a real boolean (not 0).',
        'Return null from a component to render nothing at all.',
        'A variable holding JSX, set with if/else before the return: good for 3 or more cases.',
        'Lookup object + ??: map values to labels or colors, with a fallback for unknown values.',
        'Avoid nested ternaries. Use a variable, a lookup or a small component instead.',
      ],
      examples: [
        {
          title: 'Early return',
          type: 'react',
          component: EarlyReturn,
          code: earlyReturnCode,
        },
        {
          title: 'Ternary',
          type: 'react',
          component: TernaryPattern,
          code: ternaryPatternCode,
        },
        {
          title: '&& (show or nothing)',
          type: 'react',
          component: AndPattern,
          code: andPatternCode,
        },
        {
          title: 'Returning null',
          caption: 'DiscountNote renders nothing for orders under Rp 1.000.000.',
          type: 'react',
          component: ReturnNull,
          code: returnNullCode,
        },
        {
          title: 'A variable holding JSX',
          caption: 'Switch the status: pending shows Approve/Reject, approved shows Print invoice, rejected shows nothing.',
          type: 'react',
          component: JsxVariable,
          code: jsxVariableCode,
        },
        {
          title: 'Lookup object with a ?? fallback',
          type: 'react',
          component: StatusLookup,
          code: statusLookupCode,
        },
        {
          title: 'Conditional className and style',
          caption: 'Rejected rows get an extra class; pending statuses get a bold style.',
          type: 'react',
          component: ConditionalClassName,
          code: conditionalClassNameCode,
        },
        {
          title: 'Why nested ternaries are hard to read',
          type: 'code',
          code: nestedTernaryCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'hiding-vs-not-rendering',
      title: 'Hiding vs not rendering',
      summary:
        'Not rendering a component removes it and its state. Hiding it with CSS keeps it mounted, so its state survives.',
      notes: [
        'Mount: React creates a component on the screen for the first time, and its state starts at the initial value.',
        'Unmount: React removes the component from the screen, and its state is thrown away.',
        '{show && <Notes />} unmounts Notes when show is false. Showing it again mounts a brand-new Notes.',
        'style={{ display: "none" }} only hides it. The component stays mounted and keeps its state.',
        'Usually not rendering is what you want. Hide with CSS when you must keep state, e.g. tabs with half-filled forms.',
      ],
      examples: [
        {
          title: 'Two panels: && vs display: none',
          caption:
            'Type in both inputs, then click Toggle twice in each panel. A starts empty again because Notes was unmounted; B keeps its text.',
          type: 'react',
          component: HidingVsUnmounting,
          code: hidingVsUnmountingCode,
        },
      ],
    },
    {
      id: 'grouping-data',
      title: 'Grouping data',
      summary:
        'To show a list in sections, first group the data into an object with reduce, then render one section per group with Object.entries and map.',
      notes: [
        'reduce turns an array into one value, here an object of arrays keyed by status.',
        'Object.entries(groups) gives [[key, items], …], which you can map over.',
        'Two levels of lists need two levels of keys: the group key for each section, and the item id inside each section.',
        'push is fine inside this reduce because the object and arrays are brand new, created during this render.',
        'Object.groupBy(orders, o => o.status) does the same in one line in modern browsers.',
      ],
      examples: [
        {
          title: 'Orders grouped by status',
          type: 'react',
          component: GroupByStatus,
          code: groupByStatusCode,
        },
        {
          title: 'SQL GROUP BY and Laravel groupBy',
          type: 'code',
          code: groupByLaravelCode,
          lang: 'php',
        },
        {
          title: 'JavaScript: reduce and Object.groupBy',
          type: 'code',
          code: groupByJsCode,
          lang: 'js',
        },
      ],
    },
  ],
}
