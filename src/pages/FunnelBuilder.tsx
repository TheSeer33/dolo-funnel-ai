import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Button from '../components/Button';
import AIContentGenerator from '../components/AIContentGenerator';
import FunnelPreview from '../components/FunnelPreview';

export default function FunnelBuilder() {
  const navigate = useNavigate();
  const { addFunnel, generateAIContent } = useData();
  const [activeStep, setActiveStep] = useState(1);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const [funnelData, setFunnelData] = useState({
    name: '',
    type: 'landing' as const,
    status: 'draft' as const,
    content: {
      headline: '',
      subheadline: '',
      cta: '',
      description: ''
    },
    analytics: {
      views: 0,
      conversions: 0,
      conversionRate: 0,
      revenue: 0
    }
  });

  const steps = [
    { id: 1, name: 'Type & Setup' },
    { id: 2, name: 'Content & Copy' },
    { id: 3, name: 'Design & Preview' },
    { id: 4, name: 'Publish' }
  ];

  const funnelTypes = [
    { id: 'landing', name: 'Landing Page', icon: '🎯' },
    { id: 'sales', name: 'Sales Funnel', icon: '💰' },
    { id: 'webinar', name: 'Webinar Funnel', icon: '📹' },
    { id: 'lead-magnet', name: 'Lead Magnet', icon: '🧲' }
  ];

  const handleAIGenerate = async (contentType: string, prompt: string) => {
    setIsGenerating(true);
    try {
      const content = await generateAIContent(contentType, prompt);
      setFunnelData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [contentType]: content
        }
      }));
    } catch (error) {
      console.error('Error generating AI content:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleSave = () => {
    if (funnelData.name && funnelData.content.headline) {
      addFunnel(funnelData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Create New Funnel
                </h1>
                <p className="text-sm text-gray-600">
                  Step {activeStep} of {steps.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {activeStep >= 3 && (
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              
              <Button onClick={handleSave}>
                <Eye className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${activeStep >= 3 ? 'lg:grid-cols-2' : ''} gap-8`}>
          <div className={activeStep >= 3 ? '' : 'max-w-4xl mx-auto'}>
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    activeStep === step.id
                      ? 'bg-purple-600 text-white'
                      : activeStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {activeStep > step.id ? '✓' : step.id}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-2 ${
                    activeStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-1">
              {steps[activeStep - 1].name}
            </h3>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          {activeStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Funnel Setup
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funnel Name
                </label>
                <input
                  type="text"
                  value={funnelData.name}
                  onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter funnel name..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Funnel Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {funnelTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFunnelData(prev => ({ ...prev, type: type.id as any }))}
                      className={`p-4 text-left rounded-lg border-2 transition-colors ${
                        funnelData.type === type.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium text-gray-900">
                        {type.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Content & Copy
                </h3>
                <Button variant="outline">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={funnelData.content.headline}
                    onChange={(e) => setFunnelData(prev => ({
                      ...prev,
                      content: { ...prev.content, headline: e.target.value }
                    }))}
                    placeholder="Enter your compelling headline..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={funnelData.content.subheadline}
                    onChange={(e) => setFunnelData(prev => ({
                      ...prev,
                      content: { ...prev.content, subheadline: e.target.value }
                    }))}
                    placeholder="Supporting text..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Call to Action
                  </label>
                  <input
                    type="text"
                    value={funnelData.content.cta}
                    onChange={(e) => setFunnelData(prev => ({
                      ...prev,
                      content: { ...prev.content, cta: e.target.value }
                    }))}
                    placeholder="Get Started Now"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Design & Preview
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Preview Your Funnel</h4>
                <p className="text-sm text-blue-800">
                  See how your funnel looks on desktop and mobile. Use the preview toggle in the header to switch between views.
                </p>
              </div>
            </div>
          )}
          {activeStep === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                Your funnel looks great!
              </h4>
              <p className="text-gray-600 mb-6">
                Ready to publish and start converting visitors?
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={handleSave}>
                  Save as Draft
                </Button>
                <Button onClick={handleSave}>
                  Publish Funnel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
            disabled={activeStep === steps.length}
          >
            Next
          </Button>
        </div>
          </div>
          
          {/* Preview Panel */}
          {activeStep >= 3 && (
            <div className="lg:sticky lg:top-8">
              <FunnelPreview 
                funnel={funnelData} 
                previewMode={previewMode}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* AI Content Generator Modal */}
      {showAIGenerator && (
        <AIContentGenerator
          onClose={() => setShowAIGenerator(false)}
          onGenerate={handleAIGenerate}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}
