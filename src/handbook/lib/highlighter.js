// Handbook shell — you don't need to understand this file yet.
//
// Syntax highlighting with Shiki. Only the languages and theme we need are
// loaded (lazily, on first use), which keeps the bundle small.
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const THEME = 'github-dark-default'

// lang values used in part files -> Shiki language ids
const LANGS = {
  jsx: 'jsx',
  js: 'javascript',
  html: 'html',
  json: 'json',
  bash: 'bash',
  php: 'php',
  ts: 'typescript',
  tsx: 'tsx',
}

let highlighterPromise

function getHighlighter() {
  highlighterPromise ??= createHighlighterCore({
    themes: [import('shiki/themes/github-dark-default.mjs')],
    langs: [
      import('shiki/langs/jsx.mjs'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/php.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/tsx.mjs'),
    ],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  })
  return highlighterPromise
}

// Returns highlighted HTML (Shiki escapes the code, so it is safe to inject).
export async function highlight(code, lang) {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, { lang: LANGS[lang] ?? 'text', theme: THEME })
}
