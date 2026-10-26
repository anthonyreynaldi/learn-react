import { useLocalStorage } from './hooks/useLocalStorage.ts'
import { STATUSES, type OrderStatus } from './types.ts'

export default function LocalStorageDemo() {
  // T given explicitly: without <OrderStatus>, 'pending' alone would make T = string
  const [defaultStatus, setDefaultStatus] = useLocalStorage<OrderStatus>('handbook-ts-default-status', 'pending')
  // T inferred from 20: number
  const [pageSize, setPageSize] = useLocalStorage('handbook-ts-page-size', 20)

  return (
    <div>
      <p>
        Default status for new orders:{' '}
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setDefaultStatus(s)} style={{ fontWeight: s === defaultStatus ? 'bold' : undefined, marginRight: 4 }}>
            {s}
          </button>
        ))}
      </p>
      <p>
        Rows per page: <button onClick={() => setPageSize(pageSize === 20 ? 50 : 20)}>{pageSize}</button>
      </p>
      <p>
        <small>Saved: {JSON.stringify({ defaultStatus, pageSize })}. Refresh the page: both are remembered.</small>
      </p>
    </div>
  )
}
