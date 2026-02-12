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
    <Card className="bg-gradient-to-br from-capitec-navy to-blue-900 text-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{customer.name}</h2>
            <div className="flex items-center mt-1 text-sm text-white/80">
              <Mail className="w-4 h-4 mr-1" />
              <span>{customer.email}</span>
            </div>
          </div>
        </div>
        <Badge variant={accountTypeColors[customer.accountType]}>
          {customer.accountType.charAt(0).toUpperCase() + customer.accountType.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Member since</p>
            <p className="text-sm font-medium">{formatDate(customer.joinDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Account type</p>
            <p className="text-sm font-medium capitalize">{customer.accountType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-white/60" />
          <div>
            <p className="text-xs text-white/60">Lifetime spending</p>
            <p className="text-lg font-bold">{formatCurrency(customer.totalSpent, customer.currency)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};