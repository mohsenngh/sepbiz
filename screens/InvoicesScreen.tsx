import React, { useState } from 'react';

const ArrowRightIcon = ({ className = 'w-6 h-6' }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-7-7l7 7-7 7" />
  </svg>
);

const CloseIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const PlusIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);

const TrashIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


const SubHeaderTabs = ({ tabs, activeTab, onTabChange }) => (
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

const mockProducts = [
    { id: 1, name: 'پیراهن مردانه', price: 450000 },
    { id: 2, name: 'هدفون بی‌سیم', price: 2100000 },
    { id: 3, name: 'کفش ورزشی', price: 1200000 },
    { id: 4, name: 'ساعت هوشمند', price: 3500000 },
];

const CreateInvoiceModal = ({ isOpen, onClose }) => {
    const [items, setItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(mockProducts[0].id);
    const [quantity, setQuantity] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');

    const handleAddItem = () => {
        const product = mockProducts.find(p => p.id === selectedProduct);
        if(product && quantity > 0) {
            const existingItemIndex = items.findIndex(item => item.id === product.id);
            if(existingItemIndex > -1) {
                const newItems = [...items];
                newItems[existingItemIndex].quantity += quantity;
                setItems(newItems);
            } else {
                setItems([...items, { ...product, quantity }]);
            }
        }
    };
    
    const handleRemoveItem = (productId) => {
        setItems(items.filter(item => item.id !== productId));
    };

    const handleCreateAndShare = () => {
        if(items.length > 0 && phoneNumber && shippingMethod) {
            console.log("Creating link for:", { items, phoneNumber, shippingMethod });
            alert("لینک با موفقیت ایجاد و کپی شد!");
            onClose();
        } else {
            alert("لطفا تمام فیلدها را تکمیل کنید.");
        }
    }
    
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">ایجاد فاکتور جدید</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-4 flex-1">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">لیست سفارش</label>
                        <div className="space-y-2">
                           {items.map(item => (
                               <div key={item.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg">
                                   <div>
                                       <p className="font-semibold">{item.name}</p>
                                       <p className="text-xs text-gray-400">تعداد: {item.quantity}</p>
                                   </div>
                                   <div className="flex items-center space-x-4 space-x-reverse">
                                      <p className="text-sm text-green-400">{(item.price * item.quantity).toLocaleString('fa-IR')} ت</p>
                                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-400"><TrashIcon /></button>
                                   </div>
                               </div>
                           ))}
                        </div>
                        <div className="flex items-end space-x-2 space-x-reverse mt-3 border-t border-slate-700 pt-3">
                           <div className="flex-grow">
                               <label className="text-xs font-semibold mb-1 block">محصول</label>
                               <select value={selectedProduct} onChange={(e) => setSelectedProduct(Number(e.target.value))} className="w-full text-sm bg-slate-900 border border-slate-700 rounded-lg px-2 py-2">
                                   {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                               </select>
                           </div>
                           <div className="w-16">
                               <label className="text-xs font-semibold mb-1 block">تعداد</label>
                               <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" className="w-full text-sm bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-center" />
                           </div>
                           <button onClick={handleAddItem} className="px-4 py-2 bg-primary rounded-lg text-white font-bold">+</button>
                        </div>
                         {subtotal > 0 && <p className="text-left text-sm mt-2">جمع کل: <span className="font-bold">{subtotal.toLocaleString('fa-IR')} تومان</span></p>}
                    </div>
                     <div>
                        <label className="text-sm font-semibold mb-1 block">نحوه ارسال</label>
                        <select value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                            <option value="">انتخاب کنید</option>
                            <option value="post">پست</option>
                            <option value="peyk">درون شهری</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-semibold mb-1 block">شماره تماس مشتری</label>
                        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} dir="ltr" className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                    </div>
                </main>
                <footer className="p-4 mt-auto border-t border-slate-700">
                    <button onClick={handleCreateAndShare} className="w-full py-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">ایجاد و اشتراک گذاری لینک</button>
                </footer>
            </div>
        </div>
    )
}

const mockInvoices = {
    awaiting: [{ id: 101, phone: '09123456789', total: '2,550,000 تومان', items: 2 }],
    paid: [{ id: 102, phone: '09351112233', total: '450,000 تومان', items: 1 }],
    cancelled: []
};

const InvoicesScreen = ({ onBack }) => {
    const TABS = [{ id: 'awaiting', label: 'در انتظار پرداخت' }, { id: 'paid', label: 'پرداخت شد' }, { id: 'cancelled', label: 'لغو شده' }];
    const [activeTab, setActiveTab] = useState('awaiting');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const invoicesToShow = mockInvoices[activeTab] || [];

    return (
        <div className="flex flex-col h-full">
             <header className="sticky top-0 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-40">
                <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowRightIcon />
                </button>
                <h1 className="font-bold text-lg">مدیریت فاکتورها</h1>
                <div className="w-10 h-10"></div>
            </header>
            <div className="p-4">
                <SubHeaderTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="flex-grow p-4 pt-0 space-y-4 overflow-y-auto">
                 {invoicesToShow.length > 0 ? invoicesToShow.map(invoice => (
                    <div key={invoice.id} className="bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-bold ltr text-right">{invoice.phone}</span>
                            <span className="text-sm text-green-400">{invoice.total}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{invoice.items} مورد</p>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 mt-10">فاکتوری در این بخش وجود ندارد.</p>
                )}
            </div>
            <button 
                onClick={() => setCreateModalOpen(true)}
                className="fixed bottom-24 right-6 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105"
            >
                <PlusIcon />
            </button>
            <CreateInvoiceModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
        </div>
    );
};

export default InvoicesScreen;