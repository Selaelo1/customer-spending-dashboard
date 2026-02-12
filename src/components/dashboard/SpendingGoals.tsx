import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Target, AlertCircle, CheckCircle } from 'lucide-react';
import type{ SpendingGoal } from '../../types'; // Fixed import!
import { formatCurrency } from '../../utils/formatters';

interface SpendingGoalsProps {
  goals: SpendingGoal[];
}

export const SpendingGoals: React.FC<SpendingGoalsProps> = ({ goals }) => {
  const getStatusColor = (status: SpendingGoal['status']) => {
    switch (status) {
      case 'on_track': return 'success';
      case 'warning': return 'warning';
      case 'over_budget': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: SpendingGoal['status']) => {
    switch (status) {
      case 'on_track': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'over_budget': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending Goals</h3>
          <p className="text-sm text-gray-500">Track your monthly budgets</p>
        </div>
        <div className="p-2 bg-capitec-orange/10 rounded-lg">
          <Target className="w-5 h-5 text-capitec-orange" />
        </div>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{goal.category}</span>
                <Badge variant={getStatusColor(goal.status)}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(goal.status)}
                    <span className="ml-1">
                      {goal.status === 'on_track' ? 'On Track' : 
                       goal.status === 'warning' ? 'Warning' : 'Over Budget'}
                    </span>
                  </span>
                </Badge>
              </div>
              <span className="text-sm text-gray-500">{goal.daysRemaining} days left</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Spent</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(goal.currentSpent)} / {formatCurrency(goal.monthlyBudget)}
                </span>
              </div>
              <ProgressBar 
                value={goal.percentageUsed} 
                color={goal.percentageUsed > 90 ? '#FF6B4A' : '#00A3AD'}
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{goal.percentageUsed.toFixed(1)}% used</span>
                <span className="text-gray-500">
                  Remaining: {formatCurrency(goal.monthlyBudget - goal.currentSpent)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};