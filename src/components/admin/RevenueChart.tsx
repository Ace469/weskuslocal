import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 24500 },
  { month: 'Feb', revenue: 28750 },
  { month: 'Mar', revenue: 32100 },
  { month: 'Apr', revenue: 29800 },
  { month: 'May', revenue: 35200 },
  { month: 'Jun', revenue: 38500 },
];

export const RevenueChart: React.FC = () => {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span>+12.5% from last month</span>
        </div>
      </div>

      <div className="h-64">
        <div className="h-full flex items-end gap-4">
          {monthlyData.map((data) => (
            <div
              key={data.month}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div 
                className="w-full bg-indigo-100 rounded-t-lg relative group"
                style={{ 
                  height: `${(data.revenue / maxRevenue) * 100}%`,
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  ${data.revenue.toLocaleString()}
                </div>
                <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-t-lg" />
              </div>
              <span className="text-sm text-gray-600">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};