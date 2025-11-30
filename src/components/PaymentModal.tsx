import React, { useState } from 'react';
import { X, CreditCard, Check, Loader2 } from 'lucide-react';
import Button from './Button';
import { createCheckoutSession, pricingPlans, PricingPlan } from '../lib/stripe';

interface PaymentModalProps {
  plan: PricingPlan;
  onClose: () => void;
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpgrade = async () => {
    setLoading(true);
    setError('');
    
    try {
      await createCheckoutSession(plan.priceId);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upgrade to {plan.name}
          </h2>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            ${plan.price}<span className="text-lg text-gray-500">/month</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleUpgrade}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CreditCard className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Processing...' : `Upgrade to ${plan.name}`}
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Cancel
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
