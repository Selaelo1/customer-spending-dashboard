import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  List, 
  Target, 
  Settings,
  CreditCard
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: PieChart, label: 'Spending Analysis' },
    { icon: TrendingUp, label: 'Trends' },
    { icon: List, label: 'Transactions' },
    { icon: Target, label: 'Goals' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-capitec-navy text-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-capitec-teal rounded-lg">
            <CreditCard className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">Capitec</h1>
        </div>
        <p className="text-xs text-white/60 mt-1">Spending Insights</p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 px-6 py-3 text-sm transition-colors
              ${item.active 
                ? 'bg-white/10 border-l-4 border-capitec-teal' 
                : 'text-white/70 hover:bg-white/5'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-xs text-white/60 mb-1">Premium Account</p>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-white/40 mt-2">•••• 4582</p>
        </div>
      </div>
    </aside>
  );
};