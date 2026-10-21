import { useEffect } from 'react'
import { supabaseClient } from './supabaseClient.js'

function VisitorTracker() {
  useEffect(() => {
    if (!supabaseClient) {
      console.error('Visitor tracking is unavailable: configure the Supabase environment variables.')
      return
    }

    let sessionId

    try {
      sessionId = sessionStorage.getItem('dearly-visitor-session')
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        sessionStorage.setItem('dearly-visitor-session', sessionId)
      }
    } catch (error) {
      console.error('Visitor tracking could not create a browser session.', error)
      return
    }

    const heartbeat = async () => {
      if (document.visibilityState !== 'visible') return

      try {
        const { error } = await supabaseClient.rpc('heartbeat_visitor', {
          p_session_id: sessionId
        })

        if (error) console.error('Visitor tracking heartbeat failed.', error)
      } catch (error) {
        console.error('Visitor tracking heartbeat failed.', error)
      }
    }

    void heartbeat()
    const heartbeatTimer = window.setInterval(() => void heartbeat(), 30_000)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') void heartbeat()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(heartbeatTimer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}

export default VisitorTracker
