// Handbook shell — uses concepts from later parts (useState, useRef, async).
// You don't need to understand it yet.
//
// "js" examples: a Run button and a terminal-style Output box.
// The example's run(log) is called; every log(...) call adds one line.
import { useRef, useState } from 'react'
import { LoaderCircle, Play } from 'lucide-react'
import { formatLine } from './lib/formatValue'

function JsRunner({ run }) {
  const [lines, setLines] = useState([])
  const [running, setRunning] = useState(false)
  const runIdRef = useRef(0)

  async function handleRun() {
    const runId = ++runIdRef.current
    const isCurrent = () => runId === runIdRef.current
    setLines([])
    setRunning(true)

    // Ignore logs from an older run that is still finishing.
    const log = (...values) => {
      if (isCurrent()) setLines((prev) => [...prev, { text: formatLine(values), error: false }])
    }

    try {
      await run(log)
    } catch (error) {
      if (isCurrent()) {
        const text = error instanceof Error ? `Uncaught ${error.name}: ${error.message}` : `Uncaught ${formatLine([error])}`
        setLines((prev) => [...prev, { text, error: true }])
      }
    } finally {
      if (isCurrent()) setRunning(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleRun}
        className="mb-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700"
      >
        {running ? <LoaderCircle size={16} className="animate-spin" /> : <Play size={16} />}
        {running ? 'Running…' : 'Run'}
      </button>

      <div className="min-h-24 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed">
        {lines.length === 0 && !running && <div className="text-zinc-500">Press Run to see the output.</div>}
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre ${line.error ? 'text-red-400' : 'text-zinc-100'}`}
          >
            <span className={`mr-2 select-none ${line.error ? 'text-red-500' : 'text-emerald-500'}`}>
              {line.error ? '✖' : '›'}
            </span>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default JsRunner
