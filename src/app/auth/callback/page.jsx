'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error restoring session:', error.message)
      } else if (data?.session) {
        router.push('/')
      } else {
        // Try to recover session from URL fragment (access_token etc.)
        const { error: hashError } = await supabase.auth.getSessionFromUrl()
        if (hashError) {
          console.error('Session error from URL:', hashError.message)
        } else {
          router.push('/')
        }
      }
    }

    handleOAuthRedirect()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Completing authentication, please wait...</p>
    </div>
  )
}
