import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, ChevronDown, ArrowUpDown, Filter } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Transaction, SortBy } from '../../types';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Your latest spending activity</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-[#00A3AD] focus:border-[#00A3AD]"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 sm:border-0"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort by</label>
              <select
                onChange={(e) => onSortChange(e.target.value as SortBy)}
                className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#00A3AD] focus:border-[#00A3AD]"
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
                className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#00A3AD] focus:border-[#00A3AD]"
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
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors gap-3"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${transaction.categoryColor}20` }}
              >
                <span style={{ color: transaction.categoryColor }}>
                  {getIcon(transaction.icon)}
                </span>
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{transaction.merchant}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{formatDate(transaction.date, 'dd MMM yyyy')}</span>
                  <span className="hidden sm:inline text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-500 truncate">{transaction.paymentMethod}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end sm:space-x-4 ml-12 sm:ml-0">
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </p>
              <Badge variant="default" className="ml-2 sm:ml-0">
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
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-[#00A3AD] hover:text-[#0B2A4A] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 sm:border-0"
          >
            Load more transactions
          </button>
        </div>
      )}
    </Card>
  );
};