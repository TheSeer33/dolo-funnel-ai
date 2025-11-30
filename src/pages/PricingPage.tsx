import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PricingCard from '../components/PricingCard';
import PaymentModal from '../components/PaymentModal';
import { pricingPlans, PricingPlan } from '../lib/stripe';

export default function PricingPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handlePlanSelect = (plan: PricingPlan) => {
    if (plan.price === 0) {
      // Free plan - just redirect to dashboard
      navigate('/dashboard');
    } else {
      // Paid plan - show payment modal
      setSelectedPlan(plan);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              price={`$${plan.price}`}
              period={plan.price === 0 ? 'forever' : 'month'}
              description={plan.id === 'free' ? 'Perfect for getting started' : 
                          plan.id === 'pro' ? 'For serious entrepreneurs' : 
                          'For scaling businesses'}
              features={plan.features}
              buttonText={plan.price === 0 ? 'Get Started Free' : `Upgrade to ${plan.name}`}
              onButtonClick={() => handlePlanSelect(plan)}
              popular={plan.id === 'pro'}
            />
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
