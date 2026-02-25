import { useState } from 'react'
import { fetchHealth, type HealthResponse } from '../lib/api/health'
import { toErrorMessage } from '../lib/errors'

type UseHealthCheckResult = {
  isLoading: boolean
  error: string | null
  health: HealthResponse | null
  checkHealth: () => Promise<void>
}

export function useHealthCheck(): UseHealthCheckResult {
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

  return {
    isLoading,
    error,
    health,
    checkHealth,
  }
}
