import { useEffect, useState } from 'react'

import { fetchCollection, getEndpointUrl } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const items = await fetchCollection('leaderboard')

        if (!ignore) {
          setLeaderboard(items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="endpoint-pill">{getEndpointUrl('leaderboard')}</span>
      </div>

      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message error">Unable to load leaderboard: {error}</p>}

      {status === 'ready' && (
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <article className="leaderboard-row" key={entry._id ?? entry.user?._id ?? index}>
              <span className="rank">#{entry.rank ?? index + 1}</span>
              <div>
                <h2>{entry.user?.name ?? 'Unknown athlete'}</h2>
                <p>{entry.user?.team ?? 'Independent'}</p>
              </div>
              <strong>{entry.score ?? 0}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard