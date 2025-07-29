'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    } else {
      alert('Error signing out: ' + error.message)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome back,
          <span className="font-medium text-gray-900"> {user?.email}</span>
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
