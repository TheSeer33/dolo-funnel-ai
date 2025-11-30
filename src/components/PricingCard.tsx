import React from 'react';
import { Check } from 'lucide-react';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  onButtonClick,
  popular = false
}: PricingCardProps) {
  return (
    <div className={`relative bg-white/70 backdrop-blur-sm rounded-2xl border p-8 hover:bg-white/90 transition-all duration-300 hover:shadow-xl ${
      popular 
        ? 'border-purple-200 ring-2 ring-purple-500 shadow-xl' 
        : 'border-white/20'
    }`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500 ml-1">/{period}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        size="lg"
        onClick={onButtonClick}
        className="w-full"
        variant={popular ? 'primary' : 'outline'}
      >
        {buttonText}
      </Button>
    </div>
  );
}
