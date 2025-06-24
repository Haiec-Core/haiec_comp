'use client'

import { useState } from 'react'

const signInWithEmail = async (email: string, password: string) => {
  if (password.length < 6) {
    return { data: null, error: { message: "Password is too short." } }
  }
  if (email === "test@example.com" && password === "password123") {
    return { data: { user: { id: '123', email } }, error: null }
  }
  return { data: null, error: { message: "Invalid login credentials." } }
}

const signUpWithEmail = async (email: string, password: string) => {
  if (password.length < 6) {
    return { data: null, error: { message: "Password should be at least 6 characters." } }
  }
  return { data: { user: { id: '456', email } }, error: null }
}

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = isLogin
        ? await signInWithEmail(email, password)
        : await signUpWithEmail(email, password)

      if (error) {
        setMessage(error.message)
      } else {
        if (isLogin) {
          setMessage('Login successful! Redirecting...')
        } else {
          setMessage('Sign up successful! Please check your email for a verification link.')
          setEmail('')
          setPassword('')
        }
      }
    } catch (error) {
      setMessage('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  // SVG Icon Components
  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  )
  const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  )
  const PasswordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 flex flex-col items-center">
        <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <ShieldIcon />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4" noValidate>
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
            <span><EmailIcon /></span>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
              placeholder="Email address"
            />
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
            <span><PasswordIcon /></span>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400"
              placeholder="Password"
            />
          </div>
          {message && (
            <div className={`p-3 rounded-md text-sm text-center border ${
              message.toLowerCase().includes('error') || message.toLowerCase().includes('invalid')
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
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