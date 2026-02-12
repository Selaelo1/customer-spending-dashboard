import React from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CustomerProfile } from './components/dashboard/CustomerProfile';
import { SpendingSummary } from './components/dashboard/SpendingSummary';
import { CategorySpending } from './components/dashboard/CategorySpending';
import { SpendingTrends } from './components/dashboard/SpendingTrends';
import { TransactionsList } from './components/dashboard/TransactionsList';
import { SpendingGoals } from './components/dashboard/SpendingGoals';
import { useDashboardData } from './hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

function App() {
  const {
    customer,
    summary,
    categoryData,
    trends,
    transactions,
    goals,
    loading,
    error,
    hasMoreTransactions,
    selectedPeriod,
    selectedCategory,
    sortBy,
    updatePeriod,
    updateSortBy,
    updateCategoryFilter,
    loadMoreTransactions,
    refreshData
  } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-capitec-teal animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading your financial insights...</p>
        </div>
      </div>
    );
  }

  if (error || !customer || !summary || !categoryData || !trends) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm mt-1">{error || 'Failed to load dashboard data'}</p>
            <button
              onClick={refreshData}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Customer Profile */}
        <CustomerProfile customer={customer} />

        {/* Key Metrics */}
        <SpendingSummary 
          summary={summary} 
          onPeriodChange={updatePeriod}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Category Spending */}
          <div className="lg:col-span-2">
            <CategorySpending data={categoryData} />
          </div>
          
          {/* Right Column - Spending Goals */}
          <div className="lg:col-span-1">
            <SpendingGoals goals={goals} />
          </div>
        </div>

        {/* Spending Trends */}
        <SpendingTrends data={trends} />

        {/* Recent Transactions */}
        <TransactionsList
          transactions={transactions}
          onLoadMore={loadMoreTransactions}
          hasMore={hasMoreTransactions}
          onSortChange={updateSortBy}
          onCategoryFilter={updateCategoryFilter}
          selectedCategory={selectedCategory}
        />
      </div>
    </DashboardLayout>
  );
}

export default App;