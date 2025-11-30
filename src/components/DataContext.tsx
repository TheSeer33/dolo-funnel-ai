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
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Advanced AI content generation based on context
    const generateContextualContent = (contentType: string, userPrompt: string): string => {
      const promptLower = userPrompt.toLowerCase();
      
      switch (contentType) {
        case 'headline':
          if (promptLower.includes('fitness') || promptLower.includes('health')) {
            return 'Transform Your Body in 30 Days: The Science-Backed Method That Actually Works';
          }
          if (promptLower.includes('business') || promptLower.includes('entrepreneur')) {
            return 'From $0 to $100K: The Entrepreneur\'s Blueprint for Rapid Growth';
          }
          if (promptLower.includes('marketing') || promptLower.includes('funnel')) {
            return 'Double Your Conversions with This Simple Marketing Strategy';
          }
          if (promptLower.includes('course') || promptLower.includes('education')) {
            return 'Master Any Skill 10x Faster with This Revolutionary Learning System';
          }
          return 'Unlock Your True Potential: The System That Changes Everything';
          
        case 'subheadline':
          if (promptLower.includes('fitness')) {
            return 'Join 50,000+ people who\'ve already transformed their bodies using our proven system - no gym required, results guaranteed in 30 days or your money back';
          }
          if (promptLower.includes('business')) {
            return 'The exact step-by-step system used by 10,000+ entrepreneurs to build profitable businesses from scratch - even if you\'re starting with $0';
          }
          if (promptLower.includes('marketing')) {
            return 'Discover the conversion optimization secrets that helped our clients generate over $50M in additional revenue last year alone';
          }
          return 'The proven method that\'s helped thousands achieve extraordinary results - backed by real data and success stories';
          
        case 'cta':
          if (promptLower.includes('free') || promptLower.includes('trial')) return 'Start Your Free Trial';
          if (promptLower.includes('download') || promptLower.includes('guide')) return 'Get Instant Access';
          if (promptLower.includes('course') || promptLower.includes('training')) return 'Enroll Now';
          if (promptLower.includes('consultation') || promptLower.includes('call')) return 'Book Your Call';
          return 'Get Started Today';
          
        case 'description':
          return 'This comprehensive solution addresses your specific needs with proven strategies that deliver real results. Our approach combines cutting-edge techniques with time-tested methods to ensure your success.';
          
        default:
          return `AI-generated ${contentType} content based on: ${userPrompt}`;
      }
    };
    
    return generateContextualContent(type, prompt);
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
