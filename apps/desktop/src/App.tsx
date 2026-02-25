import { useState } from 'react'
import './App.css'
import { fetchHealth, type HealthResponse } from './lib/api/health'
import { toErrorMessage } from './lib/errors'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [health, setHealth] = useState<HealthResponse | null>(null)

  const checkHealth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchHealth()
      setHealth(data)
    } catch (requestError) {
      const message = toErrorMessage(
        requestError,
        'Unknown error while checking backend health',
      )
      setError(message)
      setHealth(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <h1>soundwave</h1>
      <div className="card">
        <h2>audio engine health</h2>
        <button onClick={checkHealth} disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check health'}
        </button>

        {error && <p className="status error">Error: {error}</p>}

        {!error && health && (
          <p className="status success">
            Success: {health.service} reports "{health.status}"
          </p>
        )}

        {!error && !health && !isLoading && (
          <p className="status idle">Press the button to check backend status.</p>
        )}
      </div>
    </main>
  )
}

export default App
