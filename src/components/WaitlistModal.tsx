import React, { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('waitlist').insert({ email, name, source: 'landing' })
    setLoading(false)
    setDone(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        {done ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-white/50">We'll email you the moment your spot is ready.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Join the waitlist</h2>
            <p className="text-white/50 text-sm mb-6">Get early access + lifetime 30% discount.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50">
                {loading ? 'Saving...' : 'Join waitlist — free'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
