'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!email || !password) {
            toast.error('Email and password are required.')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters.')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.')
            setLoading(false)
            return
        }

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
        }

        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form
                onSubmit={handleSignup}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="text-blue-600 cursor-pointer hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </form>
            <ToastContainer />
        </div>
    )
}
