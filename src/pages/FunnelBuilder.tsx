import React, { useState } from 'react'
import { ArrowLeft, Zap, CheckCircle, Copy, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useFunnels } from '../contexts/FunnelContext'
import { generateFunnelContent } from '../lib/groq'

const FUNNEL_TYPES = [
  { id: 'lead-magnet', name: 'Lead Magnet', desc: 'Capture emails with a free offer', emoji: '🧲' },
  { id: 'sales', name: 'Sales Funnel', desc: 'Drive direct product or service sales', emoji: '💰' },
  { id: 'webinar', name: 'Webinar', desc: 'Register attendees for a live event', emoji: '📹' },
  { id: 'coaching', name: 'Coaching', desc: 'Book discovery or strategy calls', emoji: '🎯' },
]

type Step = 'type' | 'describe' | 'generating' | 'preview' | 'done'

export default function FunnelBuilder() {
  const navigate = useNavigate()
  const { createFunnel, publishFunnel } = useFunnels()
  const [step, setStep] = useState<Step>('type')
  const [funnelType, setFunnelType] = useState('')
  const [businessDesc, setBusinessDesc] = useState('')
  const [funnelName, setFunnelName] = useState('')
  const [aiError, setAiError] = useState('')
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [savedFunnel, setSavedFunnel] = useState<any>(null)
  const [publishing, setPublishing] = useState(false)

  const handleGenerate = async () => {
    if (!businessDesc.trim()) return
    setStep('generating')
    setAiError('')
    try {
      const content = await generateFunnelContent(businessDesc, funnelType)
      setGeneratedContent(content)
      setStep('preview')
    } catch (err) {
      setAiError('AI generation failed. Please try again.')
      setStep('describe')
    }
  }

  const handleSave = async () => {
    if (!generatedContent) return
    const funnel = await createFunnel({
      name: funnelName || `${funnelType} funnel`,
      type: funnelType,
      status: 'draft',
      headline: generatedContent.headline,
      subheadline: generatedContent.subheadline,
      cta_text: generatedContent.cta_text,
      description: generatedContent.description,
      email_sequence: generatedContent.email_sequence || [],
    })
    if (funnel) { setSavedFunnel(funnel); setStep('done') }
  }

  const handlePublish = async () => {
    if (!savedFunnel) return
    setPublishing(true)
    const url = await publishFunnel(savedFunnel.id)
    setSavedFunnel((prev: any) => ({ ...prev, published_url: url, status: 'published' }))
    setPublishing(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">DOLO</span>
        </div>
        <span className="text-white/30 text-sm">/ New Funnel</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* STEP 1: Type */}
        {step === 'type' && (
          <div>
            <h1 className="text-3xl font-bold mb-2">What kind of funnel?</h1>
            <p className="text-white/50 mb-8">Pick the type that matches your goal.</p>
            <div className="grid grid-cols-2 gap-4">
              {FUNNEL_TYPES.map(t => (
                <button key={t.id} onClick={() => { setFunnelType(t.id); setStep('describe') }}
                  className="bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 rounded-2xl p-5 text-left transition-all">
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <div className="font-semibold text-white mb-1">{t.name}</div>
                  <div className="text-white/40 text-sm">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Describe */}
        {step === 'describe' && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Describe your business</h1>
            <p className="text-white/50 mb-8">The more specific, the better the funnel. One paragraph is enough.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Funnel name (e.g. 'Free Guide Funnel')" value={funnelName} onChange={e => setFunnelName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
              <textarea placeholder="Describe what you do, who you help, and what result you deliver. Example: I help busy moms lose 20lbs without giving up their favorite foods through my 8-week online program..."
                value={businessDesc} onChange={e => setBusinessDesc(e.target.value)} rows={5}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none" />
              {aiError && <p className="text-red-400 text-sm">{aiError}</p>}
              <div className="flex gap-3">
                <button onClick={() => setStep('type')} className="flex-1 border border-white/10 text-white/60 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">Back</button>
                <button onClick={handleGenerate} disabled={!businessDesc.trim()}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-40 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                  <Zap className="w-4 h-4" /> Generate with AI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Generating */}
        {step === 'generating' && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-violet-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Building your funnel...</h2>
            <p className="text-white/50">AI is writing your headline, copy, and email sequence.</p>
            <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
              {['Analyzing your business', 'Crafting headline', 'Writing email sequence', 'Optimizing CTA'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                  <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Preview */}
        {step === 'preview' && generatedContent && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Your funnel is ready</h1>
            <p className="text-white/50 mb-8">Review what AI built. Save it to your dashboard.</p>

            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-2xl p-6">
                <p className="text-violet-400 text-xs uppercase tracking-wider mb-2">Headline</p>
                <h3 className="text-xl font-bold text-white">{generatedContent.headline}</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Subheadline</p>
                <p className="text-white/80">{generatedContent.subheadline}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">CTA Button</p>
                <div className="bg-gradient-to-r from-violet-600 to-pink-600 text-white text-center py-3 rounded-xl font-semibold text-sm w-fit px-6">
                  {generatedContent.cta_text}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Email Sequence ({generatedContent.email_sequence?.length || 0} emails)</p>
                <div className="space-y-2">
                  {(generatedContent.email_sequence || []).map((subject: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="text-white/30 w-12">Day {[1,3,7,14,21][i] || i+1}</span>
                      <span className="text-white/70">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('describe')} className="flex-1 border border-white/10 text-white/60 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">Regenerate</button>
              <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold text-sm transition-all">
                Save Funnel
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Done */}
        {step === 'done' && savedFunnel && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-2">Funnel saved!</h1>
            <p className="text-white/50 mb-8">Publish it to get a shareable link, or go to your dashboard.</p>

            {savedFunnel.published_url ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Live URL</p>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 text-sm flex-1 text-left">{savedFunnel.published_url}</span>
                  <button onClick={() => navigator.clipboard.writeText(savedFunnel.published_url)}
                    className="text-white/40 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            ) : (
              <button onClick={handlePublish} disabled={publishing}
                className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50">
                <Globe className="w-4 h-4" /> {publishing ? 'Publishing...' : 'Publish Funnel'}
              </button>
            )}

            <button onClick={() => navigate('/dashboard')}
              className="w-full border border-white/10 text-white/60 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
