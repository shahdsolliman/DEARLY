import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import VisitorTracker from './VisitorTracker.jsx'

const isDashboard = new URLSearchParams(window.location.search).get('page') === 'dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDashboard ? (
      <Dashboard />
    ) : (
      <>
        <VisitorTracker />
        <App />
      </>
    )}
  </StrictMode>,
)
