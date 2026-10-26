import libraryVsFrameworkCode from './examples/libraryVsFramework.txt?raw'
import domVersionCode from './examples/domVersion.txt?raw'
import QuantityPicker from './examples/QuantityPicker.jsx'
import quantityPickerCode from './examples/QuantityPicker.jsx?raw'
import bladeViewCode from './examples/bladeView.txt?raw'
import reactViewCode from './examples/reactView.txt?raw'
import componentTreeCode from './examples/componentTree.txt?raw'

export default {
  id: 'part01',
  number: 1,
  title: 'The Big Picture',
  topics: [
    {
      id: 'library-vs-framework',
      title: 'Library vs framework',
      summary:
        'Laravel is a framework: it gives you the whole structure (routing, database, validation, views) and calls your code. React is a library: it only builds user interfaces, and you decide what to combine it with.',
      notes: [
        'React handles one job: turning data into UI and keeping that UI up to date.',
        'Routing, data fetching, forms and styling are picked separately (or written by you).',
        'React does not talk to the database. In a typical setup, Laravel stays the backend (an API) and React runs in the browser.',
        'Framework: it calls your code. Library: you call its code.',
      ],
      examples: [
        {
          title: 'What Laravel decides vs what React covers',
          type: 'code',
          code: libraryVsFrameworkCode,
          lang: 'text',
        },
      ],
    },
    {
      id: 'imperative-vs-declarative',
      title: 'Imperative vs declarative',
      summary:
        'Imperative code lists every step to change the screen ("find this element, set its text"). Declarative code describes what the screen should look like for the current data, and React does the steps for you.',
      notes: [
        'With plain DOM code, every change means finding elements and updating them by hand.',
        'It is easy to forget one update and show stale data (e.g. quantity updated but total not).',
        'In React you write the UI once as a function of the data. When the data changes, React updates the DOM.',
        'Blade is already declarative on the server; React brings the same idea to the browser, after the page has loaded.',
      ],
      examples: [
        {
          title: 'Plain JavaScript DOM version (imperative)',
          caption: 'Every click updates two elements by hand.',
          type: 'code',
          code: domVersionCode,
          lang: 'html',
        },
        {
          title: 'React version (declarative)',
          caption: 'The JSX describes the screen for any quantity. useState is explained in Part 5.',
          type: 'react',
          component: QuantityPicker,
          code: quantityPickerCode,
        },
      ],
    },
    {
      id: 'ui-equals-f-of-state',
      title: 'UI = f(state)',
      summary:
        'In React, the UI is the result of a function applied to data: give a component the same data and you get the same UI. This is the same idea as passing data to a Blade view.',
      notes: [
        'A component is a JavaScript function that returns UI (JSX).',
        "view('orders.index', ['orders' => $orders]) is close to <OrdersPage orders={orders} />.",
        'Blade renders once per request on the server. A React component re-renders in the browser whenever its data changes.',
        'You never edit the screen directly: you change the data, and the screen follows.',
      ],
      examples: [
        {
          title: 'Laravel: controller passes data to a Blade view',
          type: 'code',
          code: bladeViewCode,
          lang: 'php',
        },
        {
          title: 'React: a component receives data',
          type: 'code',
          code: reactViewCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'components-and-virtual-dom',
      title: 'Components and the virtual DOM',
      summary:
        'A React app is a tree of components, each one a small function returning a piece of UI. When data changes, React builds a new tree in memory (the virtual DOM), compares it with the previous one, and updates only the parts of the real page that changed.',
      notes: [
        'Components are like Blade components or @include partials, but they can also keep their own state.',
        'Components nest: an App contains a page, a page contains a table, a table contains rows.',
        'The virtual DOM is a lightweight JavaScript description of the UI, not the real page.',
        'Comparing the old and new trees is called reconciliation (diffing). It keeps real DOM updates small.',
      ],
      examples: [
        {
          title: 'A component tree for an orders page',
          type: 'code',
          code: componentTreeCode,
          lang: 'text',
        },
      ],
    },
  ],
}
