import { lazy, Suspense, useState } from 'react'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// lazy() + a dynamic import(): the build puts SalesChart in its OWN file,
// which the browser downloads only the first time it is rendered.
// The wait(1500) is artificial, only so you can see the fallback.
const SalesChart = lazy(() => wait(1500).then(() => import('./SalesChart.lazy.jsx')))

export default function LazyDemo() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(!showChart)}>{showChart ? 'Hide chart' : 'Show sales chart'}</button>
      {showChart && (
        // Suspense shows the fallback while the lazy component is still loading
        <Suspense fallback={<p>Loading chart…</p>}>
          <SalesChart />
        </Suspense>
      )}
    </div>
  )
}
