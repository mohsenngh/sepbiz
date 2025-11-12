import React, { useState, useEffect, useRef } from 'react';
import { UploadIcon } from '../components/icons/UploadIcon';

const SearchIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SubHeaderTabs: React.FC<{
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-slate-800 text-gray-300'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

const ProductFormModal = ({ isOpen, onClose, onSave, categories, productToEdit, onDelete }) => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setCategoryId(productToEdit.categoryId.toString());
            setPrice(productToEdit.price.replace(/[^0-9]/g, ''));
            setStock(productToEdit.stock.toString());
            setImagePreview(productToEdit.imageUrl || null);
        } else {
             setName('');
             setCategoryId(categories.find(c => c.parentId === null)?.id.toString() || '');
             setPrice('');
             setStock('');
             setImagePreview(null);
             setImage(null);
        }
    }, [productToEdit, isOpen, categories]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            // Clean up previous preview
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            setImagePreview(previewUrl);
        }
    };

    const handleSave = () => {
        if (name && categoryId && price && stock) {
            const newProductData = {
                name,
                categoryId: Number(categoryId),
                price: `${Number(price).toLocaleString('fa-IR')} تومان`,
                stock: Number(stock),
                imageUrl: imagePreview,
                status: productToEdit?.status || 'active',
            };
            onSave(productToEdit ? { ...productToEdit, ...newProductData } : { id: Date.now(), ...newProductData });
            onClose();
        } else {
            alert('لطفا همه فیلدها را پر کنید.');
        }
    };
    
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);


    if (!isOpen) return null;

    const renderCategoryOptions = () => {
        // FIX: Changed JSX.Element to React.ReactElement to fix "Cannot find namespace 'JSX'" error.
        const options: React.ReactElement[] = [];
        const buildOptions = (parentId: number | null = null, depth = 0) => {
            const items = categories.filter(c => c.parentId === parentId);
            items.forEach(cat => {
                options.push(
                    <option key={cat.id} value={cat.id}>
                        {'--'.repeat(depth)} {cat.name}
                    </option>
                );
                buildOptions(cat.id, depth + 1);
            });
        };
        buildOptions();
        return options;
    };


    return (
         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">{productToEdit ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="text-sm font-semibold mb-1 block">نام محصول</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                    </div>
                     <div>
                        <label className="text-sm font-semibold mb-1 block">دسته‌بندی</label>
                        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                           {renderCategoryOptions()}
                        </select>
                    </div>
                     <div className="flex space-x-4 space-x-reverse">
                        <div className="flex-1">
                            <label className="text-sm font-semibold mb-1 block">قیمت (تومان)</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-semibold mb-1 block">موجودی</label>
                            <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2" />
                        </div>
                    </div>
                    <div>
                         <label className="text-sm font-semibold mb-1 block">تصاویر محصول</label>
                         <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 bg-slate-900 overflow-hidden relative">
                           <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                           {imagePreview ? (
                               <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                           ) : (
                             <>
                               <UploadIcon />
                               <p className="mt-2 text-sm text-gray-400">کشیدن و رها کردن یا انتخاب فایل</p>
                             </>
                           )}
                         </div>
                    </div>
                </main>
                 <footer className="p-4 mt-auto border-t border-slate-700 flex items-center justify-between">
                     {productToEdit && (
                        <button onClick={() => onDelete(productToEdit.id)} className="text-red-400 font-semibold px-4 py-2 hover:bg-red-500/10 rounded-lg">حذف</button>
                     )}
                    <button onClick={handleSave} className="w-full py-3 text-white bg-primary rounded-lg font-semibold hover:bg-primary-hover disabled:bg-slate-600 ml-auto">ذخیره</button>
                </footer>
            </div>
        </div>
    )
}

const CategoryManagerModal = ({ isOpen, onClose, categories, setCategories }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState(''); // '' for main category

    const handleAddCategory = () => {
        if(!name) {
            alert('نام دسته‌بندی الزامی است.');
            return;
        }
        const newCategory = {
            id: Date.now(),
            name,
            description,
            parentId: parentId ? Number(parentId) : null,
        };
        setCategories(prev => [...prev, newCategory]);
        setName('');
        setDescription('');
        setParentId('');
    };
    
    if (!isOpen) return null;
    const mainCategories = categories.filter(c => c.parentId === null);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl w-11/12 max-w-md max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="font-bold text-white">مدیریت دسته‌بندی‌ها</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon/></button>
                </header>
                <main className="p-6 overflow-y-auto space-y-4 flex-1">
                    <div className="p-4 bg-slate-900 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg mb-2">افزودن دسته‌بندی جدید</h3>
                         <input type="text" placeholder="نام دسته‌بندی" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2" />
                         <textarea placeholder="توضیحات (اختیاری)" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"></textarea>
                         <select value={parentId} onChange={e => setParentId(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2">
                            <option value="">به عنوان دسته‌بندی اصلی</option>
                            {mainCategories.map(c => <option key={c.id} value={c.id}>زیرمجموعه {c.name}</option>)}
                         </select>
                         <button onClick={handleAddCategory} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">افزودن</button>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2">لیست دسته‌بندی‌ها</h3>
                        <div className="space-y-2">
                           {categories.filter(c => c.parentId === null).map(mainCat => (
                               <div key={mainCat.id} className="bg-slate-900 p-3 rounded-lg">
                                   <p className="font-bold">{mainCat.name}</p>
                                   {categories.filter(c => c.parentId === mainCat.id).map(subCat => (
                                       <p key={subCat.id} className="text-sm text-gray-400 mr-4 mt-1">- {subCat.name}</p>
                                   ))}
                               </div>
                           ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};


const ProductsScreen = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'پوشاک مردانه', description: '', parentId: null },
        { id: 2, name: 'پیراهن', description: '', parentId: 1 },
        { id: 3, name: 'کالای دیجیتال', description: '', parentId: null },
        { id: 4, name: 'هدفون و هدست', description: '', parentId: 3 },
    ]);
    const [products, setProducts] = useState([
        { id: 1, name: 'پیراهن مردانه', categoryId: 2, price: '450,000 تومان', stock: 50, status: 'active', imageUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF/png?text=P' },
        { id: 2, name: 'هدفون بی‌سیم', categoryId: 4, price: '2,100,000 تومان', stock: 15, status: 'inactive', imageUrl: 'https://placehold.co/100x100/10B981/FFFFFF/png?text=H' },
    ]);

    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const handleSaveProduct = (productData) => {
        const exists = products.some(p => p.id === productData.id);
        if (exists) {
            setProducts(products.map(p => p.id === productData.id ? productData : p));
        } else {
            setProducts(prev => [...prev, productData]);
        }
    };
    
    const handleDeleteProduct = (productId) => {
        if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
            setProducts(products.filter(p => p.id !== productId));
            setModalMode(null);
            setSelectedProduct(null);
        }
    }

    const handleToggleStatus = (productId) => {
        setProducts(products.map(p => p.id === productId ? { ...p, status: p.status === 'active' ? 'inactive' : 'active'} : p))
    }

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setModalMode('edit');
    };
    
    const categoryTabs = [{id: 'all', label: 'همه'}, ...categories.filter(c => c.parentId === null).map(c => ({id: c.id.toString(), label: c.name}))]

    const getSubCategoryIds = (parentId) => {
        let ids = [parentId];
        const children = categories.filter(c => c.parentId === parentId);
        children.forEach(child => {
            ids = [...ids, ...getSubCategoryIds(child.id)];
        });
        return ids;
    };

    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(p => {
            const categoryIds = getSubCategoryIds(Number(activeTab));
            return categoryIds.includes(p.categoryId);
        });

    return (
        <div className="p-4 space-y-4">
            <div className="flex space-x-2 space-x-reverse">
                <div className="relative flex-grow">
                    <input type="text" placeholder="جستجوی محصول..." className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                    </div>
                </div>
                 <button onClick={() => setCategoryModalOpen(true)} className="bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">دسته‌بندی</button>
                <button onClick={() => { setSelectedProduct(null); setModalMode('add'); }} className="bg-primary text-white font-bold px-4 py-2 rounded-lg">+</button>
            </div>
            
            <SubHeaderTabs tabs={categoryTabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="space-y-3">
                 {filteredProducts.length > 0 ? filteredProducts.map(p => (
                    <div key={p.id} className={`bg-slate-800 p-3 rounded-lg transition-opacity ${p.status === 'inactive' ? 'opacity-50' : ''}`}>
                         <div className="flex items-start justify-between">
                            <div>
                                <p className="font-bold">{p.name}</p>
                                <div className="flex items-center text-sm mt-2">
                                    <span className="text-gray-400">{categories.find(c => c.id === p.categoryId)?.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <label htmlFor={`toggle-${p.id}`} className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" id={`toggle-${p.id}`} className="sr-only" checked={p.status === 'active'} onChange={() => handleToggleStatus(p.id)} />
                                        <div className={`block w-12 h-6 rounded-full transition-colors ${p.status === 'active' ? 'bg-primary' : 'bg-slate-600'}`}></div>
                                        <div className="dot absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                                    </div>
                                </label>
                                <style>{`
                                    #toggle-${p.id}:checked ~ .dot {
                                        transform: translateX(-1.5rem);
                                    }
                                `}</style>
                                <button onClick={() => handleEditClick(p)} className="text-blue-400 text-sm font-semibold">ویرایش</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-gray-300">موجودی: {p.stock}</span>
                            <span className="font-semibold text-green-400">{p.price}</span>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 pt-10">محصولی در این دسته‌بندی یافت نشد.</p>
                )}
            </div>
            <ProductFormModal 
                isOpen={modalMode !== null} 
                onClose={() => setModalMode(null)} 
                onSave={handleSaveProduct} 
                onDelete={handleDeleteProduct}
                categories={categories} 
                productToEdit={selectedProduct}
            />
            <CategoryManagerModal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)} categories={categories} setCategories={setCategories} />
        </div>
    );
};

export default ProductsScreen;