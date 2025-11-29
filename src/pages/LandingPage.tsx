import React, { useState } from 'react';
import { Sparkles, Zap, Target, TrendingUp, Users, ChevronRight, Play, Share2, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import PricingCard from '../components/PricingCard';
import WaitlistModal from '../components/WaitlistModal';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Funnel Builder</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Build Funnels That
              <br />
              Actually Convert
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Create landing pages, email sequences, and ad copy in minutes with AI. 
              No design skills needed. Just results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="group"
              >
                Start Building for Free
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowWaitlistModal(true)}
                className="group"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">$2.3M+</div>
                <div className="text-sm text-gray-600">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
                <div className="text-sm text-gray-600">Higher Conversions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From landing pages to email sequences, our AI handles the heavy lifting 
              so you can focus on growing your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI-Powered Content"
              description="Generate compelling headlines, copy, and CTAs that convert with our advanced AI engine."
              gradient="from-yellow-400 to-orange-500"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Smart Targeting"
              description="Automatically optimize your funnels for your specific audience and industry."
              gradient="from-green-400 to-blue-500"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Real-time Analytics"
              description="Track conversions, A/B test variations, and optimize performance instantly."
              gradient="from-purple-400 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Entrepreneurs
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about their results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              role="E-commerce Founder"
              avatar="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150"
              content="Increased my conversion rate from 2% to 18% in just 3 weeks. This tool is incredible!"
              rating={5}
            />
            <TestimonialCard
              name="Mike Rodriguez"
              role="Digital Marketer"
              avatar="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150"
              content="The AI writes better copy than I do. Saved me 20+ hours per week on funnel creation."
              rating={5}
            />
            <TestimonialCard
              name="Emma Thompson"
              role="Course Creator"
              avatar="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150"
              content="From $5K to $50K monthly revenue in 6 months. The analytics helped optimize everything."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden fees, ever.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="$0"
              period="forever"
              description="Perfect for testing the waters"
              features={[
                "3 active funnels",
                "AI content generation",
                "Basic analytics",
                "Email support",
                "Mobile responsive"
              ]}
              buttonText="Get Started Free"
              onButtonClick={handleGetStarted}
            />
            <PricingCard
              name="Pro"
              price="$29"
              period="month"
              description="For serious entrepreneurs"
              features={[
                "Unlimited funnels",
                "Advanced AI features",
                "A/B testing",
                "Priority support",
                "Custom domains",
                "Advanced analytics",
                "Email automation"
              ]}
              buttonText="Start Pro Trial"
              onButtonClick={handleGetStarted}
              popular
            />
            <PricingCard
              name="Enterprise"
              price="$99"
              period="month"
              description="For scaling businesses"
              features={[
                "Everything in Pro",
                "White label solution",
                "API access",
                "Dedicated support",
                "Custom integrations",
                "Advanced reporting",
                "Team collaboration"
              ]}
              buttonText="Contact Sales"
              onButtonClick={() => setShowWaitlistModal(true)}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to 10x Your Conversions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of entrepreneurs already building better funnels with AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="white"
              onClick={handleGetStarted}
              className="group"
            >
              Start Building Now
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowWaitlistModal(true)}
              className="text-white border-white hover:bg-white/10"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
      
      {showWaitlistModal && (
        <WaitlistModal onClose={() => setShowWaitlistModal(false)} />
      )}
    </div>
  );
}
