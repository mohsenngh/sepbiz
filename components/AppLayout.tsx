import React from 'react';
import { QuestionMarkIcon } from './icons/QuestionMarkIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const ChevronDownIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const LogoutIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


const AppLayout: React.FC<{ children: React.ReactNode; onBack?: () => void; isLogout?: boolean; }> = ({ children, onBack, isLogout }) => {
  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <QuestionMarkIcon />
        </button>
        
        <div className="flex-1 flex justify-center">
            <button className="flex items-center space-x-2 space-x-reverse text-white font-semibold">
                <span>شعبه اصلی</span>
                <ChevronDownIcon />
            </button>
        </div>

        {onBack ? (
            <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
                {isLogout ? <LogoutIcon /> : <ArrowRightIcon />}
            </button>
        ) : (
            <div className="w-10 h-10"></div>
        )}
      </header>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;