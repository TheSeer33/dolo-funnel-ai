import React, { useState } from 'react';
import { Plus, Zap, TrendingUp, Users, DollarSign, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { funnels } = useData();
  const navigate = useNavigate();

  const stats = {
    totalFunnels: funnels.length,
    totalViews: funnels.reduce((sum, f) => sum + f.analytics.views, 0),
    totalConversions: funnels.reduce((sum, f) => sum + f.analytics.conversions, 0),
    totalRevenue: funnels.reduce((sum, f) => sum + f.analytics.revenue, 0),
  };

  const conversionRate = stats.totalViews > 0 ? (stats.totalConversions / stats.totalViews * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <Zap className="w-8 h-8 text-purple-600 mr-2" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  DOLO's Funnel AI
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/builder')}>
                <Plus className="w-4 h-4 mr-2" />
                New Funnel
              </Button>
              
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {user?.name}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your funnels today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalFunnels}</h3>
            <p className="text-sm text-gray-600">Total Funnels</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalViews.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalConversions}</h3>
            <p className="text-sm text-gray-600">Conversions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Revenue</p>
          </div>
        </div>

        {/* Conversion Rate Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overall Conversion Rate</h3>
              <p className="text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
              <p className="text-purple-100 mt-1">
                {stats.totalConversions} conversions from {stats.totalViews} views
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        {/* Funnels Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Funnels</h2>
            <Button variant="outline" onClick={() => navigate('/builder')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </div>

          {funnels.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No funnels yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first funnel to start converting visitors into customers.
              </p>
              <Button onClick={() => navigate('/builder')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Funnel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {funnels.map(funnel => (
                <div
                  key={funnel.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">
                    {funnel.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {funnel.type.replace('-', ' ')}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {funnel.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1 inline text-blue-500" />
                      {funnel.analytics.views.toLocaleString()} views
                    </div>
                    <div className="text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-1 inline text-green-500" />
                      {funnel.analytics.conversions} conversions
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {funnel.updatedAt.toLocaleDateString()}
                    </div>
                    <div className="text-sm font-medium text-purple-600">
                      {((funnel.analytics.conversions / funnel.analytics.views) * 100 || 0).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
