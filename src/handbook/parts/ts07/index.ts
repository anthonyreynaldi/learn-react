import typesCode from './examples/types.ts?raw'
import OrderCards from './examples/OrderCard.tsx'
import orderCardCode from './examples/OrderCard.tsx?raw'
import propsErrorsCode from './examples/propsErrors.txt?raw'
import CardChildren from './examples/CardChildren.tsx'
import cardChildrenCode from './examples/CardChildren.tsx?raw'
import CallbackProps from './examples/CallbackProps.tsx'
import callbackPropsCode from './examples/CallbackProps.tsx?raw'
import UseStateTypes from './examples/UseStateTypes.tsx'
import useStateTypesCode from './examples/UseStateTypes.tsx?raw'
import EventsForm from './examples/EventsForm.tsx'
import eventsFormCode from './examples/EventsForm.tsx?raw'
import eventTypesCode from './examples/eventTypes.txt?raw'
import ReducerLines from './examples/ReducerLines.tsx'
import reducerLinesCode from './examples/ReducerLines.tsx?raw'
import reducerErrorsCode from './examples/reducerErrors.txt?raw'
import UseRefTypes from './examples/UseRefTypes.tsx'
import useRefTypesCode from './examples/UseRefTypes.tsx?raw'
import authContextCode from './examples/auth/AuthContext.tsx?raw'
import ContextDemo from './examples/ContextDemo.tsx'
import contextDemoCode from './examples/ContextDemo.tsx?raw'
import useFetchCode from './examples/hooks/useFetch.ts?raw'
import useLocalStorageCode from './examples/hooks/useLocalStorage.ts?raw'
import FetchOrdersDemo from './examples/FetchOrdersDemo.tsx'
import fetchOrdersDemoCode from './examples/FetchOrdersDemo.tsx?raw'
import LocalStorageDemo from './examples/LocalStorageDemo.tsx'
import localStorageDemoCode from './examples/LocalStorageDemo.tsx?raw'
import ButtonWrapper from './examples/ButtonWrapper.tsx'
import buttonWrapperCode from './examples/ButtonWrapper.tsx?raw'
import GenericList from './examples/GenericList.tsx'
import genericListCode from './examples/GenericList.tsx?raw'

export default {
  id: 'ts07',
  number: 7,
  title: 'TypeScript with React',
  topics: [
    {
      id: 'typing-props',
      title: 'Typing props',
      summary:
        'Describe a component’s props with a type (OrderCardProps) and annotate the destructured parameter. Every usage of the component is then checked: missing props, typos and wrong types.',
      notes: [
        'type OrderCardProps = { order: Order; highlighted?: boolean }, then function OrderCard({ order, highlighted = false }: OrderCardProps).',
        'Optional props use ?, and a default value in the destructuring makes them always defined inside.',
        'Missing required props, misspelled props and wrong prop types are errors where the component is USED.',
        'React.FC / React.FunctionComponent isn’t needed. A typed function that returns JSX is all a component is.',
        'All examples in this part share types.ts (below): STATUSES, OrderStatus, Order and RequestState<T>.',
      ],
      examples: [
        { title: 'OrderCard with OrderCardProps', type: 'react', component: OrderCards, code: orderCardCode, lang: 'tsx' },
        { title: 'Prop errors', type: 'code', code: propsErrorsCode, lang: 'tsx' },
        { title: 'types.ts: the shared types for this part', type: 'code', code: typesCode, lang: 'ts' },
      ],
    },
    {
      id: 'children',
      title: 'children',
      summary: 'Type the children prop as ReactNode: anything React can render, from text and numbers to elements and lists.',
      notes: [
        'children: ReactNode accepts strings, numbers, JSX elements, arrays, null and undefined.',
        'import type { ReactNode } from \'react\': `import type` imports only a type, so it is erased from the output entirely.',
        'This project’s tsconfig (verbatimModuleSyntax) requires `type` on type-only imports, or inline: import { useState, type ReactNode } from \'react\'.',
      ],
      examples: [{ title: 'Card with children: ReactNode', type: 'react', component: CardChildren, code: cardChildrenCode, lang: 'tsx' }],
    },
    {
      id: 'callback-props',
      title: 'Callback props',
      summary: 'Callback props are function types: onChangeStatus: (id: number, status: OrderStatus) => void. The child can only call them with valid arguments.',
      notes: [
        'Write the parameters and their types, then => void (the return value isn’t used).',
        'The parent’s handler must match: handleChangeStatus(id: number, status: OrderStatus).',
        'Calling onChangeStatus(id, \'aproved\') in the child is an error, so typos never reach the parent’s state.',
      ],
      examples: [
        {
          title: 'OrderRow with onChangeStatus',
          type: 'react',
          component: CallbackProps,
          code: callbackPropsCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'use-state',
      title: 'useState',
      summary:
        'useState infers its type from the initial value. Write the type yourself only when the initial value can’t tell the whole story: empty arrays, null, and unions.',
      notes: [
        'useState(1) → number, useState(\'\') → string, useState(false) → boolean. No <...> needed.',
        'useState<Order[]>([]): an empty array needs its item type.',
        'useState<Order | null>(null): "nothing selected yet". Use ?. or a check before reading it.',
        'useState<RequestState<Order[]>>({ status: \'loading\' }): a discriminated union as state.',
      ],
      examples: [{ title: 'Four kinds of state', type: 'react', component: UseStateTypes, code: useStateTypesCode, lang: 'tsx' }],
    },
    {
      id: 'events',
      title: 'Events',
      summary:
        'Inline handlers get their event type automatically. A separate handler function needs the type written out, e.g. ChangeEvent<HTMLInputElement>.',
      notes: [
        'onChange={(e) => …}: e is inferred from the element (contextual typing, TS Part 3).',
        'Separate handlers: ChangeEvent<HTMLInputElement>, ChangeEvent<HTMLSelectElement>, SubmitEvent<HTMLFormElement>.',
        'Older code and tutorials use FormEvent for forms. Current React types mark it deprecated: use SubmitEvent for onSubmit and ChangeEvent for inputs.',
        'e.target.value is always a string. as OrderStatus is acceptable when the <option>s come from STATUSES; for outside values, check instead.',
        'Unsure of the type? Write the handler inline, hover over e, and copy the type.',
      ],
      examples: [
        { title: 'Inline and separate handlers', type: 'react', component: EventsForm, code: eventsFormCode, lang: 'tsx' },
        { title: 'Common event types', type: 'code', code: eventTypesCode, lang: 'text' },
      ],
    },
    {
      id: 'use-reducer',
      title: 'useReducer',
      summary:
        'Type the state and the actions, and useReducer infers the rest. With a discriminated union of actions, every dispatch is checked and every case gets the right payload.',
      notes: [
        'type LineAction = { type: \'added\'; id: string } | { type: \'qty_changed\'; id: string; qty: number } | …',
        'In each case, action has exactly that shape: action.qty only exists in the qty_changed case.',
        'dispatch only accepts valid actions: wrong type names, missing payloads and wrong payload types are errors.',
        'With an explicit return type and no default case, forgetting to handle a new action is an error ("Function lacks ending return statement").',
      ],
      examples: [
        { title: 'Order lines with a typed reducer', type: 'react', component: ReducerLines, code: reducerLinesCode, lang: 'tsx' },
        { title: 'Invalid dispatches and a missing case', type: 'code', code: reducerErrorsCode, lang: 'tsx' },
      ],
    },
    {
      id: 'use-ref',
      title: 'useRef',
      summary: 'A DOM ref is useRef<HTMLInputElement>(null) and may be null. A value ref holds whatever you store between renders, like a timer id.',
      notes: [
        'useRef<HTMLInputElement>(null): .current is HTMLInputElement | null, so use inputRef.current?.focus().',
        'Element types: HTMLInputElement, HTMLButtonElement, HTMLDivElement, HTMLFormElement, …',
        'useRef<number | null>(null) for a timer id. window.setInterval returns a number in the browser.',
        'Changing a value ref still doesn’t re-render (Part 11). The type doesn’t change that.',
      ],
      examples: [{ title: 'A DOM ref and a value ref', type: 'react', component: UseRefTypes, code: useRefTypesCode, lang: 'tsx' }],
    },
    {
      id: 'context',
      title: 'Context',
      summary:
        'createContext<AuthContextValue | null>(null) says "null when there is no provider". A useAuth hook checks for null once, so every component gets a fully typed, non-null value.',
      notes: [
        'Type the context value: user, isAdmin, login, logout.',
        'createContext<Value | null>(null): the default really is "no provider", and the type is honest about it.',
        'useAuth() throws a clear error outside the provider and returns the narrowed, non-null value.',
        'Components call useAuth() and get autocomplete for user, login and logout, without ?. everywhere.',
      ],
      examples: [
        { title: 'auth/AuthContext.tsx', type: 'code', code: authContextCode, lang: 'tsx' },
        {
          title: 'Admin and staff',
          caption: 'Log in as Budi (admin) to see the Approve buttons; Sari (staff) doesn’t get them.',
          type: 'react',
          component: ContextDemo,
          code: contextDemoCode,
          lang: 'tsx',
        },
      ],
    },
    {
      id: 'custom-hooks',
      title: 'Custom hooks',
      summary:
        'Custom hooks are generic functions like any other. useFetch<T> returns data typed as T, and useLocalStorage<T> returns a typed [value, setValue] tuple.',
      notes: [
        'useFetch<Order[]>(url): the caller says what the data is; data is Order[] | null.',
        'The as T inside useFetch trusts the server (TS Part 8 adds validation).',
        'return [value, setValue] as const makes a tuple, so destructuring keeps both types.',
        'T is inferred from the initial value, or given explicitly: useLocalStorage<OrderStatus>(\'status\', \'pending\').',
      ],
      examples: [
        {
          title: 'useFetch<Order[]> with the real orders.json',
          type: 'react',
          component: FetchOrdersDemo,
          code: fetchOrdersDemoCode,
          lang: 'tsx',
        },
        { title: 'hooks/useFetch.ts', type: 'code', code: useFetchCode, lang: 'ts' },
        {
          title: 'useLocalStorage<T>',
          type: 'react',
          component: LocalStorageDemo,
          code: localStorageDemoCode,
          lang: 'tsx',
        },
        { title: 'hooks/useLocalStorage.ts', type: 'code', code: useLocalStorageCode, lang: 'ts' },
      ],
    },
    {
      id: 'wrapping-html-elements',
      title: 'Wrapping HTML elements',
      summary:
        'ComponentProps<\'button\'> is every prop a real <button> accepts. Combine it with your own props and spread the rest onto the element.',
      notes: [
        'type ButtonProps = ComponentProps<\'button\'> & { variant?: \'primary\' | \'danger\' }.',
        'Destructure your own props, collect the rest with ...rest, and pass {...rest} to <button>.',
        'Users of your Button can pass type, disabled, onClick, title, aria-* with full type checking and autocomplete.',
        'Works for any element: ComponentProps<\'input\'>, ComponentProps<\'a\'>, …',
      ],
      examples: [{ title: 'Button with variants', type: 'react', component: ButtonWrapper, code: buttonWrapperCode, lang: 'tsx' }],
    },
    {
      id: 'generic-components',
      title: 'Generic components',
      summary:
        'A component can be generic: List<T> takes items: T[] plus functions that know how to key and render a T. One component, any kind of item, fully typed.',
      notes: [
        'type ListProps<T> = { items: T[]; getKey: (item: T) => string | number; renderItem: (item: T) => ReactNode }.',
        'T is inferred from items, so renderItem gets the right type for each list.',
        'In .tsx files write function List<T>(...); `<T>` before an arrow function would be read as JSX.',
        'Typical uses: lists, tables, selects and pickers that should work for orders, customers, products…',
      ],
      examples: [{ title: 'List<T> with orders and customers', type: 'react', component: GenericList, code: genericListCode, lang: 'tsx' }],
    },
  ],
}
