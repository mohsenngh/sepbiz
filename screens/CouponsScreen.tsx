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

const CreateCouponWizard = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [condition, setCondition] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState(null);
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);

    const formatDate = (dateObj) => {
        if (!dateObj) return 'انتخاب تاریخ';
        return `${dateObj.year}/${dateObj.month}/${dateObj.day}`;
    };

    const handleSaveDate = (newDate) => {
        setDate(newDate);
        setDatePickerOpen(false);
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Select Condition
                return (
                    <>
                        <h3 className="font-bold text-lg text-center mb-4">شرط کوپن را انتخاب کنید</h3>
                        <div className="space-y-3">
                           <button onClick={() => {setCondition('first_order'); setStep(2);}} className="w-full text-right p-4 bg-slate-900 hover:bg-slate-700 rounded-lg">
                                <p className="font-semibold">مخصوص سفارش اول/دوم و...</p>
                                <p className="text-xs text-gray-400 mt-1">مخصوص مشتری هایی با دفعات سفارش خاص</p>
                           </button>
                           <button onClick={() => {setCondition('min_cart'); setStep(2);}} className="w-full text-right p-4 bg-slate-900 hover:bg-slate-700 rounded-lg">
                                <p className="font-semibold">حداقل مبلغ سبد خرید</p>
                                <p className="text-xs text-gray-400 mt-1">مبلغ سبد خرید مشتری به میزان مشخص برسد</p>
                           </button>
                           <button onClick={() => {setCondition('specific_product'); setStep(2);}} className="w-full text-right p-4 bg-slate-900 hover:bg-slate-700 rounded-lg">
                                <p className="font-semibold">سفارش یک محصول/دسته خاص</p>
                                <p className="text-xs text-gray-400 mt-1">درصورت خرید یک محصول و یا یک دسته خاص</p>
                           </button>
                        </div>
                    </>
                );
            case 2: // Select Type
                return (
                     <>
                        <h3 className="font-bold text-lg text-center mb-4">نوع کوپن را انتخاب کنید</h3>
                        <div className="space-y-3">
                           <button onClick={() => {setType('free_shipping'); setStep(3);}} className="w-full text-center p-4 bg-slate-900 hover:bg-slate-700 rounded-lg font-semibold">ارسال رایگان</button>
                           <button onClick={() => {setType('discount'); setStep(3);}} className="w-full text-center p-4 bg-slate-900 hover:bg-slate-700 rounded-lg font-semibold">تخفیف</button>
                           <button onClick={() => {setType('gift'); setStep(3);}} className="w-full text-center p-4 bg-slate-900 hover:bg-slate-700 rounded-lg font-semibold">دریافت هدیه</button>
                        </div>
                         <button onClick={() => setStep(1)} className="text-center text-sm text-blue-400 mt-4">بازگشت</button>
                    </>
                );
            case 3: // Configure Details
                return (
                     <>
                        <h3 className="font-bold text-lg text-center mb-4">جزئیات کوپن تخفیف</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold mb-1 block">درصد و سقف تخفیف (تومان)</label>
                                <div className="flex space-x-2 space-x-reverse">
                                    <input type="number" placeholder="درصد" className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"/>
                                    <input type="number" placeholder="سقف" className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"/>
                                </div>
                            </div>
                             <div>
                                <label className="text-xs font-semibold mb-1 block">بازه زمانی</label>
                                <button onClick={() => setDatePickerOpen(true)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center">{formatDate(date)}</button>
                            </div>
                        </div>
                         <button onClick={() => alert("کوپن ایجاد شد!")} className="w-full mt-6 py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ایجاد کوپن</button>
                         <button onClick={() => setStep(2)} className="text-center text-sm text-blue-400 mt-4">بازگشت</button>
                    </>
                );
        }
    }
    
    if(!isOpen) return null;
    return (
        <>
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">ایجاد کوپن جدید</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                 <main className="p-6 overflow-y-auto">
                    {renderStep()}
                 </main>
            </div>
        </div>
        {isDatePickerOpen && (
            <DatePickerModal 
                onClose={() => setDatePickerOpen(false)}
                onSave={handleSaveDate}
                initialDate={date}
            />
        )}
        </>
    )
}

const CouponsScreen = ({ onBack }) => {
    const TABS = [{ id: 'active', label: 'درحال اجرا' }, { id: 'scheduled', label: 'در صف اجرا' }, { id: 'finished', label: 'خاتمه‌یافته' }];
    const [activeTab, setActiveTab] = useState('active');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    
    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors"><ArrowRightIcon /></button>
                <h1 className="font-bold text-lg">مدیریت کوپن‌ها</h1>
                <div className="w-10 h-10"></div>
            </header>
            <div className="p-4">
                <SubHeaderTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <main className="flex-grow p-4 pt-0 space-y-4 overflow-y-auto">
                <p className="text-center text-gray-500 mt-10">کوپنی در این بخش وجود ندارد.</p>
            </main>
            <button onClick={() => setCreateModalOpen(true)} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105">
                <PlusIcon className="w-5 h-5 ml-2" />
                <span>ایجاد کوپن جدید</span>
            </button>
            <CreateCouponWizard isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
        </div>
    );
};

export default CouponsScreen;