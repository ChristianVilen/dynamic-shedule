import { useEffect, useState } from 'react'
import { WeekIn } from '../types'

export const useGetWeeks = (url: string) => {
  const [data, setData] = useState<WeekIn[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/week', { method: 'GET' })
        const json = await response.json()
        setData(json)
      } catch (e) {
        setError('error')
        console.error('could not fetch tasks', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { data, loading, error }
}
