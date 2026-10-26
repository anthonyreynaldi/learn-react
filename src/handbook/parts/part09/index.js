import laravelFlowCode from './examples/laravelFlow.txt?raw'
import reactFlowCode from './examples/reactFlow.txt?raw'
import bladeFormCode from './examples/bladeForm.txt?raw'
import ControlledInputs from './examples/ControlledInputs.jsx'
import controlledInputsCode from './examples/ControlledInputs.jsx?raw'
import valueWithoutOnChangeCode from './examples/valueWithoutOnChange.txt?raw'
import NumberInput from './examples/NumberInput.jsx'
import numberInputCode from './examples/NumberInput.jsx?raw'
import TextareaInput from './examples/TextareaInput.jsx'
import textareaInputCode from './examples/TextareaInput.jsx?raw'
import SelectInput from './examples/SelectInput.jsx'
import selectInputCode from './examples/SelectInput.jsx?raw'
import CheckboxInput from './examples/CheckboxInput.jsx'
import checkboxInputCode from './examples/CheckboxInput.jsx?raw'
import RadioInput from './examples/RadioInput.jsx'
import radioInputCode from './examples/RadioInput.jsx?raw'
import DateInput from './examples/DateInput.jsx'
import dateInputCode from './examples/DateInput.jsx?raw'
import OrderFormState from './examples/OrderFormState.jsx'
import orderFormStateCode from './examples/OrderFormState.jsx?raw'
import runComputedProperties from './examples/computedProperties.js'
import computedPropertiesCode from './examples/computedProperties.js?raw'
import SubmitOrder from './examples/SubmitOrder.jsx'
import submitOrderCode from './examples/SubmitOrder.jsx?raw'
import fakeOrderApiCode from './examples/fakeOrderApi.js?raw'
import realFetchPostCode from './examples/realFetchPost.txt?raw'
import laravelControllerCode from './examples/laravelController.txt?raw'
import ServerErrors from './examples/ServerErrors.jsx'
import serverErrorsCode from './examples/ServerErrors.jsx?raw'
import fieldErrorCode from './examples/FieldError.jsx?raw'
import errors422Code from './examples/errors422.txt?raw'
import ClientValidation from './examples/ClientValidation.jsx'
import clientValidationCode from './examples/ClientValidation.jsx?raw'
import OrderLinesForm from './examples/OrderLinesForm.jsx'
import orderLinesFormCode from './examples/OrderLinesForm.jsx?raw'
import laravelLinesRulesCode from './examples/laravelLinesRules.txt?raw'
import QuickNoteForm from './examples/QuickNoteForm.jsx'
import quickNoteFormCode from './examples/QuickNoteForm.jsx?raw'
import LabelsAccessibility from './examples/LabelsAccessibility.jsx'
import labelsAccessibilityCode from './examples/LabelsAccessibility.jsx?raw'
import laravelRulesArrayCode from './examples/laravelRulesArray.txt?raw'
import zodSchemaCode from './examples/zodSchema.txt?raw'

export default {
  id: 'part09',
  number: 9,
  title: 'Forms',
  topics: [
    {
      id: 'laravel-vs-react-forms',
      title: 'Laravel forms vs React forms',
      summary:
        'In Laravel the browser posts the form and the page reloads. In React, JavaScript sends the form data as JSON and the page stays put. The typed values and the errors simply live in state.',
      notes: [
        'No page reload: e.preventDefault() stops the browser’s POST, and fetch() sends JSON instead.',
        'old() is unnecessary: the typed values never left the page, they are still in state.',
        'Errors become state: Laravel answers 422 with JSON errors, and React stores and shows them.',
        'Laravel still validates and saves. Only the "view" side of the form moves to React.',
      ],
      examples: [
        {
          title: 'The Laravel (Blade) flow',
          type: 'code',
          code: laravelFlowCode,
          lang: 'text',
        },
        {
          title: 'The React flow',
          type: 'code',
          code: reactFlowCode,
          lang: 'text',
        },
        {
          title: 'A Blade form with old() and $errors',
          type: 'code',
          code: bladeFormCode,
          lang: 'html',
        },
      ],
    },
    {
      id: 'controlled-inputs',
      title: 'Controlled inputs',
      summary:
        'A controlled input gets its value from state and reports every change through onChange. State is the single source of truth, so you can show, transform or reject what the user types.',
      notes: [
        'value={x} + onChange={(e) => setX(e.target.value)}: the standard pair.',
        'Every keystroke: onChange → setState → re-render → the input shows the new state.',
        'Because you decide what goes into state, you can transform input (uppercase) or filter it (digits only).',
        'value without onChange makes the field read-only and React warns in the console.',
      ],
      examples: [
        {
          title: 'Mirror, uppercase and digits-only inputs',
          type: 'react',
          component: ControlledInputs,
          code: controlledInputsCode,
        },
        {
          title: 'value without onChange',
          type: 'code',
          code: valueWithoutOnChangeCode,
          lang: 'jsx',
        },
      ],
    },
    {
      id: 'input-types',
      title: 'Input types',
      summary:
        'Text, textarea, select and date inputs use value. Checkboxes and radios use checked. e.target.value is always a string, so convert numbers yourself.',
      notes: [
        'type="number" still gives a string (and "" when empty). Keep the string in state and use Number() when calculating.',
        '<textarea> and <select> use value in React, unlike HTML (text between tags, selected on an option).',
        'Checkbox: read e.target.checked (boolean). e.target.value is "on" unless you set a value attribute.',
        'Radios: same name for the group; each one is checked={state === itsValue}.',
        'Date inputs always give "YYYY-MM-DD", whatever format the browser displays.',
      ],
      examples: [
        { title: 'Number input', type: 'react', component: NumberInput, code: numberInputCode },
        { title: 'Textarea', type: 'react', component: TextareaInput, code: textareaInputCode },
        {
          title: 'Select from an array, with a placeholder',
          type: 'react',
          component: SelectInput,
          code: selectInputCode,
        },
        {
          title: 'Checkbox: value vs checked',
          caption: 'Tick and untick the box: e.target.value stays "on"; only e.target.checked changes.',
          type: 'react',
          component: CheckboxInput,
          code: checkboxInputCode,
        },
        { title: 'Radio buttons', type: 'react', component: RadioInput, code: radioInputCode },
        { title: 'Date input', type: 'react', component: DateInput, code: dateInputCode },
      ],
    },
    {
      id: 'one-state-object',
      title: 'One state object for the form',
      summary:
        'Instead of one useState per field, keep the whole form in one object and update it with a single handleChange. The input’s name attribute tells the handler which key to update.',
      notes: [
        'Give every input a name that matches a key in the form object.',
        'One handler: setForm({ ...form, [name]: value }). The brackets are a computed property name.',
        'Checkboxes: use checked instead of value (type === "checkbox" ? checked : value).',
        'Reset = set the state back to the initial object.',
        'The state object is exactly what you will send to Laravel as JSON.',
      ],
      examples: [
        {
          title: 'OrderForm with a single handleChange',
          caption: 'Type, choose and tick: the JSON preview on the right is the state object, live.',
          type: 'react',
          component: OrderFormState,
          code: orderFormStateCode,
        },
        {
          title: 'Computed property names',
          type: 'js',
          run: runComputedProperties,
          code: computedPropertiesCode,
        },
      ],
    },
    {
      id: 'submitting',
      title: 'Submitting to Laravel',
      summary:
        'Handle onSubmit on the <form>, prevent the page reload, send the state as JSON, and track a submitting state so the button shows progress and can’t be clicked twice.',
      notes: [
        'Put onSubmit on the <form>, not onClick on the button. Then Enter in any field submits too.',
        'e.preventDefault() stops the browser’s own POST and page reload.',
        'Headers: Content-Type: application/json (what you send) and Accept: application/json (what you want back). Without Accept, a Laravel validation failure answers with a redirect instead of 422 JSON.',
        'Prevent double submits: disable the button while submitting, and show "Saving...".',
        'routes/api.php is stateless and does not check CSRF tokens. Authentication for APIs is Part 12.',
      ],
      examples: [
        {
          title: 'Submitting with a "Saving..." state',
          caption: 'Click "Save order" (or press Enter in the customer field). After about 1 second you get a new order id and the form resets.',
          type: 'react',
          component: SubmitOrder,
          code: submitOrderCode,
        },
        {
          title: 'The real fetch call',
          type: 'code',
          code: realFetchPostCode,
          lang: 'js',
        },
        {
          title: 'Laravel route and controller',
          type: 'code',
          code: laravelControllerCode,
          lang: 'php',
        },
        {
          title: 'fakeOrderApi.js: the fake Laravel used in this part',
          type: 'code',
          code: fakeOrderApiCode,
          lang: 'js',
        },
      ],
    },
    {
      id: 'server-validation-errors',
      title: "Showing Laravel's validation errors",
      summary:
        'When validation fails, Laravel answers 422 with an errors object keyed by field name. Store it in state and show each field’s first message under the field.',
      notes: [
        'Check response.status === 422, then setErrors(data.errors).',
        'Each field has an ARRAY of messages; showing the first one is usually enough.',
        'A small FieldError component keeps the JSX tidy: <FieldError errors={errors} name="customer" />.',
        'Clear a field’s error when the user edits that field, so the message doesn’t linger.',
        'Laravel 5.5+ wraps the messages in "errors". Laravel 5.4 and earlier return the field messages at the top level, with no "message" or "errors" keys.',
      ],
      examples: [
        {
          title: 'Submit with invalid data',
          caption:
            'Click "Save order" right away: all three fields show Laravel’s messages (the date is in the past). Edit a field and its message disappears. Open "Raw response" to see the 422 JSON.',
          type: 'react',
          component: ServerErrors,
          code: serverErrorsCode,
        },
        {
          title: 'FieldError.jsx',
          type: 'code',
          code: fieldErrorCode,
          lang: 'jsx',
        },
        {
          title: 'The 422 response body (Laravel 5.5+)',
          caption: 'Laravel 5.4 and earlier send only the inner object: { "customer": ["..."], ... }.',
          type: 'code',
          code: errors422Code,
          lang: 'json',
        },
      ],
    },
    {
      id: 'client-validation',
      title: 'Client-side validation',
      summary:
        'Validate in the browser for instant feedback, but treat it as a convenience. The server must still validate everything, and its errors still need to be shown.',
      notes: [
        'Errors are a derived value: const errors = validate(form) on every render, with no extra state.',
        'isValid = Object.keys(errors).length === 0.',
        'Show errors only after the first submit attempt, so users aren’t scolded while still typing.',
        'Use trim(): "   " is not a customer name.',
        'noValidate on the <form> turns off the browser’s built-in validation bubbles so yours are used.',
        'Server validation is still required: anyone can send requests without your form. Keep showing server errors for rules the client doesn’t check.',
      ],
      examples: [
        {
          title: 'Client errors first, server errors as a fallback',
          caption:
            'Click Save: client errors appear and no request is sent. Fill in customer and warehouse and save again: the client is happy, but the server rejects the past delivery date.',
          type: 'react',
          component: ClientValidation,
          code: clientValidationCode,
        },
      ],
    },
    {
      id: 'dynamic-order-lines',
      title: 'Dynamic order lines',
      summary:
        'An order with lines is an array in state. Add, remove and update lines immutably, derive the totals, and map Laravel’s "lines.N.field" errors back to the right row.',
      notes: [
        'Give each new line a stable id once, with crypto.randomUUID(). Never use key={Math.random()}: that creates a new key on every render.',
        'The id is only for React. Strip it before sending: lines.map(({ product, qty }) => ({ product, qty })).',
        'Laravel numbers errors by array index (lines.0.qty), so use the map index to find each row’s errors.',
        'Inside a <form>, every <button> is a submit button by default. Use type="button" for Add/Remove.',
        'Line totals and the grand total are derived: no extra state.',
      ],
      examples: [
        {
          title: 'OrderLinesForm',
          caption:
            'Add a few lines, leave a product empty or set a qty to 0, then Save: the server errors appear on the matching rows.',
          type: 'react',
          component: OrderLinesForm,
          code: orderLinesFormCode,
        },
        {
          title: 'Laravel: validating lines.*',
          type: 'code',
          code: laravelLinesRulesCode,
          lang: 'php',
        },
      ],
    },
    {
      id: 'uncontrolled-formdata',
      title: 'Uncontrolled inputs and FormData',
      summary:
        'An uncontrolled input keeps its own value in the DOM. React only sets the starting value (defaultValue). At submit time, FormData reads all named fields at once.',
      notes: [
        'defaultValue / defaultChecked set the initial value only. React does not track later changes.',
        'new FormData(e.target) collects every field with a name. Object.fromEntries turns it into an object.',
        'All FormData values are strings, and unchecked checkboxes are missing completely.',
        'Controlled: use when you need the value while typing (live preview, validation, transforming, dependent fields).',
        'Uncontrolled: fine for simple forms where you only need the values on submit.',
      ],
      examples: [
        {
          title: 'QuickNoteForm with FormData',
          caption: 'Submit once with "Urgent" unticked and once ticked: the urgent key only appears ("on") when checked.',
          type: 'react',
          component: QuickNoteForm,
          code: quickNoteFormCode,
        },
      ],
    },
    {
      id: 'labels-accessibility',
      title: 'Labels and accessibility',
      summary:
        'Every input needs a label. Connect them with htmlFor + id, or wrap the input inside the label. Clicking the label then focuses the input, and screen readers can announce it.',
      notes: [
        'JSX uses htmlFor instead of for (a reserved word in JavaScript).',
        'Wrapping labels need no id and are handy for checkboxes and radios.',
        'A placeholder is not a label: it disappears when you type.',
        'ids must be unique on the page. If a component is rendered twice, hard-coded ids collide. useId (Part 11) generates unique ids.',
      ],
      examples: [
        {
          title: 'htmlFor + id, and wrapping labels',
          caption: 'Click the label texts: the inputs get focus, and the checkbox toggles.',
          type: 'react',
          component: LabelsAccessibility,
          code: labelsAccessibilityCode,
        },
      ],
    },
    {
      id: 'form-tools',
      title: 'Real-world form tools',
      summary:
        'Everything in this part works with plain React. For large forms, libraries reduce the boilerplate, and React 19 adds built-in form actions. They are covered in Part 13.',
      notes: [
        'React Hook Form: manages form state with uncontrolled inputs (few re-renders), and handles errors, dirty/touched fields and submission.',
        'Zod: describes the shape and rules of your data as a schema, like a Laravel rules array, and validates against it. It works well with React Hook Form.',
        'React 19 form actions: <form action={fn}> plus useActionState handle pending state and results with less code.',
        'Learn the plain version first, so you know what these tools do for you.',
      ],
      examples: [
        {
          title: 'Laravel rules array',
          type: 'code',
          code: laravelRulesArrayCode,
          lang: 'php',
        },
        {
          title: 'The same rules as a Zod schema',
          caption: 'For reading only: Zod is not installed in this project.',
          type: 'code',
          code: zodSchemaCode,
          lang: 'js',
        },
      ],
    },
  ],
}
