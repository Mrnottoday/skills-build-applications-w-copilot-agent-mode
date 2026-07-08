import { useEffect, useState } from 'react'

import { fetchCollection, getEndpointUrl } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const items = await fetchCollection('teams')

        if (!ignore) {
          setTeams(items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Groups</p>
          <h1>Teams</h1>
        </div>
        <span className="endpoint-pill">{getEndpointUrl('teams')}</span>
      </div>

      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message error">Unable to load teams: {error}</p>}

      {status === 'ready' && (
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id ?? team.name}>
              <h2>{team.name}</h2>
              <p>{team.members?.length ?? 0} members</p>
              <div className="member-list">
                {team.members?.map((member) => (
                  <span key={member._id ?? member.email ?? member.name}>{member.name ?? member.email}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams