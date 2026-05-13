import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

export interface Funnel {
  id: string
  user_id: string
  name: string
  type: string
  status: 'draft' | 'published' | 'archived'
  headline: string
  subheadline: string
  cta_text: string
  description: string
  email_sequence: string[]
  published_url: string | null
  views: number
  conversions: number
  created_at: string
  updated_at: string
}

interface FunnelContextType {
  funnels: Funnel[]
  loading: boolean
  createFunnel: (data: Partial<Funnel>) => Promise<Funnel | null>
  updateFunnel: (id: string, data: Partial<Funnel>) => Promise<void>
  deleteFunnel: (id: string) => Promise<void>
  publishFunnel: (id: string) => Promise<string>
  refreshFunnels: () => Promise<void>
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined)

export function useFunnels() {
  const ctx = useContext(FunnelContext)
  if (!ctx) throw new Error('useFunnels must be used within FunnelProvider')
  return ctx
}

export function FunnelProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [funnels, setFunnels] = useState<Funnel[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFunnels = async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('funnels')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setFunnels(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchFunnels() }, [user])

  const createFunnel = async (data: Partial<Funnel>) => {
    if (!user) return null
    const { data: newFunnel, error } = await supabase
      .from('funnels')
      .insert({ ...data, user_id: user.id, views: 0, conversions: 0 })
      .select()
      .single()
    if (error) return null
    setFunnels(prev => [newFunnel, ...prev])
    return newFunnel
  }

  const updateFunnel = async (id: string, data: Partial<Funnel>) => {
    await supabase.from('funnels').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
    setFunnels(prev => prev.map(f => f.id === id ? { ...f, ...data } : f))
  }

  const deleteFunnel = async (id: string) => {
    await supabase.from('funnels').delete().eq('id', id)
    setFunnels(prev => prev.filter(f => f.id !== id))
  }

  const publishFunnel = async (id: string) => {
    const url = `https://usedolo.com/f/${id}`
    await updateFunnel(id, { status: 'published', published_url: url })
    return url
  }

  return (
    <FunnelContext.Provider value={{ funnels, loading, createFunnel, updateFunnel, deleteFunnel, publishFunnel, refreshFunnels: fetchFunnels }}>
      {children}
    </FunnelContext.Provider>
  )
}
