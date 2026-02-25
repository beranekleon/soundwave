import { useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
  service: string
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [health, setHealth] = useState<HealthResponse | null>(null)

  const checkHealth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/health')

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = (await response.json()) as HealthResponse
      setHealth(data)
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Unknown error while checking backend health'
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
