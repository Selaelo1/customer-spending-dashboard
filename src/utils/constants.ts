// No imports needed at the top

// Simple string constants
export const CURRENCY = 'ZAR';
export const DATE_FORMAT = 'yyyy-MM-dd';
export const MONTH_FORMAT = 'yyyy-MM';

// Period options - simple objects
export const PERIOD_OPTIONS = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last year', value: '1y' },
];

// Sort options
export const SORT_OPTIONS = [
  { label: 'Newest first', value: 'date_desc' },
  { label: 'Oldest first', value: 'date_asc' },
  { label: 'Highest amount', value: 'amount_desc' },
  { label: 'Lowest amount', value: 'amount_asc' },
];

// Category colors
export const CATEGORY_COLORS = {
  Groceries: '#FF6B6B',
  Entertainment: '#4ECDC4',
  Transportation: '#45B7D1',
  Dining: '#F7DC6F',
  Shopping: '#BB8FCE',
  Utilities: '#85C1E9',
};

// Category icons
export const CATEGORY_ICONS = {
  Groceries: 'shopping-cart',
  Entertainment: 'film',
  Transportation: 'car',
  Dining: 'utensils',
  Shopping: 'shopping-bag',
  Utilities: 'zap',
};