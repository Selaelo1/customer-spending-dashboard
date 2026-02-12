import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUp, TrendingDown, CreditCard, Calendar, DollarSign } from 'lucide-react';
import type { SpendingSummary as SpendingSummaryType, Period } from '../../types';
import { formatCurrency, formatChange } from '../../utils/formatters';
import { PERIOD_OPTIONS } from '../../utils/constants';

interface SpendingSummaryProps {
  summary: SpendingSummaryType;
  onPeriodChange: (period: Period) => void;
}

export const SpendingSummary: React.FC<SpendingSummaryProps> = ({ summary, onPeriodChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(summary.period as Period);

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    onPeriodChange(period);
  };

  const stats = [
    {
      label: 'Total Spent',
      value: formatCurrency(summary.totalSpent),
      icon: DollarSign,
      change: summary.comparedToPrevious.spentChange,
      color: 'text-capitec-teal'
    },
    {
      label: 'Transactions',
      value: summary.transactionCount,
      icon: CreditCard,
      change: summary.comparedToPrevious.transactionChange,
      color: 'text-capitec-orange'
    },
    {
      label: 'Average',
      value: formatCurrency(summary.averageTransaction),
      icon: TrendingUp,
      change: null,
      color: 'text-purple-600'
    }
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending Summary</h3>
          <p className="text-sm text-gray-500">Your spending overview for this period</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as Period)}
            className="text-sm border-gray-200 rounded-lg focus:ring-capitec-teal focus:border-capitec-teal"
          >
            {PERIOD_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              {stat.change !== null && (
                <div className={`flex items-center text-xs font-medium ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {formatChange(stat.change)}
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Top spending category</span>
          <Badge variant="info">{summary.topCategory}</Badge>
        </div>
      </div>
    </Card>
  );
};