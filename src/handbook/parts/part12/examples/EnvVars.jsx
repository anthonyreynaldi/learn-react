export default function EnvVars() {
  // Replaced by Vite with fixed values when the app is built or served
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
          <th>import.meta.env.DEV</th>
          <td>
            <code>{String(import.meta.env.DEV)}</code>
          </td>
        </tr>
        <tr>
          <th>import.meta.env.PROD</th>
          <td>
            <code>{String(import.meta.env.PROD)}</code>
          </td>
        </tr>
        <tr>
          <th>VITE_API_URL</th>
          <td>
            {apiUrl ? <code>{apiUrl}</code> : <em>not set (this project has no .env file with VITE_API_URL)</em>}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
