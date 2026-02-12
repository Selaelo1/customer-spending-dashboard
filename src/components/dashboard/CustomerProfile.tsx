import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { User, Mail, Calendar, Award, CreditCard } from 'lucide-react';
import type { Customer } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface CustomerProfileProps {
  customer: Customer;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  const accountTypeColors = {
    premium: 'success',
    standard: 'info',
    basic: 'default'
  } as const;

  return (
    <Card className="bg-gradient-to-br from-[#0B2A4A] to-blue-900 text-white">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold truncate">{customer.name}</h2>
            <div className="flex items-center mt-1 text-xs sm:text-sm text-white/80">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{customer.email}</span>
            </div>
          </div>
        </div>
        <div className="self-start sm:self-center">
          <Badge variant={accountTypeColors[customer.accountType]}>
            {customer.accountType.charAt(0).toUpperCase() + customer.accountType.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-white/60 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-white/60">Member since</p>
            <p className="text-sm font-medium">{formatDate(customer.joinDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-white/60 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-white/60">Account type</p>
            <p className="text-sm font-medium capitalize truncate">{customer.accountType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:col-span-2 lg:col-span-1">
          <CreditCard className="w-4 h-4 text-white/60 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-white/60">Lifetime spending</p>
            <p className="text-base sm:text-lg font-bold truncate">
              {formatCurrency(customer.totalSpent, customer.currency)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};