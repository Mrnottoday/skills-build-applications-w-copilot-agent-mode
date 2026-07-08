import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { apiBaseUrl, isCodespaceNameMissing } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-lockup">
            <img src={octofitLogo} alt="Octofit Tracker" />
            <p className="eyebrow">Octofit Tracker</p>
          </div>
          <h1>Team fitness intelligence</h1>
          <p className="subhead">Track activity, teams, standings, and workout recommendations from the Octofit API.</p>
        </div>
        <div className="api-panel">
          <span>API base</span>
          <strong>{apiBaseUrl}</strong>
        </div>
      </header>

      {isCodespaceNameMissing && (
        <div className="env-alert" role="status">
          VITE_CODESPACE_NAME is not set, so requests will use the local backend fallback.
        </div>
      )}

      <nav className="app-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
