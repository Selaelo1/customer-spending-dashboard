import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import * as Icons from 'lucide-react';
import type { SpendingByCategory, Category } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CategorySpendingProps {
  data: SpendingByCategory;
}

export const CategorySpending: React.FC<CategorySpendingProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className: string }>;
    return IconComponent ? React.createElement(IconComponent, { className: "w-4 h-4" }) : null;
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
          <p className="text-sm text-gray-500">
            {data.dateRange.startDate} - {data.dateRange.endDate}
          </p>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-[#0B2A4A]">
          {formatCurrency(data.totalAmount)}
        </p>
      </div>

      <div className="space-y-4">
        {data.categories.map((category: Category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span style={{ color: category.color }}>
                    {getIcon(category.icon)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                  <p className="text-xs text-gray-500">{category.transactionCount} transactions</p>
                </div>
              </div>
              <div className="text-left sm:text-right ml-11 sm:ml-0">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(category.amount)}
                </p>
                <p className="text-xs text-gray-500">{category.percentage}%</p>
              </div>
            </div>
            <ProgressBar 
              value={category.percentage} 
              max={100}
              color={category.color}
              height="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};