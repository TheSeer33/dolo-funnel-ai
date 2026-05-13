import React, { useState } from 'react'
import { Zap, BarChart2, Mail, Globe, ArrowRight, CheckCircle, Star, Users, TrendingUp } from 'lucide-react'
import AuthModal from '../components/AuthModal'
import WaitlistModal from '../components/WaitlistModal'

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')
  const [showWaitlist, setShowWaitlist] = useState(false)

  const openSignup = () => { setAuthMode('signup'); setShowAuth(true) }
  const openSignin = () => { setAuthMode('signin'); setShowAuth(true) }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DOLO</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openSignin} className="text-sm text-white/70 hover:text-white transition-colors">Sign in</button>
            <button onClick={openSignup} className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
              Start free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm text-violet-400 mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
            Beta — Free while we grow
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build funnels that
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"> actually convert</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Describe your business. DOLO's AI builds your complete funnel — headline, copy, email sequence — in seconds. No agency. No tech stack. Just results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openSignup}
              className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all shadow-2xl shadow-violet-500/25"
            >
              Build my funnel free <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowWaitlist(true)}
              className="border border-white/20 text-white/80 hover:border-white/40 hover:text-white px-8 py-4 rounded-xl font-medium text-lg transition-all"
            >
              Join waitlist
            </button>
          </div>
          <p className="mt-4 text-sm text-white/30">No credit card required. Free plan forever.</p>
        </div>

        {/* Social proof bar */}
        <div className="max-w-3xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
          <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>73M solopreneurs</span></div>
          <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /><span>$480B creator economy</span></div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /><span className="text-white/60">4.9/5 rating</span></div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-white/5 px-6 py-4 flex items-center gap-3 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              </div>
              <span className="text-white/30 text-sm">DOLO AI Funnel Builder</span>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Your Business</p>
                <div className="bg-white/5 rounded-xl p-4 text-white/70 text-sm mb-6">
                  I help busy professionals reclaim 3+ hours daily through productivity systems and automation.
                </div>
                <div className="flex items-center gap-2 text-violet-400 text-sm mb-4">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>DOLO AI generating your funnel...</span>
                </div>
                <div className="space-y-3">
                  {['Headline crafted', 'Email sequence written', 'CTA optimized', 'Funnel published'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-xl p-6">
                <div className="text-xs text-white/30 mb-3 uppercase tracking-wider">Live Funnel Preview</div>
                <h3 className="text-lg font-bold text-white mb-2">Reclaim 3 Hours Daily — Free Productivity Masterclass</h3>
                <p className="text-white/50 text-sm mb-4">Join 15,000+ executives who eliminated overwhelm and got their evenings back.</p>
                <button className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm">
                  Get My Free Masterclass
                </button>
                <p className="text-center text-white/30 text-xs mt-2">Instant access. No spam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything a solopreneur needs</h2>
            <p className="text-white/50 text-lg">One platform. All the leverage.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'AI Funnel Builder', desc: 'Describe your business. Get a complete, high-converting funnel in seconds — headline, copy, CTA, and all.', color: 'violet' },
              { icon: Mail, title: 'Email Sequence Generator', desc: '5-part nurture sequences written by AI trained on 10,000+ converting campaigns. Ready to plug into any email tool.', color: 'pink' },
              { icon: BarChart2, title: 'Conversion Analytics', desc: 'Track views, conversions, and revenue across every funnel. Know exactly what\'s working.', color: 'blue' },
              { icon: Globe, title: 'One-Click Publish', desc: 'Publish your funnel to your own URL instantly. Share-ready in under 60 seconds.', color: 'green' },
              { icon: Users, title: 'Lead Capture Built-In', desc: 'Every funnel collects emails automatically. Your list grows while you sleep.', color: 'orange' },
              { icon: TrendingUp, title: 'A/B Testing', desc: 'Test headlines, CTAs, and offers. Let data pick the winner. No guessing.', color: 'red' },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-${f.color}-500/20 flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 text-${f.color}-400`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-white/50 text-lg">Start free. Scale when you're ready.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { name: 'Free', price: '$0', period: 'forever', features: ['3 funnels', 'AI content generation', 'Basic analytics', 'DOLO subdomain'], cta: 'Start free', highlight: false },
            { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited funnels', 'Custom domain', 'Email sequences', 'Advanced analytics', 'A/B testing', 'Priority support'], cta: 'Go Pro', highlight: true },
            { name: 'Scale', price: '$97', period: '/month', features: ['Everything in Pro', 'Team members', 'White-label', 'API access', 'Dedicated support', 'Custom integrations'], cta: 'Go Scale', highlight: false },
          ].map((plan, i) => (
            <div key={i} className={`relative rounded-2xl p-6 border ${plan.highlight ? 'bg-gradient-to-b from-violet-600/20 to-pink-600/10 border-violet-500/50' : 'bg-white/5 border-white/10'}`}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-medium">Most Popular</div>}
              <div className="mb-6">
                <p className="text-white/60 text-sm mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={openSignup}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white' : 'border border-white/20 text-white hover:border-white/40'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Your funnel is 60 seconds away</h2>
          <p className="text-white/50 text-lg mb-8">No agency. No tech stack. Just describe your business and DOLO does the rest.</p>
          <button
            onClick={openSignup}
            className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto transition-all shadow-2xl shadow-violet-500/25"
          >
            Build my funnel — it's free <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-md flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">DOLO</span>
          </div>
          <p className="text-white/30 text-sm">© 2026 DOLO. Built for solopreneurs, by a solopreneur.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="mailto:hello@usedolo.com" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSwitch={() => setAuthMode(m => m === 'signin' ? 'signup' : 'signin')} />}
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </div>
  )
}
