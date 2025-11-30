import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({ name, role, avatar, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <blockquote className="text-gray-700 mb-6 italic">
        "{content}"
      </blockquote>
      
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
}
