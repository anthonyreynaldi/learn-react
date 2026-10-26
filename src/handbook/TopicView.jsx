// Handbook shell — uses concepts from later parts (lists). You don't need to understand it yet.
//
// One topic page: breadcrumb, title, summary, key points, examples, Previous/Next.
import { ChevronRight } from 'lucide-react'
import ExampleBlock from './ExampleBlock'
import KeyPoints from './KeyPoints'
import PrevNext from './PrevNext'
import { topicHref } from './lib/useHashRoute'
import { partLabel } from './registry'

function TopicView({ part, topic, previous, next }) {
  const firstTopicHref = topicHref(part.id, part.topics[0].id)

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-zinc-500" aria-label="Breadcrumb">
        <a href={firstTopicHref} className="hover:text-sky-600 dark:hover:text-sky-400">
          {partLabel(part)} — {part.title}
        </a>
        <ChevronRight size={14} />
        <span className="text-zinc-900 dark:text-zinc-100">{topic.title}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
        {topic.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed">{topic.summary}</p>

      {topic.notes?.length > 0 && <KeyPoints notes={topic.notes} />}

      {topic.examples?.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Examples</h2>
          <div className="space-y-8">
            {topic.examples.map((example, i) => (
              <ExampleBlock key={i} example={example} />
            ))}
          </div>
        </section>
      )}

      <PrevNext previous={previous} next={next} />
    </article>
  )
}

export default TopicView
