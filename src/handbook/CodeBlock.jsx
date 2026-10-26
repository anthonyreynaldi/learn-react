// Handbook shell — uses concepts from later parts (useState, useEffect).
// You don't need to understand it yet.
//
// A syntax-highlighted code block with a Copy button. Shows plain code first,
// then swaps in the highlighted version once Shiki has loaded.
import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

const LANG_LABELS = { jsx: 'JSX', js: 'JavaScript', html: 'HTML', json: 'JSON', bash: 'Terminal', php: 'PHP', ts: 'TypeScript', tsx: 'TSX', text: 'Text' }

function CodeBlock({ code, lang = 'jsx' }) {
  const [html, setHtml] = useState(null)
  const [copied, setCopied] = useState(false)
  const source = code.trimEnd()

  useEffect(() => {
    let cancelled = false
    // Shiki is loaded lazily so it doesn't slow down the first page load.
    import('./lib/highlighter')
      .then(({ highlight }) => highlight(source, lang))
      .then((result) => !cancelled && setHtml(result))
      .catch(() => {}) // keep the plain version
    return () => {
      cancelled = true
    }
  }, [source, lang])

  async function handleCopy() {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="code-block overflow-hidden rounded-lg border border-zinc-800 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
        <span className="text-xs font-medium text-zinc-400">{LANG_LABELS[lang] ?? lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre>
          <code>{source}</code>
        </pre>
      )}
    </div>
  )
}

export default CodeBlock
