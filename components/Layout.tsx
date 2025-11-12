import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { QuestionMarkIcon } from './icons/QuestionMarkIcon';

interface LayoutProps {
  children: React.ReactNode;
  onBack: (() => void) | null;
  showSupport?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, showSupport = true }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-900 max-w-md mx-auto shadow-2xl">
      <header className="flex items-center justify-between p-4 border-b border-slate-700">
        {onBack ? (
          <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
            <ArrowRightIcon />
          </button>
        ) : <div className="w-10 h-10"></div>}
        
        {showSupport ? (
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <QuestionMarkIcon />
          </button>
        ) : <div className="w-10 h-10"></div> }
      </header>
      <main className="flex-grow flex flex-col p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;