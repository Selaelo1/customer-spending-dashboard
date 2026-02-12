import { format } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = 'ZAR'): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string | Date, formatStr: string = 'dd MMM yyyy'): string => {
  return format(new Date(date), formatStr);
};

export const formatMonth = (monthStr: string): string => {
  return format(new Date(monthStr), 'MMM yyyy');
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatChange = (change: number): string => {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};