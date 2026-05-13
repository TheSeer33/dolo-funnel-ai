import React, { useState } from 'react'
import { X, Zap, Mail, Lock, User, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface AuthModalProps {
  mode: 'signin' | 'signup'
  onClose: () => void
  onSwitch: () => void
}

export default function AuthModal({ mode, onClose, onSwitch }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error: err } = await signUp(email, password, fullName)
      if (err) {
        setError(err.message)
        setLoading(false)
        return
      }
      // Show check email message
      setCheckEmail(true)
      setLoading(false)
      return
    }

    // Sign in
    const { error: err } = await signIn(email, password)
    if (err) {
      setError(err.message === 'Email not confirmed'
        ? 'Please check your email and click the confirmation link first.'
        : err.message)
      setLoading(false)
      return
    }
    setLoading(false)
    onClose()
    navigate('/dashboard')
  }

  if (checkEmail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md text-center">
          <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
          <p className="text-white/50 mb-2">We sent a confirmation link to:</p>
          <p className="text-violet-400 font-medium mb-6">{email}</p>
          <p className="text-white/40 text-sm mb-6">Click the link to activate your account, then come back and sign in.</p>
          <button onClick={() => { setCheckEmail(false); onSwitch() }}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm">
            Sign in after confirming
          </button>
          <button onClick={onClose} className="w-full mt-3 text-white/40 hover:text-white text-sm transition-colors">Close</button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">DOLO</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
        <p className="text-white/50 text-sm mb-6">{mode === 'signup' ? 'Build your first funnel in 60 seconds' : 'Sign in to your dashboard'}</p>

        <button onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-white/20 text-white py-3 rounded-xl hover:border-white/40 transition-colors mb-4 font-medium text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-white/30 text-xs">or email</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="password" placeholder={mode === 'signup' ? 'Create password (8+ chars)' : 'Password'} value={password}
              onChange={e => setPassword(e.target.value)} required minLength={8}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
          </div>
          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-sm transition-all">
            {loading ? 'Please wait...' : mode === 'signup' ? 'Create account — free' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-white/40 text-sm mt-4">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={onSwitch} className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
            {mode === 'signup' ? 'Sign in' : 'Sign up free'}
          </button>
        </p>
      </div>
    </div>
  )
}
