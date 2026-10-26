import { useLocalStorage } from './hooks/useLocalStorage.js'

export default function PreferredWarehouse() {
  // Same shape as useState, but saved in the browser's localStorage
  const [warehouse, setWarehouse] = useLocalStorage('handbook-preferred-warehouse', 'SBY')

  return (
    <div>
      <label htmlFor="pw-warehouse">Preferred warehouse </label>
      <select id="pw-warehouse" value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
        <option value="SBY">Surabaya</option>
        <option value="JKT">Jakarta</option>
      </select>
      <p>
        Saved value: <code>{JSON.stringify(warehouse)}</code>. Refresh the page (F5): it is still there.
      </p>
    </div>
  )
}
