import { useEffect, useState } from 'react'
import { z } from 'zod'
import { apiGet } from './apiGet.ts'
import { paginated } from './laravelSchemas.ts'
import { OrderSchema } from './schemas.ts'

// paginated(OrderSchema) builds the schema for Order::paginate() responses
const OrdersPageSchema = paginated(OrderSchema)
type OrdersPage = z.infer<typeof OrdersPageSchema> // data: Order[], current_page: number, ...

export default function PaginatedDemo() {
  const [page, setPage] = useState<OrdersPage | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet('/handbook-data/ts8/paginated.json', OrdersPageSchema)
      .then(setPage)
      .catch((err) => setError(err instanceof z.ZodError ? z.prettifyError(err) : String(err)))
  }, [])

  if (error) return <pre style={{ color: 'red' }}>{error}</pre>
  if (!page) return <p>Loading…</p>

  return (
    <div>
      <ul>
        {page.data.map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer} ({o.status})
          </li>
        ))}
      </ul>
      <p>
        Page {page.current_page} of {page.last_page} · {page.total} orders · {page.per_page} per page ·{' '}
        <button disabled={page.prev_page_url === null}>Previous</button>{' '}
        <button disabled={page.next_page_url === null}>Next</button>
      </p>
    </div>
  )
}
