import './App.css'
import { HealthCard } from './components/cards/HealthCard'
import { useHealthCheck } from './hooks/useHealthCheck'

function App() {
  const { isLoading, error, health, checkHealth } = useHealthCheck()

  return (
    <main className="app-shell">
      <h1>soundwave</h1>
      <HealthCard
        isLoading={isLoading}
        error={error}
        health={health}
        onCheckHealth={checkHealth}
      />
    </main>
  )
}

export default App
