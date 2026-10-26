// Handbook shell — uses libraries (react-markdown). You don't need to understand it yet.
//
// One message in the "Ask AI" panel. The AI's answers are Markdown; code
// blocks are shown with the same highlighted CodeBlock as the examples.
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AlertTriangle, LoaderCircle } from 'lucide-react'
import CodeBlock from './CodeBlock'

// Markdown fence names → CodeBlock languages
const LANG_ALIASES = {
  jsx: 'jsx', tsx: 'tsx', ts: 'ts', typescript: 'ts', js: 'js', javascript: 'js', mjs: 'js',
  html: 'html', xml: 'html', blade: 'html', json: 'json',
  bash: 'bash', sh: 'bash', shell: 'bash', console: 'bash', php: 'php',
}

const markdownComponents = {
  // Let the code component below decide between a block and inline code
  pre: ({ children }) => <>{children}</>,
  code({ className, children }) {
    const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]
    const text = String(children).replace(/\n$/, '')
    if (lang || text.includes('\n')) {
      return (
        <div className="my-3">
          <CodeBlock code={text} lang={LANG_ALIASES[lang?.toLowerCase()] ?? 'text'} />
        </div>
      )
    }
    return <code className="chat-inline-code">{children}</code>
  },
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
}

function ChatMessage({ message }) {
  if (message.role === 'user') {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-sky-600 px-3.5 py-2 text-sm text-white">
          {message.content}
        </div>
        {message.topicLabel && <div className="mt-1 text-[11px] text-zinc-400">about {message.topicLabel}</div>}
      </div>
    )
  }

  return (
    <div className="text-sm">
      {message.pending && (
        <div className="flex items-center gap-2 text-zinc-500">
          <LoaderCircle size={14} className="animate-spin" /> Thinking…
        </div>
      )}
      {message.content && (
        <div className="chat-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {message.content}
          </ReactMarkdown>
        </div>
      )}
      {message.stopped && <div className="mt-1 text-xs text-zinc-400">Stopped.</div>}
      {message.error && (
        <div className="mt-2 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>{message.error}</span>
        </div>
      )}
    </div>
  )
}

export default ChatMessage
