'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { supabase } from '@/lib/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  const onSubmit = async (data) => {
    setSubmitting(true)

    const { email, password } = data

    const { data: sessionData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
    } else {
      if (!sessionData.user?.email_confirmed_at) {
        toast.warning('Please confirm your email before logging in.')
        await supabase.auth.signOut()
      } else {
        toast.success('Login successful!')
        router.push('/')
      }
    }

    setSubmitting(false)
  }

  if (loading) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-green-700">Login</h1>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded bg-green-600 cursor-pointer text-white font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-green-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  )
}
