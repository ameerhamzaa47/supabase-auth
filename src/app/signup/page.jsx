'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { supabase } from '@/lib/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Must include a lowercase letter')
    .matches(/[A-Z]/, 'Must include an uppercase letter')
    .matches(/\d/, 'Must include a number')
    .matches(/[@$!%*?&]/, 'Must include a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
})

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    })

    if (error) {
      if (error.message.includes('User already registered')) {
        toast.error('This email is already registered. Please log in.')
      } else {
        toast.error(error.message)
      }
    } else {
      toast.success('Signup successful. Please check your email to confirm.')
      reset()
    }

    setSubmitting(false)
  }

  if (loading) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-700">Create Account</h1>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`w-full px-5 py-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-3 focus:ring-blue-400 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 font-semibold">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={`w-full px-5 py-3 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-3 focus:ring-blue-400 transition`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 font-semibold">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={`w-full px-5 py-3 rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-3 focus:ring-blue-400 transition`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 font-semibold">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg bg-blue-600 cursor-pointer text-white font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-blue-600 font-semibold cursor-pointer hover:underline focus:outline-none"
          >
            Log in
          </button>
        </p>
      </form>

      <ToastContainer />
    </div>
  )
}
