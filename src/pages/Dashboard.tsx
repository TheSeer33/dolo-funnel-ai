import React, { useState } from 'react'
import { Plus, BarChart2, Globe, Zap, LogOut, Eye, Trash2, ExternalLink } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useFunnels, Funnel } from '../contexts/FunnelContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { funnels, deleteFunnel, loading } = useFunnels()
  const navigate = useNavigate()

  const totalViews = funnels.reduce((s, f) => s + (f.views || 0), 0)
  const totalConversions = funnels.reduce((s, f) => s + (f.conversions || 0), 0)
  const avgConversionRate = funnels.length > 0
    ? ((totalConversions / Math.max(totalViews, 1)) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">DOLO</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm hidden md:block">{user?.email}</span>
          <button onClick={signOut} className="text-white/40 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Funnels', value: funnels.length, icon: Zap },
            { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye },
            { label: 'Avg. Conversion', value: `${avgConversionRate}%`, icon: BarChart2 },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <stat.icon className="w-5 h-5 text-violet-400 mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Funnels */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Your Funnels</h2>
          <button
            onClick={() => navigate('/builder')}
            className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> New Funnel
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-white/30">Loading funnels...</div>
        ) : funnels.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <Zap className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 mb-4">No funnels yet. Build your first one.</p>
            <button
              onClick={() => navigate('/builder')}
              className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              Build my first funnel
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {funnels.map((funnel) => (
              <FunnelCard key={funnel.id} funnel={funnel} onDelete={() => deleteFunnel(funnel.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FunnelCard({ funnel, onDelete }: { funnel: Funnel; onDelete: () => void }) {
  const statusColors = { draft: 'bg-yellow-500/20 text-yellow-400', published: 'bg-green-500/20 text-green-400', archived: 'bg-white/10 text-white/40' }
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{funnel.name}</h3>
          <p className="text-white/40 text-xs mt-0.5 capitalize">{funnel.type}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[funnel.status]}`}>
          {funnel.status}
        </span>
      </div>
      <p className="text-white/60 text-sm mb-4 line-clamp-2">{funnel.headline}</p>
      <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{funnel.views} views</span>
        <span className="flex items-center gap-1"><BarChart2 className="w-3 h-3" />{funnel.conversions} leads</span>
      </div>
      <div className="flex items-center gap-2">
        {funnel.published_url && (
          <a href={funnel.published_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> View live
          </a>
        )}
        <button onClick={onDelete} className="ml-auto text-white/20 hover:text-red-400 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
