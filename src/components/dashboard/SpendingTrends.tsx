import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp } from 'lucide-react';
import type { SpendingTrends as SpendingTrendsType } from '../../types';
import { formatCurrency, formatMonth } from '../../utils/formatters';

interface SpendingTrendsProps {
  data: SpendingTrendsType;
}

export const SpendingTrends: React.FC<SpendingTrendsProps> = ({ data }) => {
  const maxSpent = Math.max(...data.trends.map(t => t.totalSpent));
  const minSpent = Math.min(...data.trends.map(t => t.totalSpent));

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending Trends</h3>
          <p className="text-sm text-gray-500">Monthly spending pattern</p>
        </div>
        <div className="p-2 bg-[#00A3AD]/10 rounded-lg">
          <TrendingUp className="w-5 h-5 text-[#00A3AD]" />
        </div>
      </div>

      <div className="space-y-4">
        {data.trends.slice(-6).map((trend) => {
          const height = ((trend.totalSpent - minSpent) / (maxSpent - minSpent || 1)) * 100;
          
          return (
            <div key={trend.month} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs text-gray-500 sm:w-16">{formatMonth(trend.month)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1 gap-4">
                  <div 
                    className="h-2 bg-[#00A3AD] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(height, 20)}%` }}
                  />
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatCurrency(trend.totalSpent)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-1 sm:gap-2">
                  <span>{trend.transactionCount} transactions</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Avg {formatCurrency(trend.averageTransaction)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};