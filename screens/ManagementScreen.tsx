import React, { useState } from 'react';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import SearchableSelect from '../components/SearchableSelect';
import { BUSINESS_CATEGORIES } from '../constants';

const WalletIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const InvoiceIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const ShippingIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7.5a2.5 2.5 0 015 0V16a1 1 0 01-1 1h-2m-6 0h6" />
    </svg>
);


const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const AddShippingMethodModal = ({ onAdd, onClose }) => {
    const [type, setType] = useState('پست');
    const [cost, setCost] = useState('');
    const [cities, setCities] = useState('');

    const handleAdd = () => {
        if (cost && cities) {
            onAdd({ type, cost: `${Number(cost).toLocaleString('fa-IR')} تومان`, cities });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl w-full max-w-sm p-6 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-6 text-center">افزودن روش ارسال</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold mb-1 block">نوع ارسال</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
                            <option value="پست">پست</option>
                            <option value="درون شهری">درون شهری</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-semibold mb-1 block">هزینه ارسال (تومان)</label>
                        <input type="number" value={cost} onChange={e => setCost(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
                    </div>
                     <div>
                        <label className="text-sm font-semibold mb-1 block">شهرهای تحت پوشش</label>
                        <input type="text" value={cities} onChange={e => setCities(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
                    </div>
                </div>
                <div className="flex space-x-4 space-x-reverse mt-6">
                    <button onClick={onClose} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600">انصراف</button>
                    <button onClick={handleAdd} className="flex-1 py-2.5 text-center text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">افزودن</button>
                </div>
            </div>
        </div>
    )
}

const ShippingMethodsModal = ({ isOpen, onClose }) => {
    const [methods, setMethods] = useState([
        { id: 1, type: 'پست', cost: '45,000 تومان', cities: 'سراسر کشور'},
        { id: 2, type: 'درون شهری', cost: '25,000 تومان', cities: 'تهران'},
    ]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleAddMethod = (newMethod) => {
        setMethods(prev => [...prev, { ...newMethod, id: Date.now() }]);
        setAddModalOpen(false);
    }
    
    if (!isOpen) return null;
    return (
         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">نحوه ارسال</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                 <main className="p-4 overflow-y-auto space-y-3 flex-1">
                    {methods.map(method => (
                        <div key={method.id} className="bg-slate-900 p-3 rounded-lg">
                             <div className="flex justify-between items-center font-bold">
                                <span>{method.type}</span>
                                <span>{method.cost}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">پوشش: {method.cities}</p>
                        </div>
                    ))}
                 </main>
                  <footer className="p-4 mt-auto border-t border-slate-700">
                    <button onClick={() => setAddModalOpen(true)} className="w-full py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center space-x-2 space-x-reverse">
                        <span>افزودن روش جدید</span>
                         <span className="font-bold text-xl">+</span>
                    </button>
                </footer>
            </div>
            {isAddModalOpen && <AddShippingMethodModal onAdd={handleAddMethod} onClose={() => setAddModalOpen(false)} />}
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm py-3 border-b border-slate-700/50 last:border-b-0">
        <span className="text-gray-400">{label}:</span>
        <span className="font-semibold text-gray-100">{value}</span>
    </div>
);

const UserInfoModal = ({ isOpen, onClose, data, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);

    React.useEffect(() => {
        setFormData(data); // Reset form when data prop changes
        setIsEditing(false); // Reset editing mode when modal reopens
    }, [isOpen, data]);

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">اطلاعات کاربری</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-3">
                    <InfoRow label="نام و نام خانوادگی" value={data.name} />
                    <InfoRow label="کد ملی" value={data.nationalId} />
                    <InfoRow label="تاریخ تولد" value={data.dob} />
                    {isEditing ? (
                        <div className="py-2">
                             <label className="text-sm text-gray-400">شماره موبایل:</label>
                             <input 
                                type="tel" 
                                dir="ltr"
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full text-left bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 mt-1"
                            />
                        </div>
                    ) : (
                        <InfoRow label="شماره موبایل" value={data.phone} />
                    )}
                </main>
                <footer className="p-4 border-t border-slate-700 flex space-x-4 space-x-reverse">
                    {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600">انصراف</button>
                            <button onClick={handleSave} className="flex-1 py-2.5 text-center text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ذخیره</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">ویرایش اطلاعات</button>
                    )}
                </footer>
            </div>
        </div>
    );
};

const StoreInfoModal = ({ isOpen, onClose, data, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);

     React.useEffect(() => {
        setFormData(data);
        setIsEditing(false);
    }, [isOpen, data]);

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };
    
    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">اطلاعات فروشگاه</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-3">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">نام فروشگاه:</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">صنف:</label>
                                <SearchableSelect options={BUSINESS_CATEGORIES} value={formData.category} onChange={(val) => setFormData({...formData, category: val})} placeholder="جستجو در اصناف..." />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">آدرس وب‌سایت:</label>
                                <input type="text" dir="ltr" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">اینستاگرام:</label>
                                <input type="text" dir="ltr" value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 mt-1" />
                            </div>
                        </div>
                    ) : (
                        <>
                            <InfoRow label="نام فروشگاه" value={data.name} />
                            <InfoRow label="صنف" value={data.category} />
                            <InfoRow label="آدرس وب‌سایت" value={data.website} />
                            <InfoRow label="اینستاگرام" value={data.instagram} />
                        </>
                    )}
                </main>
                <footer className="p-4 border-t border-slate-700 flex space-x-4 space-x-reverse">
                     {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600">انصراف</button>
                            <button onClick={handleSave} className="flex-1 py-2.5 text-center text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ذخیره</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">ویرایش اطلاعات</button>
                    )}
                </footer>
            </div>
        </div>
    );
}

const AccountInfoModal = ({ isOpen, onClose, data, onSaveRequest }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [newShaba, setNewShaba] = useState('');
    const [inquiryResult, setInquiryResult] = useState(null);
    const [history] = useState([
        { id: 1, date: '۱۴۰۲/۱۱/۰۵', status: 'تایید شده' },
        { id: 2, date: '۱۴۰۲/۰۹/۲۰', status: 'رد شده' },
    ]);

    React.useEffect(() => {
        if (isOpen) {
            setActiveTab('info');
            setNewShaba('');
            setInquiryResult(null);
        }
    }, [isOpen]);

    const handleInquiry = () => {
        // Mock inquiry result
        if (newShaba.length > 20) {
            setInquiryResult({ name: 'سارا رضایی', bank: 'پاسارگاد' });
        } else {
            alert('شماره شبا نامعتبر است.');
        }
    };
    
    const handleSubmitRequest = () => {
        onSaveRequest({ shaba: newShaba, ...inquiryResult });
        alert('درخواست شما برای تغییر حساب ثبت شد.');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">اطلاعات حساب</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <div className="flex justify-around bg-slate-900 p-1">
                    {[{id: 'info', label: 'اطلاعات فعلی'}, {id: 'change', label: 'درخواست تغییر'}, {id: 'history', label: 'سوابق'}].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-400'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                 <main className="p-6 overflow-y-auto flex-1">
                    {activeTab === 'info' && (
                        <div className="space-y-2">
                            <InfoRow label="نام بانک" value={data.bank} />
                            <InfoRow label="نام دارنده حساب" value={data.name} />
                            <InfoRow label="شماره شبا" value={data.shaba} />
                        </div>
                    )}
                    {activeTab === 'change' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold mb-1 block">شماره شبا جدید</label>
                                <input type="text" dir="ltr" value={newShaba} onChange={e => setNewShaba(e.target.value)} placeholder="IR..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                            </div>
                            <button onClick={handleInquiry} className="w-full py-2 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">استعلام</button>
                            {inquiryResult && (
                                <div className="p-4 bg-slate-900 rounded-lg space-y-3 animate-fade-in">
                                    <InfoRow label="نام دارنده" value={inquiryResult.name} />
                                    <InfoRow label="نام بانک" value={inquiryResult.bank} />
                                    <button onClick={handleSubmitRequest} className="w-full mt-4 py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ثبت درخواست تغییر</button>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'history' && (
                        <div className="space-y-2">
                             {history.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                                    <span className="text-sm text-gray-300">{item.date}</span>
                                    <span className={`text-sm font-bold ${item.status === 'تایید شده' ? 'text-green-400' : 'text-red-400'}`}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                 </main>
            </div>
        </div>
    )
}


const ManagementScreen: React.FC<{ onLogoutRequest: () => void; onNavigateToInvoices: () => void; onNavigateToCampaigns: () => void; onNavigateToWallet: () => void; }> = ({ onLogoutRequest, onNavigateToInvoices, onNavigateToCampaigns, onNavigateToWallet }) => {
    const [isShippingModalOpen, setShippingModalOpen] = useState(false);
    
    // State for modals
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isAccountModalOpen, setAccountModalOpen] = useState(false);
    const [isStoreModalOpen, setStoreModalOpen] = useState(false);

    // Data states
    const [userData, setUserData] = useState({ name: "علی علوی", nationalId: "1234567890", dob: "1370/01/01", phone: "09123456789" });
    const [accountData, setAccountData] = useState({ bank: "سامان", name: "علی علوی", shaba: "IR123456789012345678901234" });
    const [storeData, setStoreData] = useState({ name: "فروشگاه سپ", category: "کالای دیجیتال", website: "sep-business.com", instagram: "@sep-business" });
    
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={onNavigateToWallet} className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg space-y-2 hover:bg-slate-700">
                        <WalletIcon />
                        <span className="font-semibold">کیف پول</span>
                        <span className="text-sm text-green-400">۵,۰۰۰,۰۰۰ ت</span>
                    </button>
                    <button onClick={onNavigateToInvoices} className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg space-y-2 hover:bg-slate-700">
                        <InvoiceIcon />
                        <span className="font-semibold">ایجاد فاکتور</span>
                    </button>
                    <button onClick={() => setShippingModalOpen(true)} className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg space-y-2 hover:bg-slate-700">
                        <ShippingIcon />
                        <span className="font-semibold">نحوه ارسال</span>
                    </button>
                </div>

                <div className="space-y-3 pt-4">
                     <div className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700/50" onClick={onNavigateToCampaigns}>
                        <h3 className="font-bold">جشنواره</h3>
                        <p className="text-sm text-blue-400 mt-2">مدیریت تخفیف‌ها و کوپن‌ها</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700/50" onClick={() => setUserModalOpen(true)}>
                        <h3 className="font-bold">اطلاعات کاربری</h3>
                        <p className="text-sm text-blue-400 mt-2">مشاهده/اصلاح اطلاعات هویتی</p>
                    </div>
                     <div className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700/50" onClick={() => setAccountModalOpen(true)}>
                        <h3 className="font-bold">اطلاعات حساب</h3>
                        <p className="text-sm text-blue-400 mt-2">مشاهده/اصلاح اطلاعات حساب بانکی</p>
                    </div>
                     <div className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700/50" onClick={() => setStoreModalOpen(true)}>
                        <h3 className="font-bold">اطلاعات فروشگاه</h3>
                        <p className="text-sm text-blue-400 mt-2">مشاهده/اصلاح اطلاعات فروشگاه</p>
                    </div>
                </div>
            </div>
             <div className="mt-auto p-4 text-center">
                 <button onClick={onLogoutRequest} className="text-red-400 font-semibold mb-2">خروج از حساب کاربری</button>
                 <p className="text-xs text-gray-600">ورژن 1.0.0</p>
            </div>
            
            <ShippingMethodsModal isOpen={isShippingModalOpen} onClose={() => setShippingModalOpen(false)} />

            <UserInfoModal 
                isOpen={isUserModalOpen} 
                onClose={() => setUserModalOpen(false)} 
                data={userData}
                onSave={(newData) => setUserData(newData)}
            />
            <AccountInfoModal 
                isOpen={isAccountModalOpen}
                onClose={() => setAccountModalOpen(false)}
                data={accountData}
                onSaveRequest={(newRequest) => console.log("New account request:", newRequest)}
            />
            <StoreInfoModal
                isOpen={isStoreModalOpen}
                onClose={() => setStoreModalOpen(false)}
                data={storeData}
                onSave={(newData) => setStoreData(newData)}
            />
        </div>
    );
};

export default ManagementScreen;