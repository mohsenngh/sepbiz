import React, { useState, useMemo } from 'react';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import WheelPicker from '../components/WheelPicker';

const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const PlusIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);

const DatePickerModal = ({ onSave, onClose, initialDate }) => {
  const [date, setDate] = useState(initialDate || { day: 1, month: 1, year: 1403 });

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const years = useMemo(() => Array.from({ length: 5 }, (_, i) => 1403 + i), []);

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4 text-center">انتخاب تاریخ</h2>
        <div className="flex justify-around items-center px-4 mb-2 text-gray-400 text-sm">
          <span className="w-1/3 text-center">سال</span>
          <span className="w-1/3 text-center">ماه</span>
          <span className="w-1/3 text-center">روز</span>
        </div>
        <div className="flex justify-center items-center h-48 flex-row-reverse">
          <div className="flex-1">
            <WheelPicker items={days} selectedValue={date.day} onSelect={(v) => setDate(d => ({...d, day: Number(v)}))} />
          </div>
          <div className="flex-1">
            <WheelPicker items={months} selectedValue={date.month} onSelect={(v) => setDate(d => ({...d, month: Number(v)}))} />
          </div>
          <div className="flex-1">
            <WheelPicker items={years} selectedValue={date.year} onSelect={(v) => setDate(d => ({...d, year: Number(v)}))} />
          </div>
        </div>
        <div className="flex space-x-4 space-x-reverse mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600">انصراف</button>
          <button onClick={() => onSave(date)} className="flex-1 py-2.5 text-center text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">تایید</button>
        </div>
      </div>
    </div>
  );
};


const SubHeaderTabs = ({ tabs, activeTab, onTabChange }) => (
    <div className="flex justify-around bg-slate-800 p-1 rounded-lg">
        {tabs.map(tab => (
            <button key={tab.id} onClick={() => onTabChange(tab.id)}
                className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-700'}`}>
                {tab.label}
            </button>
        ))}
    </div>
);

const mockCategories = [
    { id: 1, name: 'پوشاک مردانه', parentId: null },
    { id: 2, name: 'پیراهن', parentId: 1 },
    { id: 3, name: 'کالای دیجیتال', parentId: null },
    { id: 4, name: 'هدفون و هدست', parentId: 3 },
];
const mockProducts = [
    { id: 1, name: 'پیراهن مردانه', categoryId: 2 },
    { id: 2, name: 'هدفون بی‌سیم', categoryId: 4 },
];


const CreateDiscountModal = ({ isOpen, onClose, onSave }) => {
    const [percent, setPercent] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState('00:00');
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState('23:59');
    const [type, setType] = useState('all');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');

    const [isDatePickerOpenFor, setDatePickerOpenFor] = useState(null);
    
    if(!isOpen) return null;

    const handleSaveDate = (date) => {
        if (isDatePickerOpenFor === 'start') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
        setDatePickerOpenFor(null);
    };

    const formatDate = (dateObj) => {
        if (!dateObj) return 'انتخاب تاریخ';
        return `${dateObj.year}/${dateObj.month}/${dateObj.day}`;
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                    <header className="flex items-center justify-between p-4 border-b border-slate-700">
                        <h2 className="font-bold text-white">ایجاد تخفیف جدید</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                    </header>
                    <main className="p-6 overflow-y-auto space-y-4">
                        <div>
                            <label className="text-sm font-semibold mb-1 block">درصد تخفیف</label>
                            <input type="number" value={percent} onChange={e => setPercent(e.target.value)} placeholder="مثلا 20" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-1 block">بازه زمانی</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => setDatePickerOpenFor('start')} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center">{formatDate(startDate)}</button>
                                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" />
                                <button onClick={() => setDatePickerOpenFor('end')} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center">{formatDate(endDate)}</button>
                                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold mb-1 block">اعمال روی</label>
                            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                                <option value="all">تمام محصولات</option>
                                <option value="category">دسته‌بندی خاص</option>
                                <option value="product">محصول خاص</option>
                            </select>
                        </div>
                        {type === 'category' && (
                            <div className="animate-fade-in">
                                <label className="text-sm font-semibold mb-1 block">انتخاب دسته‌بندی</label>
                                <select value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                                    <option value="">یک دسته‌بندی انتخاب کنید...</option>
                                    {mockCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                        )}
                        {type === 'product' && (
                             <div className="animate-fade-in">
                                <label className="text-sm font-semibold mb-1 block">انتخاب محصول</label>
                                <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                                    <option value="">یک محصول انتخاب کنید...</option>
                                    {mockProducts.map(prod => <option key={prod.id} value={prod.id}>{prod.name}</option>)}
                                </select>
                            </div>
                        )}
                    </main>
                    <footer className="p-4 mt-auto border-t border-slate-700">
                        <button onClick={onSave} className="w-full py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ایجاد تخفیف</button>
                    </footer>
                </div>
            </div>
            {isDatePickerOpenFor && (
                <DatePickerModal 
                    onClose={() => setDatePickerOpenFor(null)} 
                    onSave={handleSaveDate} 
                    initialDate={isDatePickerOpenFor === 'start' ? startDate : endDate}
                />
            )}
        </>
    )
}

const DiscountsScreen = ({ onBack }) => {
    const TABS = [{ id: 'active', label: 'درحال اجرا' }, { id: 'scheduled', label: 'در صف اجرا' }, { id: 'finished', label: 'خاتمه‌یافته' }];
    const [activeTab, setActiveTab] = useState('active');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [discounts, setDiscounts] = useState([
        { id: 1, percent: 20, type: 'دسته‌بندی: پوشاک مردانه', status: 'active'},
    ]);

    const statusMap = {
        active: 'درحال اجرا',
        scheduled: 'در صف اجرا',
        finished: 'خاتمه‌یافته',
    }
    const statusColorMap = {
        active: 'text-green-400',
        scheduled: 'text-yellow-400',
        finished: 'text-gray-500',
    }

    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors"><ArrowRightIcon /></button>
                <h1 className="font-bold text-lg">مدیریت تخفیف‌ها</h1>
                <div className="w-10 h-10"></div>
            </header>
            <div className="p-4">
                <SubHeaderTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <main className="flex-grow p-4 pt-0 space-y-4 overflow-y-auto">
                {discounts.filter(d => d.status === activeTab).map(d => (
                    <div key={d.id} className="bg-slate-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">{d.percent}%</span>
                            <span className={`text-sm font-semibold ${statusColorMap[d.status]}`}>{statusMap[d.status]}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">{d.type}</p>
                        <button className="text-xs text-blue-400 mt-3">مشاهده جزئیات</button>
                    </div>
                ))}
            </main>
            <button onClick={() => setCreateModalOpen(true)} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105">
                <PlusIcon className="w-5 h-5 ml-2" />
                <span>ایجاد تخفیف جدید</span>
            </button>
            <CreateDiscountModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} onSave={() => {alert("تخفیف ایجاد شد!"); setCreateModalOpen(false);}} />
        </div>
    );
};

export default DiscountsScreen;