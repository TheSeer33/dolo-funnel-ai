import React, { useState } from 'react'
import { ArrowLeft, Zap, Sparkles, CheckCircle, Copy, ExternalLink, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useFunnels } from '../contexts/FunnelContext'
import { generateFunnelContent } from '../lib/groq'

const FUNNEL_TYPES = [
  { id: 'lead-magnet', label: 'Lead Magnet', emoji: '🧲', desc: 'Capture emails with a free offer' },
  { id: 'sales', label: 'Sales Funnel', emoji: '💰', desc: 'Sell a product or service' },
  { id: 'webinar', label: 'Webinar', emoji: '📹', desc: 'Register attendees for a live event' },
  { id: 'landing', label: 'Landing Page', emoji: '🎯', desc: 'Drive action on one focused goal' },
  { id: 'coaching', label: 'Coaching Offer', emoji: '🏆', desc: 'Book discovery or strategy calls' },
  { id: 'course', label: 'Online Course', emoji: '📚', desc: 'Sell or promote your course' },
]

type Step = 'type' | 'describe' | 'generating' | 'review' | 'published'

export default function FunnelBuilder() {
  const navigate = useNavigate()
  const { createFunnel, publishFunnel } = useFunnels()
  
  const [step, setStep] = useState<Step>('type')
  const [funnelType, setFunnelType] = useState('')
  const [description, setDescription] = useState('')
  const [funnelName, setFunnelName] = useState('')
  const [generated, setGenerated] = useState<any>(null)
  const [savedFunnelId, setSavedFunnelId] = useState<string | null>(null)
  const [publishedUrl, setPublishedUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!description.trim()) return
    setStep('generating')
    setError('')
    try {
      const content = await generateFunnelContent(description, funnelType)
      setGenerated(content)
      if (!funnelName) setFunnelName(`${funnelType} funnel`)
      setStep('review')
    } catch (err) {
      setError('AI generation failed. Please try again.')
      setStep('describe')
    }
  }

  const handlePublish = async () => {
    if (!generated) return
    const funnel = await createFunnel({
      name: funnelName || `${funnelType} funnel`,
      type: funnelType,
      status: 'draft',
      headline: generated.headline,
      subheadline: generated.subheadline,
      cta_text: generated.cta,
      description: generated.description,
      email_sequence: generated.emailSequence || [],
    })
    if (funnel) {
      const url = await publishFunnel(funnel.id)
      setSavedFunnelId(funnel.id)
      setPublishedUrl(url)
      setStep('published')
    }
  }

  const handleRegenerate = async () => {
    setStep('generating')
    try {
      const content = await generateFunnelContent(description, funnelType)
      setGenerated(content)
      setStep('review')
    } catch {
      setStep('review')
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(publishedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-md flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">DOLO</span>
        </div>
        <span className="text-white/30 text-sm">/ New Funnel</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Step: Type */}
        {step === 'type' && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">What kind of funnel?</h1>
            <p className="text-white/50 mb-8">Pick the goal. DOLO builds the rest.</p>
            <div className="grid md:grid-cols-2 gap-3">
              {FUNNEL_TYPES.map(ft => (
                <button
                  key={ft.id}
                  onClick={() => { setFunnelType(ft.id); setStep('describe') }}
                  className="bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/8 rounded-2xl p-5 text-left transition-all group"
                >
                  <span className="text-2xl mb-3 block">{ft.emoji}</span>
                  <div className="font-semibold text-white group-hover:text-violet-300 transition-colors">{ft.label}</div>
                  <div className="text-white/40 text-sm mt-1">{ft.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Describe */}
        {step === 'describe' && (
          <div>
            <button onClick={() => setStep('type')} className="text-white/40 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">Describe your business</h1>
            <p className="text-white/50 mb-8">The more specific you are, the better DOLO's AI performs.</p>
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Funnel name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. My Coaching Offer Q2"
                  value={funnelName}
                  onChange={e => setFunnelName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Business description <span className="text-white/30">(required)</span></label>
                <textarea
                  placeholder="e.g. I help busy professionals reclaim 3+ hours daily through time-blocking systems. My target audience is overwhelmed executives aged 30-50 who feel like they never have enough time."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
                <p className="text-white/20 text-xs mt-1">Include: what you do, who you help, the transformation you deliver</p>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={!description.trim()}
                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-40 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-5 h-5" /> Generate my funnel
              </button>
            </div>
          </div>
        )}

        {/* Step: Generating */}
        {step === 'generating' && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Building your funnel...</h2>
            <p className="text-white/40">AI is crafting your headline, copy, CTA, and email sequence</p>
            <div className="mt-8 space-y-2 text-left max-w-sm mx-auto">
              {['Analyzing your business', 'Writing high-converting copy', 'Crafting email sequence', 'Optimizing for conversion'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step: Review */}
        {step === 'review' && generated && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Your funnel is ready</h1>
                <p className="text-white/50 mt-1">Review and publish</p>
              </div>
              <button onClick={handleRegenerate} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors border border-white/10 px-3 py-2 rounded-lg">
                <RefreshCw className="w-4 h-4" /> Regenerate
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {/* Funnel Preview Card */}
              <div className="bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-2xl p-6">
                <div className="text-xs text-white/30 uppercase tracking-wider mb-4">Funnel Preview</div>
                <h2 className="text-xl font-bold text-white mb-2">{generated.headline}</h2>
                <p className="text-white/60 text-sm mb-4">{generated.subheadline}</p>
                <p className="text-white/40 text-sm mb-5">{generated.description}</p>
                <button className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm">
                  {generated.cta}
                </button>
              </div>

              {/* Email Sequence */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-xs text-white/30 uppercase tracking-wider mb-4">Email Sequence (5 emails)</div>
                <div className="space-y-2">
                  {(generated.emailSequence || []).map((subject: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-white/30 flex-shrink-0 w-12">Day {[1,3,7,14,21][i]}</span>
                      <span className="text-white/70">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handlePublish}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle className="w-5 h-5" /> Publish funnel
            </button>
          </div>
        )}

        {/* Step: Published */}
        {step === 'published' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Funnel is live!</h1>
            <p className="text-white/50 mb-8">Your funnel is published and ready to convert.</p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Globe className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <span className="text-white/70 text-sm flex-1 text-left truncate">{publishedUrl}</span>
              <button onClick={copyUrl} className="text-violet-400 hover:text-violet-300 transition-colors flex-shrink-0">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/dashboard')} className="flex-1 border border-white/20 text-white py-3 rounded-xl font-medium hover:border-white/40 transition-colors">
                Go to dashboard
              </button>
              <button onClick={() => { setStep('type'); setGenerated(null); setDescription(''); setFunnelName('') }}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium transition-colors">
                Build another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Fix missing Globe import
function Globe(props: any) {
  return <ExternalLink {...props} />
}
