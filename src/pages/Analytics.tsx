import React from 'react';
import { ArrowLeft, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Button from '../components/Button';

export default function Analytics() {
  const navigate = useNavigate();
  const { funnels } = useData();

  const totalViews = funnels.reduce((sum, f) => sum + f.analytics.views, 0);
  const totalConversions = funnels.reduce((sum, f) => sum + f.analytics.conversions, 0);
  const totalRevenue = funnels.reduce((sum, f) => sum + f.analytics.revenue, 0);
  const avgConversionRate = totalViews > 0 ? (totalConversions / totalViews * 100) : 0;

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
                Back to Dashboard
              </Button>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Track your funnel performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalViews.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Target className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalConversions.toString()}</h3>
            <p className="text-sm text-gray-600">Conversions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{avgConversionRate.toFixed(1)}%</h3>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Revenue</p>
          </div>
        </div>

        {/* Funnel Performance Table */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Funnel Performance
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funnel Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conv. Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {funnels.map((funnel) => {
                  const conversionRate = funnel.analytics.views > 0 
                    ? (funnel.analytics.conversions / funnel.analytics.views * 100)
                    : 0;
                    
                  return (
                    <tr key={funnel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {funnel.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {funnel.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {funnel.analytics.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {funnel.analytics.conversions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {conversionRate.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${funnel.analytics.revenue.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {funnels.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No funnels to analyze yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first funnel to start tracking analytics.
                </p>
                <Button onClick={() => navigate('/builder')}>
                  Create Funnel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
