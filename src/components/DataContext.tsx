import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Funnel {
  id: string;
  name: string;
  type: 'landing' | 'sales' | 'webinar' | 'lead-magnet';
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  analytics: {
    views: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
  };
  content: {
    headline: string;
    subheadline: string;
    cta: string;
    description: string;
  };
}

interface DataContextType {
  funnels: Funnel[];
  addFunnel: (funnel: Omit<Funnel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFunnel: (id: string, updates: Partial<Funnel>) => void;
  deleteFunnel: (id: string) => void;
  generateAIContent: (type: string, prompt: string) => Promise<string>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [funnels, setFunnels] = useState<Funnel[]>([
    {
      id: '1',
      name: 'Lead Magnet Funnel',
      type: 'lead-magnet',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      analytics: {
        views: 1247,
        conversions: 156,
        conversionRate: 12.5,
        revenue: 4680
      },
      content: {
        headline: 'Get Your Free Marketing Guide',
        subheadline: 'Learn the secrets that helped 10,000+ entrepreneurs grow their business',
        cta: 'Download Free Guide',
        description: 'This comprehensive guide covers everything you need to know about digital marketing for small businesses.'
      }
    }
  ]);

  const addFunnel = (funnelData: Omit<Funnel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFunnel: Funnel = {
      ...funnelData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFunnels(prev => [...prev, newFunnel]);
    localStorage.setItem('funnels', JSON.stringify([...funnels, newFunnel]));
  };

  const updateFunnel = (id: string, updates: Partial<Funnel>) => {
    setFunnels(prev => {
      const updated = prev.map(funnel => 
        funnel.id === id 
          ? { ...funnel, ...updates, updatedAt: new Date() }
          : funnel
      );
      localStorage.setItem('funnels', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFunnel = (id: string) => {
    setFunnels(prev => {
      const filtered = prev.filter(funnel => funnel.id !== id);
      localStorage.setItem('funnels', JSON.stringify(filtered));
      return filtered;
    });
  };

  const generateAIContent = async (type: string, prompt: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates: Record<string, string[]> = {
      headline: [
        'Transform Your Business in 30 Days',
        'The Secret to 10x Growth',
        'From Zero to Hero: Your Success Story Starts Here',
        'Unlock Your True Potential Today'
      ],
      subheadline: [
        'Join 10,000+ successful entrepreneurs who\'ve already transformed their lives',
        'The proven system that\'s helped people achieve extraordinary results',
        'Everything you need to succeed, backed by real results'
      ],
      cta: [
        'Get Started Today',
        'Start Your Journey',
        'Transform Your Life',
        'Claim Your Spot'
      ]
    };
    
    const options = templates[type] || templates.headline;
    return options[Math.floor(Math.random() * options.length)];
  };

  const value = {
    funnels,
    addFunnel,
    updateFunnel,
    deleteFunnel,
    generateAIContent
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
