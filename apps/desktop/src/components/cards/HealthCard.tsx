import type { HealthResponse } from '../../lib/api/health'

type HealthCardProps = {
  isLoading: boolean
  error: string | null
  health: HealthResponse | null
  onCheckHealth: () => void
}

export function HealthCard({
  isLoading,
  error,
  health,
  onCheckHealth,
}: HealthCardProps) {
  return (
    <div className="card">
      <h2>audio engine health</h2>
      <button onClick={onCheckHealth} disabled={isLoading}>
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
  )
}
