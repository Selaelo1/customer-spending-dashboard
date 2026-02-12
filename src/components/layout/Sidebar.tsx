import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  List, 
  Target, 
  Settings,
  CreditCard,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: PieChart, label: 'Spending Analysis' },
    { icon: TrendingUp, label: 'Trends' },
    { icon: List, label: 'Transactions' },
    { icon: Target, label: 'Goals' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="h-screen w-64 bg-[#0B2A4A] text-white flex flex-col sticky top-0">
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-[#00A3AD] rounded-lg">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">Capitec</h1>
            <p className="text-[10px] sm:text-xs text-white/60">Spending Insights</p>
          </div>
        </div>
        {/* Close button - only on mobile */}
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 sm:mt-8 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-colors
              ${item.active 
                ? 'bg-white/10 border-l-4 border-[#00A3AD]' 
                : 'text-white/70 hover:bg-white/5'
              }`}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 sm:p-6 mt-auto">
        <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
          <p className="text-[10px] sm:text-xs text-white/60 mb-1">Premium Account</p>
          <p className="text-xs sm:text-sm font-medium truncate">John Doe</p>
          <p className="text-[10px] sm:text-xs text-white/40 mt-2">•••• 4582</p>
        </div>
      </div>
    </aside>
  );
};