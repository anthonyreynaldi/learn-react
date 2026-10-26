export default function EnvDisplay() {
  // MODE comes from Vite's own types; VITE_API_URL from our src/vite-env.d.ts.
  // Hover them in VS Code: MODE is string, VITE_API_URL is string | undefined.
  const mode = import.meta.env.MODE
  const apiUrl = import.meta.env.VITE_API_URL

  return (
    <table>
      <tbody>
        <tr>
          <th>import.meta.env.MODE</th>
          <td>
            <code>{mode}</code>
          </td>
        </tr>
        <tr>
          <th>import.meta.env.VITE_API_URL</th>
          <td>
            {/* Optional in the .d.ts, so TypeScript makes us handle "not set" */}
            {apiUrl ? <code>{apiUrl}</code> : <em>not set (undefined)</em>}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
