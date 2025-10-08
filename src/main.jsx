import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Mark app bootstrapped for reload watchdog in index.html
try { window.__APP_BOOTSTRAPPED = true; } catch (_) {}
