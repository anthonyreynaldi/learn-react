// Handbook shell — you don't need to understand this file yet.
//
// Turns handbook data into plain text for the AI: a table of contents of the
// whole handbook, and the full content of the topic that is currently open.
import { partLabel } from '../registry'

export function buildTableOfContents(tracks) {
  const lines = ['# Handbook table of contents']
  for (const track of tracks) {
    lines.push(`## ${track.title}`)
    for (const part of track.parts) {
      lines.push(`${partLabel(part)} — ${part.title}`)
      for (const topic of part.topics) lines.push(`  - ${topic.title}`)
    }
  }
  return lines.join('\n')
}

const TYPE_LABELS = {
  react: 'live React example (rendered on the page)',
  js: 'runnable example (the learner presses Run and sees log() output)',
  code: 'code for reading only, not runnable',
}

const DEFAULT_LANG = { react: 'jsx', js: 'js', code: 'text' }

export function buildTopicContext(part, topic) {
  const lines = [
    '# Current topic (the page the learner has open)',
    `${partLabel(part)} — ${part.title} › ${topic.title}`,
    '',
    `Summary: ${topic.summary}`,
  ]

  if (topic.notes?.length) {
    lines.push('', 'Key points:', ...topic.notes.map((note) => `- ${note}`))
  }

  topic.examples?.forEach((example, i) => {
    const lang = example.lang ?? DEFAULT_LANG[example.type] ?? 'text'
    lines.push('', `## Example ${i + 1}: ${example.title}`, `Type: ${TYPE_LABELS[example.type] ?? example.type}`)
    if (example.caption) lines.push(`Caption: ${example.caption}`)
    lines.push('```' + lang, example.code.trimEnd(), '```')
  })

  return lines.join('\n')
}
