// Customer Types
export interface Customer {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: 'premium' | 'standard' | 'basic';
  totalSpent: number;
  currency: string;
}

// Spending Summary
export interface SpendingSummary {
  period: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;
    transactionChange: number;
  };
}

// Category Types
export interface Category {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
}

export interface SpendingByCategory {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: Category[];
}

// Trends Types
export interface MonthlyTrend {
  month: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface SpendingTrends {
  trends: MonthlyTrend[];
}

// Transaction Types
export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  icon: string;
  categoryColor: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// GOALS TYPES - ADD THIS ENTIRE SECTION
export interface SpendingGoal {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: 'on_track' | 'warning' | 'over_budget';
}

export interface SpendingGoalsResponse {
  goals: SpendingGoal[];
}

// Filter Types
export interface FilterCategory {
  name: string;
  color: string;
  icon: string;
}

export interface DateRangePreset {
  label: string;
  value: string;
}

export interface FiltersResponse {
  categories: FilterCategory[];
  dateRangePresets: DateRangePreset[];
}

// Utility Types
export type Period = '7d' | '30d' | '90d' | '1y';
export type SortBy = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';