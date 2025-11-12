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

const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const initialOrders = {
    new: [{ id: 1, customer: 'علی محمدی', total: '250,000 تومان', items: 3, shippingMethod: 'درون شهری', shippingCost: '25,000 تومان', receiptImageUrl: 'https://placehold.co/400x600/203764/FFFFFF/png?text=Receipt+Image' }],
    preparing: [{ id: 2, customer: 'سارا رضایی', total: '1,200,000 تومان', items: 1, shippingMethod: 'پست', shippingCost: '45,000 تومان', receiptImageUrl: 'https://placehold.co/400x600/203764/FFFFFF/png?text=Receipt+Image' }],
    completed: [{ id: 3, customer: 'رضا حسینی', total: '85,000 تومان', items: 2, shippingMethod: 'درون شهری', shippingCost: '25,000 تومان', receiptImageUrl: null }]
};

const ImageViewerModal = ({ src, isOpen, onClose }) => {
    if (!isOpen || !src) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={onClose}>
             <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-[101]"
                aria-label="بستن"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <img
                src={src}
                alt="پیش‌نمایش کامل رسید"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

const ContactCustomerModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm p-6 text-center shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">تماس با مشتری</h2>
            <p className="text-gray-300 mb-6">آیا مایل به تماس با مشتری برای هماهنگی جهت لغو سفارش هستید؟</p>
            <div className="flex space-x-4 space-x-reverse">
                <button onClick={onCancel} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
                    انصراف
                </button>
                <button onClick={onConfirm} className="flex-1 py-2.5 text-center text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    بله، تماس
                </button>
            </div>
        </div>
    </div>
);

const ShippingDetailsModal = ({ order, onClose, onSubmit }) => {
    if (!order) return null;
    const isPost = order.shippingMethod === 'پست';
    return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4 text-center">ثبت اطلاعات ارسال</h2>
                <div className="space-y-4">
                     <div>
                        <label className="text-sm font-semibold mb-1 block">{isPost ? 'کد رهگیری' : 'شماره تماس پیک'}</label>
                        <input type="text" dir="ltr" className="w-full text-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                    </div>
                    <div className="flex space-x-4 space-x-reverse pt-2">
                         <button onClick={onClose} className="flex-1 py-2.5 text-center text-gray-200 bg-slate-700 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
                            انصراف
                        </button>
                        <button onClick={onSubmit} className="flex-1 py-2.5 text-center text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                            ثبت و ارسال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const OrderDetailModal = ({ order, onClose, onConfirm, onReject, onMarkShipped, onReceiptClick }) => {
    if (!order) return null;

    const isNew = order.status === 'new';
    const isPreparing = order.status === 'preparing';

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">جزئیات سفارش #{order.id}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-6">
                    {/* Invoice Details */}
                    <div className="p-4 bg-slate-900 rounded-lg">
                        <h3 className="font-semibold mb-3">فاکتور</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">محصول ۱</span><span>۱۵۰,۰۰۰ تومان</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">محصول ۲ (x2)</span><span>۱۰۰,۰۰۰ تومان</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">هزینه ارسال</span><span>{order.shippingCost}</span></div>
                            <hr className="border-slate-700"/>
                            <div className="flex justify-between font-bold"><span >مجموع</span><span>{order.total}</span></div>
                        </div>
                    </div>
                    {/* Customer & Payment */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                           <div>
                             <label className="text-xs text-gray-500">نام مشتری</label>
                             <p className="font-semibold">{order.customer}</p>
                           </div>
                           <div>
                             <label className="text-xs text-gray-500">شماره تماس</label>
                             <p className="font-semibold ltr text-right">09123456789</p>
                           </div>
                       </div>
                        <div className="flex justify-between items-center">
                           <div>
                             <label className="text-xs text-gray-500">نوع پرداخت</label>
                             <p className="font-semibold">کارت به کارت</p>
                           </div>
                           <div>
                             <label className="text-xs text-gray-500">نحوه ارسال</label>
                             <p className="font-semibold">{order.shippingMethod}</p>
                           </div>
                       </div>
                        {order.receiptImageUrl && (
                             <div>
                                 <label className="text-xs text-gray-500 mb-1 block">تصویر رسید</label>
                                 <img src={order.receiptImageUrl} onClick={() => onReceiptClick(order.receiptImageUrl)} alt="Receipt" className="rounded-lg cursor-pointer max-h-48" />
                             </div>
                        )}
                        <div>
                             <label className="text-xs text-gray-500">آدرس کامل</label>
                             <p className="font-semibold">تهران، خیابان ولیعصر، نرسیده به میدان تجریش، کوچه ۲۳، پلاک ۱۰، واحد ۵</p>
                        </div>
                         <div>
                             <label className="text-xs text-gray-500">کد پستی</label>
                             <p className="font-semibold">1234567890</p>
                        </div>
                    </div>
                </main>
                <footer className="p-4 mt-auto border-t border-slate-700">
                    {(isNew || isPreparing) && (
                        <div className="flex space-x-4 space-x-reverse">
                            <button onClick={onReject} className="flex-1 py-3 text-center text-red-400 bg-red-500/10 rounded-lg font-semibold hover:bg-red-500/20">رد سفارش</button>
                            {isNew && <button onClick={onConfirm} className="flex-1 py-3 text-center text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700">تایید سفارش</button>}
                            {isPreparing && <button onClick={onMarkShipped} className="flex-1 py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover">ارسال شد</button>}
                        </div>
                    )}
                </footer>
            </div>
        </div>
    )
}

const OrdersScreen = () => {
    const TABS = [{ id: 'new', label: 'جدید' }, { id: 'preparing', label: 'آماده‌سازی' }, { id: 'completed', label: 'خاتمه‌یافته' }];
    const [activeTab, setActiveTab] = useState('new');
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isImageViewerOpen, setImageViewerOpen] = useState(false);
    const [receiptImageToView, setReceiptImageToView] = useState('');
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isShippingModalOpen, setShippingModalOpen] = useState(false);

    const ordersToShow = orders[activeTab] || [];

    const handleOrderClick = (order) => {
        setSelectedOrder({...order, status: activeTab});
    };

    const handleConfirm = () => {
        const orderToMove = selectedOrder;
        setOrders(prev => ({
            ...prev,
            new: prev.new.filter(o => o.id !== orderToMove.id),
            preparing: [...prev.preparing, orderToMove],
        }));
        setSelectedOrder(null);
    }

     const handleReject = () => {
        if(selectedOrder.status === 'preparing') {
            setContactModalOpen(true);
        } else {
             setOrders(prev => ({
                 ...prev,
                 [selectedOrder.status]: prev[selectedOrder.status].filter(o => o.id !== selectedOrder.id),
             }));
             setSelectedOrder(null);
        }
    }

    const handleConfirmContact = () => {
        console.log('Contacting customer for order:', selectedOrder.id);
        setOrders(prev => ({
            ...prev,
            preparing: prev.preparing.filter(o => o.id !== selectedOrder.id),
        }));
        // In a real app, this would trigger a phone call
        window.location.href = 'tel:09123456789';
        setContactModalOpen(false);
        setSelectedOrder(null);
    }

     const handleMarkShipped = () => {
         setShippingModalOpen(true);
    }
    
    const handleSubmitShipping = () => {
        const orderToMove = selectedOrder;
        setOrders(prev => ({
            ...prev,
            preparing: prev.preparing.filter(o => o.id !== orderToMove.id),
            completed: [...prev.completed, orderToMove],
        }));
        setShippingModalOpen(false);
        setSelectedOrder(null);
    }

    const handleReceiptClick = (src) => {
        setReceiptImageToView(src);
        setImageViewerOpen(true);
    }

    return (
        <div className="p-4">
            <SubHeaderTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6 space-y-4">
                {ordersToShow.length > 0 ? ordersToShow.map(order => (
                    <div key={order.id} onClick={() => handleOrderClick(order)} className="bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">{order.customer}</span>
                            <span className="text-sm text-green-400">{order.total}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{order.items} مورد</p>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 mt-10">سفارشی در این بخش وجود ندارد.</p>
                )}
            </div>
            <OrderDetailModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)}
                onConfirm={handleConfirm}
                onReject={handleReject}
                onMarkShipped={handleMarkShipped}
                onReceiptClick={handleReceiptClick}
            />
            <ImageViewerModal isOpen={isImageViewerOpen} src={receiptImageToView} onClose={() => setImageViewerOpen(false)} />
            {isContactModalOpen && <ContactCustomerModal onConfirm={handleConfirmContact} onCancel={() => setContactModalOpen(false)} />}
            {isShippingModalOpen && <ShippingDetailsModal order={selectedOrder} onClose={() => setShippingModalOpen(false)} onSubmit={handleSubmitShipping} />}
        </div>
    );
};

export default OrdersScreen;