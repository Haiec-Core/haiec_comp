'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, signInWithEmail, signUpWithEmail } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [orgName, setOrgName] = useState('')
  const [numEmployees, setNumEmployees] = useState('')
  const [contact, setContact] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/dashboard')
    }
    checkSession()
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const userId = session.user.id
        const stored = localStorage.getItem('pending_profile')
        if (!stored) {
          router.push('/dashboard')
          return
        }

        const pendingProfile = JSON.parse(stored)

        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('user_id', userId)
          .single()

        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: userId,
              ...pendingProfile,
            })

          if (insertError) {
            console.error('Insert Error:', insertError.message)
            setMessage(`Signup succeeded, but saving profile failed: ${insertError.message}`)
          } else {
            setMessage('Signup successful! Redirecting...')
          }
        }

        localStorage.removeItem('pending_profile')
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { data, error } = await signInWithEmail(email, password)
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Login successful! Redirecting...')
        router.push('/dashboard')
      }
    } else {
      const { data, error } = await signUpWithEmail(email, password)

      if (error) {
        setMessage(error.message)
      } else if (!data.session) {
        setMessage('Signup successful! Please check your email to verify your account.')
      } else {
        const profileToStore = {
          full_name: fullName,
          company_name: orgName,
          num_employees: Number(numEmployees),
          contact,
        }
        localStorage.setItem('pending_profile', JSON.stringify(profileToStore))

        setMessage('Signup successful! Redirecting...')
        router.push('/dashboard')
      }

      // Clear form fields
      setEmail('')
      setPassword('')
      setFullName('')
      setOrgName('')
      setNumEmployees('')
      setContact('')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4" noValidate>
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
            <span>📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
            <span>🔑</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
            />
          </div>

          {!isLogin && (
            <>
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
                <span>👤</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
                <span>🏢</span>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Company Name"
                  required
                  className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
                <span>👥</span>
                <input
                  type="number"
                  value={numEmployees}
                  onChange={(e) => setNumEmployees(e.target.value)}
                  placeholder="Number of Employees"
                  required
                  min={1}
                  className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
                <span>📞</span>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Contact Number"
                  required
                  className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
                />
              </div>
            </>
          )}

          {message && (
            <div className={`p-3 rounded-md text-sm text-center border ${
              message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password || (!isLogin && (!fullName || !orgName || !numEmployees || !contact))}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-blue-400 hover:text-blue-600 text-sm transition-colors">
            &larr; Back to homepage
          </a>
        </div>
      </div>
    </div>
  )
}
