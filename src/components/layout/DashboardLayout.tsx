import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, CreditCard } from 'lucide-react'; // Add CreditCard import!

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-[#0B2A4A] text-white rounded-lg shadow-lg"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="ml-4 flex items-center space-x-2">
          <div className="p-1.5 bg-[#00A3AD] rounded-lg">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0B2A4A]">Capitec</h1>
            <p className="text-xs text-gray-500">Spending Insights</p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop Layout - Flex row */}
      <div className="hidden lg:flex lg:min-h-screen">
        {/* Desktop Sidebar - Fixed width */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Desktop Main Content - Takes remaining width */}
        <main className="flex-1 bg-gray-50 min-h-screen overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Main Content - With top padding for fixed header */}
      <main className="lg:hidden pt-16 min-h-screen">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};