import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

export { stripePromise };

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    priceId: 'price_free',
    features: [
      '3 active funnels',
      'AI content generation',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    priceId: import.meta.env.VITE_STRIPE_PRICE_PRO || 'price_pro',
    features: [
      'Unlimited funnels',
      'Advanced AI features',
      'A/B testing',
      'Priority support',
      'Custom domains'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
    features: [
      'Everything in Pro',
      'White label solution',
      'API access',
      'Dedicated support'
    ]
  }
];

export const createCheckoutSession = async (priceId: string) => {
  // In production, this would call your backend
  // For demo, we'll simulate the checkout process
  
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe not loaded');

  // Simulate checkout - in production, call your backend API
  console.log('Creating checkout session for:', priceId);
  
  // For demo purposes, redirect to a success page
  window.location.href = '/dashboard?upgraded=true';
  
  return { success: true };
};
