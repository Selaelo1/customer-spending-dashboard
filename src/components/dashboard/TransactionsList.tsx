import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, ChevronDown, ArrowUpDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Transaction, SortBy } from '../../types'; // Make sure SortBy is imported!
import { formatCurrency, formatDate } from '../../utils/formatters';
import { SORT_OPTIONS } from '../../utils/constants';

interface TransactionsListProps {
  transactions: Transaction[];
  onLoadMore: () => void;
  hasMore: boolean;
  onSortChange: (sortBy: SortBy) => void;
  onCategoryFilter: (category: string) => void;
  selectedCategory?: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  onLoadMore,
  hasMore,
  onSortChange,
  onCategoryFilter,
  selectedCategory
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className: string }> | undefined;
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  const filteredTransactions = transactions.filter(t => 
    t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Your latest spending activity</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-capitec-teal focus:border-capitec-teal"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-600 hover:text-capitec-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort by</label>
              <select
                onChange={(e) => onSortChange(e.target.value as SortBy)}
                className="w-full text-sm border-gray-200 rounded-lg focus:ring-capitec-teal focus:border-capitec-teal"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => onCategoryFilter(e.target.value)}
                className="w-full text-sm border-gray-200 rounded-lg focus:ring-capitec-teal focus:border-capitec-teal"
              >
                <option value="">All categories</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Dining">Dining</option>
                <option value="Shopping">Shopping</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${transaction.categoryColor}20` }}
              >
                <span style={{ color: transaction.categoryColor }}>
                  {getIcon(transaction.icon)}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{formatDate(transaction.date, 'dd MMM yyyy')}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{transaction.paymentMethod}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </p>
              <Badge variant="default" className="mt-1">
                {transaction.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 text-sm font-medium text-capitec-teal hover:text-capitec-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            Load more transactions
          </button>
        </div>
      )}
    </Card>
  );
};