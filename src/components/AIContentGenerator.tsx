import React, { useState } from 'react';
import { X, Sparkles, Loader2, Copy, RefreshCw, CheckCircle } from 'lucide-react';
import Button from './Button';

interface AIContentGeneratorProps {
  onClose: () => void;
  onGenerate: (contentType: string, prompt: string) => Promise<void>;
  isGenerating: boolean;
}

export default function AIContentGenerator({ onClose, onGenerate, isGenerating }: AIContentGeneratorProps) {
  const [selectedType, setSelectedType] = useState('headline');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const contentTypes = [
    { id: 'headline', name: 'Headline', description: 'Attention-grabbing main title', placeholder: 'A productivity app for busy entrepreneurs' },
    { id: 'subheadline', name: 'Subheadline', description: 'Supporting text below headline', placeholder: 'The app helps users manage their time better' },
    { id: 'cta', name: 'Call to Action', description: 'Button text that drives action', placeholder: 'A button for signing up to a service' },
    { id: 'email', name: 'Email Copy', description: 'Email sequence content', placeholder: 'Welcome email for new users' },
    { id: 'ad', name: 'Ad Copy', description: 'Social media ad content', placeholder: 'Facebook ad for a fitness program' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      const content = await generateContent(selectedType, prompt);
      setGeneratedContent(content);
      setHistory(prev => [content, ...prev.slice(0, 4)]); // Keep last 5 generations
      
      // Call the parent's onGenerate function
      await onGenerate(selectedType, prompt);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateContent = async (type: string, userPrompt: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const promptLower = userPrompt.toLowerCase();
    
    // Context-aware content generation
    const contentMap: Record<string, (prompt: string) => string> = {
      headline: (p) => {
        if (p.includes('fitness') || p.includes('health')) {
          return `Transform Your Body in 30 Days: The Science-Backed Method That Actually Works`;
        }
        if (p.includes('business') || p.includes('entrepreneur')) {
          return `From $0 to $100K: The Entrepreneur's Blueprint for Rapid Growth`;
        }
        if (p.includes('marketing') || p.includes('funnel')) {
          return `Double Your Conversions with This Simple Marketing Strategy`;
        }
        if (p.includes('course') || p.includes('education')) {
          return `Master Any Skill 10x Faster with This Learning System`;
        }
        return `Unlock Your True Potential: The System That Changes Everything`;
      },
      subheadline: (p) => {
        if (p.includes('fitness')) {
          return `Join 50,000+ people who've already transformed their bodies using our proven system - no gym required, results guaranteed in 30 days or your money back`;
        }
        if (p.includes('business')) {
          return `The exact step-by-step system used by 10,000+ entrepreneurs to build profitable businesses from scratch - even if you're starting with $0`;
        }
        if (p.includes('marketing')) {
          return `Discover the conversion optimization secrets that helped our clients generate over $50M in additional revenue last year alone`;
        }
        return `The proven method that's helped thousands achieve extraordinary results - backed by real data and success stories`;
      },
      cta: (p) => {
        if (p.includes('free') || p.includes('trial')) return `Start Your Free Trial`;
        if (p.includes('download') || p.includes('guide')) return `Get Instant Access`;
        if (p.includes('course') || p.includes('training')) return `Enroll Now`;
        if (p.includes('consultation') || p.includes('call')) return `Book Your Call`;
        return `Get Started Today`;
      },
      email: (p) => {
        return `Welcome to the inner circle! 🎉

I'm thrilled you've decided to join thousands of others on this incredible journey.

Here's what happens next:

✅ Check your email for your welcome package (it should arrive within 5 minutes)
✅ Join our private community where you'll get daily tips and support
✅ Watch for tomorrow's email with your first action step

Quick question: What's your biggest challenge right now? Hit reply and let me know - I read every email personally.

To your success,
[Your Name]

P.S. Make sure to add us to your contacts so you don't miss any important updates!`;
      },
      ad: (p) => {
        if (p.includes('fitness')) {
          return `🔥 This 30-day transformation will shock you
          
No gym. No restrictive diets. No BS.

Just a simple system that's helped 50,000+ people get the body they've always wanted.

See the incredible before/after photos → [Link]`;
        }
        if (p.includes('business')) {
          return `💰 From broke to $100K in 12 months
          
This entrepreneur was working 80-hour weeks for peanuts.

Then she discovered this simple system...

Now she's making $100K/year working 20 hours/week.

See how she did it → [Link]`;
        }
        return `🚀 This changes everything
        
What if I told you there's a simple system that could transform your life in just 30 days?

Thousands have already used it to achieve incredible results.

Your turn → [Link]`;
      }
    };

    return contentMap[type]?.(promptLower) || `Generated ${type} content for: ${userPrompt}`;
  };

  const useContent = () => {
    // This would integrate with the funnel builder
    onClose();
  };

  const regenerateContent = async () => {
    if (!prompt.trim()) return;
    await handleGenerate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  AI Content Generator
                </h2>
                <p className="text-sm text-gray-600">
                  Generate high-converting content with AI
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              {/* Content Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Content Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {contentTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 text-left rounded-lg border-2 transition-colors ${
                        selectedType === type.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1">
                        {type.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {type.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what you want to create
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={contentTypes.find(t => t.id === selectedType)?.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific about your target audience, product, and desired outcome
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                size="lg"
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Be specific about your target audience (e.g., "busy moms", "tech entrepreneurs")</li>
                  <li>• Include your main benefit or value proposition</li>
                  <li>• Mention any urgency or scarcity elements</li>
                  <li>• Keep regenerating until you find the perfect version</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Output */}
            <div className="space-y-6">
              {/* Generated Content */}
              {generatedContent && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Generated Content</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={regenerateContent}
                        disabled={isGenerating}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedContent}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button onClick={useContent} size="sm">
                      Use This Content
                    </Button>
                    <Button onClick={regenerateContent} variant="outline" size="sm" disabled={isGenerating}>
                      Generate Another
                    </Button>
                  </div>
                </div>
              )}

              {/* Content History */}
              {history.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Generations</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((content, index) => (
                      <button
                        key={index}
                        onClick={() => setGeneratedContent(content)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-100 transition-colors"
                      >
                        {content.substring(0, 100)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {!generatedContent && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">✨ Example Prompts</h4>
                  <div className="space-y-2">
                    {[
                      "A fitness app for busy professionals who want to work out at home",
                      "An online course teaching digital marketing to small business owners",
                      "A productivity tool for entrepreneurs to manage their daily tasks",
                      "A meal planning service for families with dietary restrictions"
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="w-full text-left p-2 text-sm text-gray-700 hover:bg-white/50 rounded border border-purple-100 transition-colors"
                      >
                        "{example}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
