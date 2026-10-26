import bladeIncludeCode from './examples/bladeInclude.txt?raw'
import propsAsArgumentsCode from './examples/propsAsArguments.txt?raw'
import PassingProps from './examples/PassingProps.jsx'
import passingPropsCode from './examples/PassingProps.jsx?raw'
import ReceivingProps from './examples/ReceivingProps.jsx'
import receivingPropsCode from './examples/ReceivingProps.jsx?raw'
import StatusBadge from './examples/StatusBadge.jsx'
import statusBadgeCode from './examples/StatusBadge.jsx?raw'
import ReadOnlyProps from './examples/ReadOnlyProps.jsx'
import readOnlyPropsCode from './examples/ReadOnlyProps.jsx?raw'
import dataFlowTreeCode from './examples/dataFlowTree.txt?raw'
import dataFlowCode from './examples/dataFlowCode.txt?raw'
import ChildrenProp from './examples/ChildrenProp.jsx'
import childrenPropCode from './examples/ChildrenProp.jsx?raw'
import ObjectProps from './examples/ObjectProps.jsx'
import objectPropsCode from './examples/ObjectProps.jsx?raw'

export default {
  id: 'part04',
  number: 4,
  title: 'Props',
  topics: [
    {
      id: 'what-props-are',
      title: 'What props are',
      summary:
        'Props are the inputs of a component, just like arguments are the inputs of a function. The parent decides the values; the component uses them to decide what to show.',
      notes: [
        'A component is a function, and props are its arguments, collected into one object.',
        'Props are written like HTML attributes: <OrderSummary customer="PT Maju Jaya" />.',
        'This is the same idea as passing an array of data to @include in Blade.',
        'With props, one component can show different data each time it is used.',
      ],
      examples: [
        {
          title: 'Blade: @include with data',
          type: 'code',
          code: bladeIncludeCode,
          lang: 'php',
        },
        {
          title: 'React: props are function arguments',
          type: 'code',
          code: propsAsArgumentsCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'passing-props',
      title: 'Passing props',
      summary:
        'Any JavaScript value can be passed as a prop. Strings can use quotes; everything else (numbers, booleans, arrays, objects, functions) goes inside curly braces.',
      notes: [
        'customer="PT Maju Jaya" passes a string.',
        'quantity={3}, urgent={true}, products={[...]} and address={{ ... }} pass other types.',
        'address={{ city: "Jakarta" }} uses double braces: outer for "JavaScript here", inner for the object.',
        'Trap: total="750000" is a string, so total + 1 gives "7500001". Use total={750000} for a number.',
      ],
      examples: [
        {
          title: 'Strings, numbers, booleans, arrays and objects',
          caption: 'The two lines at the bottom show the quotes vs braces trap.',
          type: 'react',
          component: PassingProps,
          code: passingPropsCode,
        },
      ],
    },
    {
      id: 'receiving-props',
      title: 'Receiving props, defaults and boolean shorthand',
      summary:
        'A component receives all props as one object. Most code destructures it in the parameter list, which also lets you give each prop a default value.',
      notes: [
        'function OrderLine(props) and function OrderLine({ product, price }) receive the same thing.',
        'Destructuring makes it clear which props a component expects.',
        'Defaults like { status = "pending" } work like default parameters in a PHP function.',
        'Defaults apply only when the prop is undefined (missing). Passing null does NOT use the default.',
        'Boolean shorthand: <StatusBadge large /> is the same as <StatusBadge large={true} />.',
      ],
      examples: [
        {
          title: 'props object vs destructuring',
          type: 'react',
          component: ReceivingProps,
          code: receivingPropsCode,
        },
        {
          title: 'StatusBadge with defaults and a color lookup',
          caption: 'The last badge receives null, so the default is skipped and no color matches (gray).',
          type: 'react',
          component: StatusBadge,
          code: statusBadgeCode,
        },
      ],
    },
    {
      id: 'props-read-only',
      title: 'Props are read-only',
      summary:
        'A component must never change its props. If you need a different value, compute a new local variable from the prop instead.',
      notes: [
        'Props belong to the parent. The child only borrows them.',
        'Objects and arrays are passed by reference: the child gets the very same object as the parent, not a copy.',
        'Changing product.price inside a child changes the parent\'s data and every other component using it.',
        'Mutating props also makes the component impure (Part 3), so repeated renders give different results.',
      ],
      examples: [
        {
          title: 'Buggy vs fixed discount',
          caption:
            'Objects are shared by reference, so mutating a prop changes the parent\'s data. In the buggy column the normal price is already discounted, and StrictMode may even apply the discount twice in development.',
          type: 'react',
          component: ReadOnlyProps,
          code: readOnlyPropsCode,
        },
      ],
    },
    {
      id: 'one-way-data-flow',
      title: 'One-way data flow',
      summary:
        'In React, data flows in one direction: from parent to child through props. A child never changes its parent\'s data directly.',
      notes: [
        'The component that owns the data passes it down; children only read it.',
        'This makes it easy to find where data comes from: follow the props upward.',
        'To change parent data, a child calls a function the parent passed down as a prop (covered in Parts 5 and 10).',
      ],
      examples: [
        {
          title: 'Data flows down the tree',
          type: 'code',
          code: dataFlowTreeCode,
          lang: 'text',
        },
        {
          title: 'Parent passes, child reads',
          type: 'code',
          code: dataFlowCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'children-prop',
      title: 'The children prop',
      summary:
        'Anything you put between a component\'s opening and closing tags is passed to it as a special prop called children. This lets you build wrapper components like cards, panels and layouts.',
      notes: [
        'children is like {{ $slot }} in a Blade component, or @yield in a Blade layout.',
        'The wrapper decides where the children appear by writing {children} in its JSX.',
        'children can be text, elements, or other components.',
        'Other props (like title) still work next to children, similar to named slots.',
      ],
      examples: [
        {
          title: 'A Card wrapping two OrderSummary components',
          type: 'react',
          component: ChildrenProp,
          code: childrenPropCode,
        },
      ],
    },
    {
      id: 'object-vs-individual-props',
      title: 'Object props vs individual props, and spreading',
      summary:
        'You can pass data as separate props, as one object prop, or spread an object into separate props with {...order}. All three can show the same result.',
      notes: [
        'Individual props: the component signature shows exactly what it needs, but the call site gets long.',
        'One object prop (order={order}): short to pass, but the component depends on the shape of the whole object.',
        'Spread ({...order}): short call site, but it passes every key, including ones the component does not need, and it hides which props are used.',
        'A good default: pass an object when the component really is "about" that thing (an OrderCard), use individual props for small, generic components (a StatusBadge).',
      ],
      examples: [
        {
          title: 'Three ways to pass the same order',
          type: 'react',
          component: ObjectProps,
          code: objectPropsCode,
        },
      ],
    },
  ],
}
