import { useState, useEffect, useCallback } from 'react';
import type { 
  Customer, SpendingSummary, SpendingByCategory, SpendingTrends,
  Transaction, SpendingGoal, Period, SortBy 
} from '../types';
import { mockApi } from '../services/mockApi';

const CUSTOMER_ID = '12345';

export const useDashboardData = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [summary, setSummary] = useState<SpendingSummary | null>(null);
  const [categoryData, setCategoryData] = useState<SpendingByCategory | null>(null);
  const [trends, setTrends] = useState<SpendingTrends | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<SpendingGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(false);
  const [transactionOffset, setTransactionOffset] = useState(0);

  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30d');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [sortBy, setSortBy] = useState<SortBy>('date_desc');

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [customerData, summaryData, categoryData, trendsData, goalsData, transactionsData] = await Promise.all([
        mockApi.getCustomerProfile(CUSTOMER_ID),
        mockApi.getSpendingSummary(CUSTOMER_ID, selectedPeriod),
        mockApi.getSpendingByCategory(CUSTOMER_ID, selectedPeriod),
        mockApi.getSpendingTrends(CUSTOMER_ID),
        mockApi.getSpendingGoals(CUSTOMER_ID),
        mockApi.getTransactions(CUSTOMER_ID, 20, 0, selectedCategory, undefined, undefined, sortBy)
      ]);

      setCustomer(customerData);
      setSummary(summaryData);
      setCategoryData(categoryData);
      setTrends(trendsData);
      setGoals(goalsData.goals);
      setTransactions(transactionsData.transactions);
      setHasMoreTransactions(transactionsData.pagination.hasMore);
      setTransactionOffset(20);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, selectedCategory, sortBy]);

  const loadMoreTransactions = useCallback(async () => {
    try {
      const data = await mockApi.getTransactions(
        CUSTOMER_ID,
        20,
        transactionOffset,
        selectedCategory,
        undefined,
        undefined,
        sortBy
      );
      
      setTransactions(prev => [...prev, ...data.transactions]);
      setHasMoreTransactions(data.pagination.hasMore);
      setTransactionOffset(prev => prev + 20);
    } catch (err) {
      console.error('Error loading more transactions:', err);
    }
  }, [transactionOffset, selectedCategory, sortBy]);

  const updatePeriod = useCallback((period: Period) => {
    setSelectedPeriod(period);
  }, []);

  const updateSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setTransactions([]);
    setTransactionOffset(0);
  }, []);

  const updateCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category === '' ? undefined : category);
    setTransactions([]);
    setTransactionOffset(0);
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
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
    refreshData: loadInitialData
  };
};