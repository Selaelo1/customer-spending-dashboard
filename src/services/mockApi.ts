import type { 
  Customer, SpendingSummary, SpendingByCategory, SpendingTrends,
  TransactionsResponse, SpendingGoalsResponse, FiltersResponse,
  Period, SortBy, Transaction
} from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../utils/constants';
import { subDays, format, subMonths } from 'date-fns';

const MOCK_CUSTOMER: Customer = {
  customerId: '12345',
  name: 'John Doe',
  email: 'john.doe@email.com',
  joinDate: '2023-01-15',
  accountType: 'premium',
  totalSpent: 15420.50,
  currency: 'ZAR'
};

export const mockApi = {
  getCustomerProfile: async (customerId: string): Promise<Customer> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...MOCK_CUSTOMER, customerId };
  },

  getSpendingSummary: async (customerId: string, period: Period = '30d'): Promise<SpendingSummary> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      period,
      totalSpent: 4250.75,
      transactionCount: 47,
      averageTransaction: 90.44,
      topCategory: 'Groceries',
      comparedToPrevious: {
        spentChange: 12.5,
        transactionChange: -3.2
      }
    };
  },

  getSpendingByCategory: async (
    customerId: string, 
    period: Period = '30d',
    startDate?: string,
    endDate?: string
  ): Promise<SpendingByCategory> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : subDays(end, 30);
    
    return {
      dateRange: {
        startDate: format(start, 'yyyy-MM-dd'),
        endDate: format(end, 'yyyy-MM-dd')
      },
      totalAmount: 4250.75,
      categories: [
        { name: 'Groceries', amount: 1250.30, percentage: 29.4, transactionCount: 15, color: CATEGORY_COLORS.Groceries, icon: CATEGORY_ICONS.Groceries },
        { name: 'Entertainment', amount: 890.20, percentage: 20.9, transactionCount: 8, color: CATEGORY_COLORS.Entertainment, icon: CATEGORY_ICONS.Entertainment },
        { name: 'Transportation', amount: 680.45, percentage: 16.0, transactionCount: 12, color: CATEGORY_COLORS.Transportation, icon: CATEGORY_ICONS.Transportation },
        { name: 'Dining', amount: 520.30, percentage: 12.2, transactionCount: 9, color: CATEGORY_COLORS.Dining, icon: CATEGORY_ICONS.Dining },
        { name: 'Shopping', amount: 450.80, percentage: 10.6, transactionCount: 6, color: CATEGORY_COLORS.Shopping, icon: CATEGORY_ICONS.Shopping },
        { name: 'Utilities', amount: 458.70, percentage: 10.8, transactionCount: 3, color: CATEGORY_COLORS.Utilities, icon: CATEGORY_ICONS.Utilities }
      ]
    };
  },

  getSpendingTrends: async (customerId: string, months: number = 12): Promise<SpendingTrends> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const trends = [];
    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      trends.push({
        month: format(date, 'yyyy-MM'),
        totalSpent: 3800 + Math.random() * 600,
        transactionCount: 40 + Math.floor(Math.random() * 15),
        averageTransaction: 85 + Math.random() * 25
      });
    }
    
    return { trends };
  },

  getTransactions: async (
    customerId: string,
    limit: number = 20,
    offset: number = 0,
    category?: string,
    startDate?: string,
    endDate?: string,
    sortBy: SortBy = 'date_desc'
  ): Promise<TransactionsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const transactions: Transaction[] = [
      {
        id: 'txn_123456',
        date: '2024-09-16T14:30:00Z',
        merchant: 'Pick n Pay',
        category: 'Groceries',
        amount: 245.80,
        description: 'Weekly groceries',
        paymentMethod: 'Credit Card',
        icon: CATEGORY_ICONS.Groceries,
        categoryColor: CATEGORY_COLORS.Groceries
      },
      {
        id: 'txn_123457',
        date: '2024-09-15T10:15:00Z',
        merchant: 'Netflix',
        category: 'Entertainment',
        amount: 199.00,
        description: 'Monthly subscription',
        paymentMethod: 'Debit Order',
        icon: CATEGORY_ICONS.Entertainment,
        categoryColor: CATEGORY_COLORS.Entertainment
      },
      {
        id: 'txn_123458',
        date: '2024-09-14T08:45:00Z',
        merchant: 'Engen',
        category: 'Transportation',
        amount: 650.00,
        description: 'Fuel',
        paymentMethod: 'Credit Card',
        icon: CATEGORY_ICONS.Transportation,
        categoryColor: CATEGORY_COLORS.Transportation
      }
    ];
    
    return {
      transactions: transactions.slice(offset, offset + limit),
      pagination: {
        total: 1250,
        limit,
        offset,
        hasMore: offset + limit < 1250
      }
    };
  },

  getSpendingGoals: async (customerId: string): Promise<SpendingGoalsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      goals: [
        {
          id: 'goal_001',
          category: 'Entertainment',
          monthlyBudget: 1000.00,
          currentSpent: 650.30,
          percentageUsed: 65.03,
          daysRemaining: 12,
          status: 'on_track'
        },
        {
          id: 'goal_002',
          category: 'Groceries',
          monthlyBudget: 1500.00,
          currentSpent: 1450.80,
          percentageUsed: 96.72,
          daysRemaining: 12,
          status: 'warning'
        }
      ]
    };
  },

  getFilters: async (customerId: string): Promise<FiltersResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      categories: Object.entries(CATEGORY_COLORS).map(([name, color]) => ({
        name,
        color,
        icon: CATEGORY_ICONS[name as keyof typeof CATEGORY_ICONS]
      })),
      dateRangePresets: [
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
        { label: 'Last 90 days', value: '90d' },
        { label: 'Last year', value: '1y' }
      ]
    };
  }
};