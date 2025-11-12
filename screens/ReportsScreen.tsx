import React, { useState } from 'react';

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

const DateFilter = ({ onCreateReport }) => {
    const [filterType, setFilterType] = useState('daily');
    const [selectedDate, setSelectedDate] = useState('11 اردیبهشت');

    const dateOptions = {
        daily: ['11 اردیبهشت', '10 اردیبهشت', '9 اردیبهشت', '8 اردیبهشت', '7 اردیبهشت'],
        weekly: ['هفته دوم اردیبهشت (8-14)', 'هفته اول اردیبهشت (1-7)', 'هفته آخر فروردین'],
        monthly: ['اردیبهشت 1403', 'فروردین 1403', 'اسفند 1402'],
        custom: []
    };

    return (
        <div className="space-y-4">
            <SubHeaderTabs 
                tabs={[{id: 'daily', label: 'روزانه'}, {id: 'weekly', label: 'هفتگی'}, {id: 'monthly', label: 'ماهانه'}, {id: 'custom', label: 'دلخواه'}]}
                activeTab={filterType}
                onTabChange={setFilterType}
            />
            {filterType !== 'custom' && (
                <div className="relative">
                    <div className="flex space-x-3 space-x-reverse overflow-x-auto p-2 no-scrollbar">
                        {dateOptions[filterType].map(date => (
                             <button 
                                key={date} 
                                onClick={() => setSelectedDate(date)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-300'}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </div>
            )}
             <button onClick={onCreateReport} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">ایجاد گزارش</button>
        </div>
    )
}

const BarChart: React.FC<{ data: { label: string; value: number }[]; title: string; }> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="p-4 bg-slate-800 rounded-lg animate-fade-in">
            <h3 className="font-bold mb-4 text-white">{title}</h3>
            <div className="flex justify-around items-end h-48 space-x-2 space-x-reverse">
                {data.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                            className="w-full bg-primary rounded-t-md hover:bg-blue-400 transition-all duration-300"
                            style={{ height: `${(item.value / maxValue) * 100}%` }}
                            title={`${item.value.toLocaleString('fa-IR')} تومان`}
                        ></div>
                        <span className="text-xs text-gray-400 mt-2">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mockProductsReport = [
    { id: 1, name: 'پیراهن مردانه', sales: 120, imageUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF/png?text=P' },
    { id: 2, name: 'هدفون بی‌سیم', sales: 95, imageUrl: 'https://placehold.co/100x100/10B981/FFFFFF/png?text=H' },
    { id: 3, name: 'کفش ورزشی', sales: 80, imageUrl: 'https://placehold.co/100x100/F59E0B/FFFFFF/png?text=K' },
    { id: 4, name: 'ساعت هوشمند', sales: 45, imageUrl: 'https://placehold.co/100x100/EF4444/FFFFFF/png?text=S' },
    { id: 5, name: 'محصول کم‌فروش', sales: 5, imageUrl: 'https://placehold.co/100x100/6B7280/FFFFFF/png?text=L' },
];

const ProductReportView = () => {
    const topProducts = mockProductsReport.sort((a, b) => b.sales - a.sales).slice(0, 5);
    const maxSales = Math.max(...topProducts.map(p => p.sales));

    return (
        <div className="space-y-6 mt-6 animate-fade-in">
            <div className="p-4 bg-slate-800 rounded-lg">
                <h3 className="font-bold mb-4 text-white">محصولات پرفروش</h3>
                <div className="space-y-4">
                    {topProducts.map(product => (
                        <div key={product.id} className="flex items-center space-x-4 space-x-reverse">
                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                            <div className="flex-grow">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-semibold text-gray-200">{product.name}</span>
                                    <span className="text-xs font-bold text-gray-400">{product.sales} فروش</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-primary h-2.5 rounded-full" 
                                        style={{ width: `${(product.sales / maxSales) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SalesReportView = () => {
    const salesData = [
        { label: 'شنبه', value: 3500000 },
        { label: '۱شنبه', value: 4200000 },
        { label: '۲شنبه', value: 2800000 },
        { label: '۳شنبه', value: 5500000 },
        { label: '۴شنبه', value: 4800000 },
        { label: '۵شنبه', value: 7100000 },
        { label: 'جمعه', value: 6200000 },
    ];

    return (
         <div className="space-y-6 mt-6">
            <BarChart data={salesData} title="فروش هفتگی" />
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">تعداد سفارشات</p>
                    <p className="text-2xl font-bold text-white mt-1">۱۲۵</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">مجموع فروش</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">۳۴,۱۰۰,۰۰۰</p>
                </div>
            </div>
        </div>
    )
}


const ReportsScreen = () => {
    const TABS = [{ id: 'sales', label: 'گزارش فروش' }, { id: 'products', label: 'گزارش محصولات' }];
    const [activeTab, setActiveTab] = useState('sales');
    const [showReport, setShowReport] = useState(false);

    return (
        <div className="p-4 space-y-6">
            <SubHeaderTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            <DateFilter onCreateReport={() => setShowReport(true)} />
            
            {showReport && (
                <>
                    {activeTab === 'sales' && <SalesReportView />}
                    {activeTab === 'products' && <ProductReportView />}
                </>
            )}
        </div>
    );
};

export default ReportsScreen;