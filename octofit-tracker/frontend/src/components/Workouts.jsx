import { useEffect, useState } from 'react'

import { fetchCollection, getEndpointUrl } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const items = await fetchCollection('workouts')

        if (!ignore) {
          setWorkouts(items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Recommendations</p>
          <h1>Workouts</h1>
        </div>
        <span className="endpoint-pill">{getEndpointUrl('workouts')}</span>
      </div>

      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message error">Unable to load workouts: {error}</p>}

      {status === 'ready' && (
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card workout-card" key={workout._id ?? workout.name}>
              <span className="difficulty">{workout.difficulty ?? 'Any level'}</span>
              <h2>{workout.name}</h2>
              <p>{workout.description ?? 'No description available.'}</p>
              <div className="meta-row">
                <span>{workout.durationMinutes ?? 0} min</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts