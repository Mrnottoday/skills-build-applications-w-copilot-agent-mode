import { useEffect, useState } from 'react'

import { normalizeCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const response = await fetch(usersEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const items = normalizeCollection(payload)

        if (!ignore) {
          setUsers(items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Athletes</p>
          <h1>Users</h1>
        </div>
        <span className="endpoint-pill">{usersEndpoint}</span>
      </div>

      {status === 'loading' && <p className="state-message">Loading users...</p>}
      {status === 'error' && <p className="state-message error">Unable to load users: {error}</p>}

      {status === 'ready' && (
        <div className="data-grid users-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id ?? user.email}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className="meta-row">
                <span>{user.age ? `${user.age} years old` : 'Age unavailable'}</span>
                <span>{user.team ?? 'No team'}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users