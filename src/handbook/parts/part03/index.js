import headerVsHeaderCode from './examples/headerVsHeader.txt?raw'
import FirstComponent from './examples/FirstComponent.jsx'
import firstComponentCode from './examples/FirstComponent.jsx?raw'
import Composition from './examples/Composition.jsx'
import compositionCode from './examples/Composition.jsx?raw'
import runWhatIsJsx from './examples/whatIsJsx.jsx'
import whatIsJsxCode from './examples/whatIsJsx.jsx?raw'
import compiledJsxCode from './examples/compiledJsx.txt?raw'
import singleRootWrongCode from './examples/singleRootWrong.txt?raw'
import SingleRoot from './examples/SingleRoot.jsx'
import singleRootCode from './examples/SingleRoot.jsx?raw'
import ClosingTags from './examples/ClosingTags.jsx'
import closingTagsCode from './examples/ClosingTags.jsx?raw'
import AttributeNames from './examples/AttributeNames.jsx'
import attributeNamesCode from './examples/AttributeNames.jsx?raw'
import StyleObject from './examples/StyleObject.jsx'
import styleObjectCode from './examples/StyleObject.jsx?raw'
import Expressions from './examples/Expressions.jsx'
import expressionsCode from './examples/Expressions.jsx?raw'
import JsxComments from './examples/JsxComments.jsx'
import jsxCommentsCode from './examples/JsxComments.jsx?raw'
import Escaping from './examples/Escaping.jsx'
import escapingCode from './examples/Escaping.jsx?raw'
import PureVsImpure from './examples/PureVsImpure.jsx'
import pureVsImpureCode from './examples/PureVsImpure.jsx?raw'
import nestedComponentsCode from './examples/nestedComponents.txt?raw'

export default {
  id: 'part03',
  number: 3,
  title: 'Components and JSX',
  topics: [
    {
      id: 'what-a-component-is',
      title: 'What a component is',
      summary:
        'A component is a JavaScript function that returns JSX. You use it like a custom HTML tag, and React calls the function to find out what to show.',
      notes: [
        'A component is just a function: no class, no base controller to extend.',
        'The name must start with a capital letter. <header> is the HTML tag, <Header /> is your component.',
        'Think of a component like a Blade partial or Blade component, but written in JavaScript.',
        'One file can hold several components; usually one is the default export.',
      ],
      examples: [
        {
          title: '<header> vs <Header>',
          type: 'code',
          code: headerVsHeaderCode,
          lang: 'jsx',
        },
        {
          title: 'Your first component',
          type: 'react',
          component: FirstComponent,
          code: firstComponentCode,
        },
      ],
    },
    {
      id: 'composition',
      title: 'Composition and the component tree',
      summary:
        'Bigger components are built by combining smaller ones. The result is a tree of components, with your App at the root.',
      notes: [
        'A component can render other components, which can render other components, and so on.',
        'This nesting forms the component tree: each component is a parent of the components it renders.',
        'Small, focused components are easier to read and reuse, similar to splitting a big Blade view into partials.',
      ],
      examples: [
        {
          title: 'A Header and two OrderSummary components',
          caption:
            'Both OrderSummary boxes show exactly the same data, because the data is hardcoded inside the component. Props (Part 4) solve this.',
          type: 'react',
          component: Composition,
          code: compositionCode,
        },
      ],
    },
    {
      id: 'what-jsx-is',
      title: 'What JSX really is',
      summary:
        'JSX looks like HTML, but it is JavaScript syntax. The build tool turns every JSX tag into a function call that returns a plain object describing the UI.',
      notes: [
        'Browsers cannot run JSX directly; Vite compiles it to regular JavaScript.',
        'Each JSX tag becomes a jsx(type, props) call that returns a "React element" object.',
        'A React element is only a description. React later uses it to update the real DOM.',
        'Because JSX is JavaScript, you can store it in variables, return it from functions, and put JavaScript values inside it with {}.',
      ],
      examples: [
        {
          title: 'Inspect a JSX element',
          type: 'js',
          run: runWhatIsJsx,
          code: whatIsJsxCode,
          lang: 'jsx',
        },
        {
          title: 'What the compiler produces',
          caption: 'You never write this yourself, but it explains why JSX follows JavaScript rules.',
          type: 'code',
          code: compiledJsxCode,
          lang: 'js',
        },
      ],
    },
    {
      id: 'jsx-rules',
      title: 'JSX rules',
      summary:
        'JSX is stricter than HTML. A handful of rules cover almost every error beginners hit: one root element, closed tags, JavaScript attribute names, style objects, and expressions only inside braces.',
      notes: [
        'Return a single root element. Use a Fragment <>...</> when you do not want an extra wrapper in the HTML.',
        'Close every tag: <br />, <input />, <img />, and components without children like <Header />.',
        'Use className instead of class, htmlFor instead of for, and camelCase event names like onClick.',
        'style takes an object: style={{ color: "red" }}. CSS names become camelCase, numbers mean pixels, undefined skips the property.',
        '{} accepts expressions (values), not statements. Use a ternary inline, or compute with if before the return.',
        'Comments inside JSX are written as {/* ... */}.',
      ],
      examples: [
        {
          title: 'Single root: wrong vs right',
          type: 'code',
          code: singleRootWrongCode,
          lang: 'jsx',
        },
        {
          title: 'Fragments for table rows',
          caption: 'A <div> wrapper here would produce invalid HTML inside <tbody>, so the rows are grouped with Fragments.',
          type: 'react',
          component: SingleRoot,
          code: singleRootCode,
        },
        {
          title: 'Close every tag',
          type: 'react',
          component: ClosingTags,
          code: closingTagsCode,
        },
        {
          title: 'className, htmlFor and camelCase events',
          type: 'react',
          component: AttributeNames,
          code: attributeNamesCode,
        },
        {
          title: 'The style object and double braces',
          caption: 'The out-of-stock line is red because its ternary returns "red"; the other returns undefined, so no color is set.',
          type: 'react',
          component: StyleObject,
          code: styleObjectCode,
        },
        {
          title: 'Expressions, not statements',
          type: 'react',
          component: Expressions,
          code: expressionsCode,
        },
        {
          title: 'Comments in JSX',
          type: 'react',
          component: JsxComments,
          code: jsxCommentsCode,
        },
      ],
    },
    {
      id: 'escaping-xss',
      title: 'Escaping and XSS',
      summary:
        'React escapes every value you put in {} before showing it, so HTML inside a string appears as plain text. This protects you from XSS by default.',
      notes: [
        'React {value} works like Blade {{ $value }}: the value is escaped automatically.',
        'Blade {!! $html !!} outputs raw HTML. The React equivalent is dangerouslySetInnerHTML={{ __html: html }}.',
        'The long name of dangerouslySetInnerHTML is deliberate. Only use it with HTML you fully trust, never with user input.',
        'You do not need to call htmlspecialchars or any escape helper yourself.',
      ],
      examples: [
        {
          title: 'A string with <script> and <b> tags',
          caption: 'The first paragraph shows the tags as text and runs nothing. The second renders trusted HTML on purpose.',
          type: 'react',
          component: Escaping,
          code: escapingCode,
        },
      ],
    },
    {
      id: 'pure-components',
      title: 'Pure components',
      summary:
        'A component should be pure: given the same input, it returns the same JSX and does not change anything outside itself while rendering.',
      notes: [
        'React may render a component many times, at times you do not control. Rendering must be safe to repeat.',
        'Do not change variables, objects or arrays that existed before the render started.',
        'Creating and changing local variables inside the component is fine.',
        'In development, StrictMode renders each component twice on purpose to expose impure code.',
      ],
      examples: [
        {
          title: 'Impure vs pure Ticket',
          caption:
            'The impure numbers may look wrong (skipping numbers) because StrictMode renders twice in development, and they keep increasing every time this topic re-renders. The pure tickets always show 1, 2, 3.',
          type: 'react',
          component: PureVsImpure,
          code: pureVsImpureCode,
        },
      ],
    },
    {
      id: 'no-nested-components',
      title: "Don't define components inside components",
      summary:
        'Always define components at the top level of a file. A component defined inside another component is recreated on every render, which makes React rebuild it from scratch.',
      notes: [
        'Each render of the parent creates a new inner function, which React treats as a different component type.',
        'React then discards the old DOM and any state of the inner component, causing lost input focus and odd bugs.',
        'Define it at the top level and pass the data it needs through props.',
      ],
      examples: [
        {
          title: 'Wrong vs right',
          type: 'code',
          code: nestedComponentsCode,
          lang: 'jsx',
        },
      ],
    },
  ],
}
