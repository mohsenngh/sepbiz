import React, { useState } from 'react';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

const SubHeaderTabs: React.FC<{
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex justify-around bg-slate-800 p-1 rounded-lg">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};


interface WithdrawRequestScreenProps {
    onBack: () => void;
}

const WithdrawRequestScreen: React.FC<WithdrawRequestScreenProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('new');
    const [amount, setAmount] = useState('');
    const [requests, setRequests] = useState({
        pending: [
             { id: 1, amount: '۵۰۰,۰۰۰ تومان', date: '۱۴۰۳/۰۲/۱۰' }
        ],
        settled: [
             { id: 2, amount: '۱,۰۰۰,۰۰۰ تومان', date: '۱۴۰۳/۰۲/۰۸' }
        ]
    });

    const tabs = [{ id: 'new', label: 'درخواست جدید' }, { id: 'pending', label: 'در انتظار' }, { id: 'settled', label: 'تسویه شده' }];

    const handleRequest = () => {
        if (!amount || Number(amount) <= 0) return;
        const newRequest = {
            id: Date.now(),
            amount: `${Number(amount).toLocaleString('fa-IR')} تومان`,
            date: new Date().toLocaleDateString('fa-IR')
        };
        setRequests(prev => ({ ...prev, pending: [newRequest, ...prev.pending] }));
        setAmount('');
        setActiveTab('pending');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'new':
                return (
                    <div className="p-6 space-y-4 flex-grow flex flex-col">
                        <div className="flex-grow">
                            <label className="text-sm">مبلغ برداشت (تومان)</label>
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="2,500,000" className="w-full text-center text-lg bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 mt-2" />
                            <p className="text-xs text-center text-gray-400 mt-2">موجودی قابل برداشت: ۵,۰۰۰,۰۰۰ تومان</p>
                        </div>
                        <button onClick={handleRequest} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover disabled:bg-slate-600" disabled={!amount}>ثبت درخواست</button>
                    </div>
                );
            case 'pending':
            case 'settled':
                const list = requests[activeTab];
                const statusText = activeTab === 'pending' ? 'در حال بررسی' : 'تسویه شده';
                const statusColor = activeTab === 'pending' ? 'text-yellow-400' : 'text-green-400';
                
                return list.length > 0 ? (
                    <div className="p-4 space-y-3">
                        {list.map(req => (
                            <div key={req.id} className="bg-slate-900 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{req.amount}</p>
                                    <p className="text-xs text-gray-400">{req.date}</p>
                                </div>
                                <span className={`text-sm font-semibold ${statusColor}`}>{statusText}</span>
                            </div>
                        ))}
                    </div>
                ) : <p className="p-6 text-center text-gray-500">تاریخچه‌ای برای نمایش وجود ندارد.</p>
        }
    }

    return (
        <div className="flex flex-col h-full bg-slate-900">
            <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                 <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowRightIcon />
                </button>
                <h1 className="font-bold text-lg">درخواست برداشت</h1>
                <div className="w-10 h-10"></div>
            </header>
            <div className="p-4">
                <SubHeaderTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="flex-grow overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    )
}

export default WithdrawRequestScreen;
