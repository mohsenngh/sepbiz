import React from 'react';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { DiscountIcon } from '../components/icons/DiscountIcon';
import { CouponIcon } from '../components/icons/CouponIcon';

interface CampaignsScreenProps {
    onBack: () => void;
    onNavigateToDiscounts: () => void;
    onNavigateToCoupons: () => void;
}

const CampaignsScreen: React.FC<CampaignsScreenProps> = ({ onBack, onNavigateToDiscounts, onNavigateToCoupons }) => {
    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors"><ArrowRightIcon /></button>
                <h1 className="font-bold text-lg">جشنواره</h1>
                <div className="w-10 h-10"></div>
            </header>
            <main className="p-6 space-y-6">
                <button onClick={onNavigateToDiscounts} className="w-full text-right bg-slate-800 p-6 rounded-2xl flex items-center space-x-6 space-x-reverse hover:bg-slate-700 transition-colors">
                    <div className="bg-red-500/20 text-red-400 p-4 rounded-full">
                        <DiscountIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">تخفیف</h2>
                        <p className="text-gray-400 mt-1">ایجاد تخفیف برای محصولات یا دسته‌بندی‌ها</p>
                    </div>
                </button>
                 <button onClick={onNavigateToCoupons} className="w-full text-right bg-slate-800 p-6 rounded-2xl flex items-center space-x-6 space-x-reverse hover:bg-slate-700 transition-colors">
                    <div className="bg-green-500/20 text-green-400 p-4 rounded-full">
                        <CouponIcon />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">کوپن</h2>
                        <p className="text-gray-400 mt-1">ایجاد کوپن‌های تخفیf شرطی برای مشتریان</p>
                    </div>
                </button>
            </main>
        </div>
    );
};

export default CampaignsScreen;