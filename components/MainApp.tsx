import React, { useState } from 'react';
import OrdersScreen from '../screens/OrdersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ManagementScreen from '../screens/ManagementScreen';
import AppLayout from './AppLayout';
import InvoicesScreen from '../screens/InvoicesScreen';
import CampaignsScreen from '../screens/CampaignsScreen';
import DiscountsScreen from '../screens/DiscountsScreen';
import CouponsScreen from '../screens/CouponsScreen';
import WalletScreen from '../screens/WalletScreen';
import WithdrawRequestScreen from '../screens/WithdrawRequestScreen';


// --- Icon Components ---
const OrdersIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const ReportsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ProductsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ManagementIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

type Tab = 'orders' | 'reports' | 'products' | 'management';
type Screen = 'main' | 'invoices' | 'campaigns' | 'discounts' | 'coupons' | 'wallet' | 'withdraw';

const TABS = [
  { id: 'management', label: 'مدیریت', icon: <ManagementIcon /> },
  { id: 'products', label: 'محصولات', icon: <ProductsIcon /> },
  { id: 'reports', label: 'گزارشات', icon: <ReportsIcon /> },
  { id: 'orders', label: 'سفارشات', icon: <OrdersIcon /> },
];


const BottomNav: React.FC<{ activeTab: Tab; onTabChange: (tab: Tab) => void; }> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 max-w-md mx-auto z-50">
      <div className="flex justify-around flex-row-reverse">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as Tab)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs transition-colors ${
              activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {React.cloneElement(tab.icon, { className: 'w-6 h-6 mb-1' })}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const LogoutConfirmationModal: React.FC<{
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm p-6 text-center shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4">خروج از حساب</h2>
                <p className="text-gray-300 mb-6">آیا برای خروج از حساب کاربری خود اطمینان دارید؟</p>
                <div className="flex space-x-4 space-x-reverse">
                    <button onClick={onCancel} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
                        انصراف
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 text-center text-white bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        خروج
                    </button>
                </div>
            </div>
        </div>
    );
};


const MainApp: React.FC<{ onLogout: () => void; }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [activeScreen, setActiveScreen] = useState<Screen>('main');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutRequest = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };
  
  const renderMainContent = () => {
    if (activeScreen === 'invoices') {
      return <InvoicesScreen onBack={() => setActiveScreen('main')} />;
    }
    if (activeScreen === 'campaigns') {
        return <CampaignsScreen onBack={() => setActiveScreen('main')} onNavigateToDiscounts={() => setActiveScreen('discounts')} onNavigateToCoupons={() => setActiveScreen('coupons')} />;
    }
     if (activeScreen === 'discounts') {
        return <DiscountsScreen onBack={() => setActiveScreen('campaigns')} />;
    }
     if (activeScreen === 'coupons') {
        return <CouponsScreen onBack={() => setActiveScreen('campaigns')} />;
    }
    if (activeScreen === 'wallet') {
        return <WalletScreen onBack={() => setActiveScreen('main')} onNavigateToWithdraw={() => setActiveScreen('withdraw')} />;
    }
    if (activeScreen === 'withdraw') {
        return <WithdrawRequestScreen onBack={() => setActiveScreen('wallet')} />;
    }


    let content;
    let isLogout = false;
    switch (activeTab) {
      case 'orders':
        content = <OrdersScreen />;
        break;
      case 'reports':
        content = <ReportsScreen />;
        break;
      case 'products':
        content = <ProductsScreen />;
        break;
      case 'management':
        content = <ManagementScreen onNavigateToInvoices={() => setActiveScreen('invoices')} onNavigateToCampaigns={() => setActiveScreen('campaigns')} onLogoutRequest={handleLogoutRequest} onNavigateToWallet={() => setActiveScreen('wallet')} />;
        isLogout = true;
        break;
      default:
        content = null;
    }
    return <AppLayout onBack={isLogout ? handleLogoutRequest : undefined} isLogout={isLogout}>{content}</AppLayout>;
  }


  return (
    <div className="flex flex-col h-screen bg-slate-900 max-w-md mx-auto shadow-2xl relative">
      <main className="flex-grow overflow-y-auto pb-20">
        {renderMainContent()}
      </main>
      {activeScreen === 'main' && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
      <LogoutConfirmationModal 
        isOpen={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default MainApp;