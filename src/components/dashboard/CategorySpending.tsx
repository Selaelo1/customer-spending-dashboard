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
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className: string }> | undefined;
    return IconComponent ? React.createElement(IconComponent, { className: "w-4 h-4" }) : null;
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
          <p className="text-sm text-gray-500">
            {data.dateRange.startDate} - {data.dateRange.endDate}
          </p>
        </div>
        <p className="text-2xl font-bold text-capitec-navy">
          {formatCurrency(data.totalAmount)}
        </p>
      </div>

      <div className="space-y-4">
        {data.categories.map((category: Category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span style={{ color: category.color }}>
                    {getIcon(category.icon)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  <p className="text-xs text-gray-500">{category.transactionCount} transactions</p>
                </div>
              </div>
              <div className="text-right">
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