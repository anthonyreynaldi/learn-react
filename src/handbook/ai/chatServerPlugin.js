// Handbook shell — you don't need to understand this file yet.
//
// Server side of the "Ask AI" panel. This file runs in NODE, inside the Vite
// dev server (npm run dev) and preview server (npm run preview). It is never
// bundled into the browser app, so the API key stays on your machine.
//
// Browser ──POST /__handbook/chat──► this plugin ──► Claude API
//         ◄──── streamed answer text ◄────────────┘
import Anthropic from '@anthropic-ai/sdk'

const ROUTE = '/__handbook/chat'
const MODEL = 'claude-opus-5-5'
const MAX_BODY_BYTES = 2_000_000

const INSTRUCTIONS = `You are the tutor built into "React Handbook", a reference app the learner wrote while studying React step by step.

About the learner: a PHP developer who knows Laravel 5 and Blade well and is learning React 19 with Vite. The React track ("Part N") uses plain JavaScript; a separate TypeScript track ("TS Part N") teaches TypeScript. When the current topic is a TS Part, answer with TypeScript; otherwise use plain JavaScript. Comparisons with PHP, Laravel and Blade help them.

How to answer:
- The "Current topic" section below is the page the learner has open, including the exact source code of its examples. Ground your answer in it and refer to those examples by their titles when that helps.
- If the question goes beyond the current topic, answer it anyway, and point to the handbook topic that covers it (use the table of contents below, e.g. "Part 8 › Race conditions").
- Prefer concepts the learner has already seen (the current part and earlier ones). When you need something from a later part, say briefly that it is covered later.
- Reply in the language the learner writes in (they may write in English or Indonesian).
- Use Markdown. Put code in fenced blocks with a language tag (jsx, js, ts, tsx, php, bash, json, html). Keep code examples short and in the handbook's style: function components, sample data like PT Maju Jaya orders and formatRupiah.
- Be concise and concrete. A short answer with one good example beats a long essay.`

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function sendJsonError(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: message }))
}

// Turns SDK errors into a short message for the chat panel.
function describeError(err) {
  if (err instanceof Anthropic.AuthenticationError) {
    return 'The API key was rejected. Check ANTHROPIC_API_KEY in .env.local and restart npm run dev.'
  }
  if (err instanceof Anthropic.PermissionDeniedError) return 'This API key is not allowed to use this model.'
  if (err instanceof Anthropic.RateLimitError) return 'Rate limited by the Claude API. Wait a moment and try again.'
  if (err instanceof Anthropic.BadRequestError) return `The Claude API rejected the request: ${err.message}`
  if (err instanceof Anthropic.APIError) return `Claude API error ${err.status ?? ''}: ${err.message}`
  return err?.message ?? String(err)
}

function isValidMessages(messages) {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim() !== '',
    ) &&
    messages[0].role === 'user' &&
    messages.at(-1).role === 'user'
  )
}

function createChatHandler(apiKey) {
  let client = null

  return async function handleChat(req, res) {
    if (req.method !== 'POST') return sendJsonError(res, 405, 'Use POST.')

    if (!apiKey) {
      return sendJsonError(
        res,
        500,
        'No API key found. Create a file named .env.local in the project root containing ANTHROPIC_API_KEY=your-key, then restart npm run dev.',
      )
    }
    client ??= new Anthropic({ apiKey })

    let body
    try {
      body = JSON.parse(await readBody(req))
    } catch {
      return sendJsonError(res, 400, 'Invalid request body.')
    }
    const { tableOfContents = '', topicContext = '', messages } = body
    if (!isValidMessages(messages)) return sendJsonError(res, 400, 'Invalid messages.')

    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: 'medium' },
      // If Claude Opus 5.5's safety classifiers decline a question, the API
      // re-runs it on the recommended fallback model inside the same request.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      // Prompt caching: the instructions + table of contents rarely change,
      // and the topic context stays the same while you ask about one topic.
      // Top-level cache_control also caches the growing conversation.
      cache_control: { type: 'ephemeral' },
      system: [
        { type: 'text', text: `${INSTRUCTIONS}\n\n${tableOfContents}`, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: topicContext, cache_control: { type: 'ephemeral' } },
      ],
      messages: messages.map(({ role, content }) => ({ role, content })),
    })

    // The browser closed the panel, pressed Stop or navigated away: stop paying for tokens.
    res.on('close', () => {
      if (!res.writableFinished) stream.abort()
    })

    let started = false
    function startResponse() {
      if (started) return
      started = true
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' })
    }

    // Only the answer text is streamed; thinking stays hidden.
    stream.on('text', (delta) => {
      startResponse()
      res.write(delta)
    })

    try {
      const message = await stream.finalMessage()
      startResponse()
      if (message.stop_reason === 'refusal') {
        res.write('\n\n_(The model declined to answer this question. Try rephrasing it.)_')
      } else if (message.stop_reason === 'max_tokens') {
        res.write('\n\n_(The answer was cut off because it got too long.)_')
      }
      const u = message.usage
      console.log(
        `[handbook-chat] ${message.model}: ${u.input_tokens} input (+${u.cache_read_input_tokens ?? 0} cached, +${u.cache_creation_input_tokens ?? 0} written to cache), ${u.output_tokens} output tokens`,
      )
      res.end()
    } catch (err) {
      if (res.destroyed) return // the browser already went away (abort)
      const text = describeError(err)
      console.error('[handbook-chat]', text)
      if (!started) return sendJsonError(res, err?.status ?? 500, text)
      res.end(`\n\n> ⚠️ ${text}`) // the stream already began: append the error to the answer
    }
  }
}

// Vite plugin: adds the /__handbook/chat endpoint to the dev and preview servers.
export function handbookChatPlugin({ apiKey }) {
  const handler = createChatHandler(apiKey)
  return {
    name: 'handbook-chat',
    configureServer(server) {
      server.middlewares.use(ROUTE, handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(ROUTE, handler)
    },
  }
}
