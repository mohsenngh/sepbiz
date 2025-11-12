import React from 'react';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

interface WalletScreenProps {
    onBack: () => void;
    onNavigateToWithdraw: () => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ onBack, onNavigateToWithdraw }) => {
    return (
        <div className="flex flex-col h-full bg-slate-900">
            <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowRightIcon />
                </button>
                <h1 className="font-bold text-lg">کیف پول</h1>
                <div className="w-10 h-10"></div>
            </header>

            <div className="p-6 text-center border-b border-slate-700">
                <p className="text-sm text-gray-400">موجودی کل</p>
                <p className="text-3xl font-bold text-green-400 mt-1">۵,۰۰۰,۰۰۰ <span className="text-base">تومان</span></p>
            </div>

            <main className="p-4 overflow-y-auto space-y-3 flex-1">
                {/* Transaction List */}
                <h3 className="font-semibold text-gray-300 px-2 pb-2">تاریخچه تراکنش‌ها</h3>
                <div className="flex items-center justify-between text-sm p-3 bg-slate-800 rounded-lg">
                    <div>
                        <p>واریز سفارش #123</p>
                        <p className="text-xs text-gray-500 mt-1">۱۴۰۳/۰۲/۱۱</p>
                    </div>
                    <p className="text-green-400 font-semibold">+ ۲۵۰,۰۰۰</p>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-slate-800 rounded-lg">
                    <div>
                        <p>برداشت وجه</p>
                        <p className="text-xs text-gray-500 mt-1">۱۴۰۳/۰۲/۱۰</p>
                    </div>
                    <p className="text-red-400 font-semibold">- ۱,۰۰۰,۰۰۰</p>
                </div>
                 <div className="flex items-center justify-between text-sm p-3 bg-slate-800 rounded-lg">
                    <div>
                        <p>واریز سفارش #121</p>
                        <p className="text-xs text-gray-500 mt-1">۱۴۰۳/۰۲/۰۹</p>
                    </div>
                    <p className="text-green-400 font-semibold">+ ۸۵,۰۰۰</p>
                </div>
            </main>

            <footer className="p-4 mt-auto border-t border-slate-700 bg-slate-900">
                <button onClick={onNavigateToWithdraw} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">ثبت درخواست برداشت وجه</button>
            </footer>
        </div>
    );
};

export default WalletScreen;
