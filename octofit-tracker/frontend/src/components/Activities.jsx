import { useEffect, useState } from 'react'

import { fetchCollection, getEndpointUrl } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const items = await fetchCollection('activities')

        if (!ignore) {
          setActivities(items)
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Training log</p>
          <h1>Activities</h1>
        </div>
        <span className="endpoint-pill">{getEndpointUrl('activities')}</span>
      </div>

      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message error">Unable to load activities: {error}</p>}

      {status === 'ready' && (
        <div className="table-wrap">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Athlete</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.user?.name ?? 'Unknown athlete'}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Unscheduled'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities