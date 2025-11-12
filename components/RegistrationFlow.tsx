import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { RegistrationStep, FormData } from '../types';
import Layout from './Layout';
import StepTracker from './StepTracker';
import WheelPicker from './WheelPicker';
import SearchableSelect from './SearchableSelect';
import { BUSINESS_CATEGORIES } from '../constants';
import { UploadIcon } from './icons/UploadIcon';


const REGISTRATION_STEPS = [
  { id: RegistrationStep.Intro, name: "ثبت درخواست" },
  { id: RegistrationStep.AddressConfirm, name: "بررسی درخواست" },
  { id: RegistrationStep.ContractView, name: "امضا قرارداد" },
  { id: RegistrationStep.ContractSigned, name: "فعالسازی" },
];

// Inlined Icons for the new design
const IdCardIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <line x1="6" y1="10" x2="10" y2="10"></line>
    <line x1="14" y1="14" x2="18" y2="14"></line>
    <line x1="14" y1="10" x2="18" y2="10"></line>
    <line x1="6" y1="14" x2="10" y2="14"></line>
  </svg>
);
const DocumentIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const OtpInput: React.FC<{ length: number; value: string; onChange: (value: string) => void }> = ({ length, value, onChange }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtp = value.split('');
        newOtp[index] = e.target.value.slice(-1);
        onChange(newOtp.join(''));

        if (e.target.value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
        onChange(pastedData);
        const nextFocusIndex = pastedData.length < length ? pastedData.length : length - 1;
        inputRefs.current[nextFocusIndex]?.focus();
    };

    return (
        <div dir="ltr" className="flex justify-center gap-2" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el!}
                    type="tel"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white transition-colors"
                />
            ))}
        </div>
    );
};

interface RegistrationFlowProps {
  onBackToWelcome: () => void;
  onRegistrationComplete: () => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ onBackToWelcome, onRegistrationComplete }) => {
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.Intro);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    otp: '',
    nationalId: '',
    dob: { day: 1, month: 1, year: 1370 },
    idType: null,
    smartCardFront: null,
    smartCardBack: null,
    certificateCode: '',
    birthCertificate: null,
    postalCode: '',
    businessCategory: '',
    address: 'تهران، خیابان آزادی، پلاک ۱۰', // Mock address
    bankInfo: '',
    accountHolderName: 'علی علوی' // Mock name for validation
  });
  const [hasAgreedToContract, setHasAgreedToContract] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'scanning' | 'success'>('scanning');


  // FIX: Moved hooks to top level to comply with Rules of Hooks.
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const years = useMemo(() => Array.from({ length: 80 }, (_, i) => 1402 - i), []);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = useCallback(() => {
    switch (step) {
      case RegistrationStep.Intro:
        setStep(RegistrationStep.PhoneNumber);
        break;
      case RegistrationStep.PhoneNumber:
        setStep(RegistrationStep.Otp);
        break;
      case RegistrationStep.Otp:
        setStep(RegistrationStep.NationalId);
        break;
      case RegistrationStep.NationalId:
        setStep(RegistrationStep.DateOfBirth);
        break;
      case RegistrationStep.DateOfBirth:
        setStep(RegistrationStep.IdTypeSelection);
        break;
      case RegistrationStep.IdTypeSelection:
        // This is handled by the buttons directly
        break;
      case RegistrationStep.SmartCardUpload:
      case RegistrationStep.CertificateUpload:
        setStep(RegistrationStep.AddressAndBusiness);
        break;
      case RegistrationStep.AddressAndBusiness:
        setStep(RegistrationStep.AddressConfirm);
        break;
      case RegistrationStep.AddressConfirm:
        setStep(RegistrationStep.BankAccount);
        break;
      case RegistrationStep.BankAccount:
        setStep(RegistrationStep.BankAccountConfirm);
        break;
      case RegistrationStep.BankAccountConfirm:
         setStep(RegistrationStep.Success);
        break;
      case RegistrationStep.Success:
         setStep(RegistrationStep.ContractView);
        break;
      case RegistrationStep.ContractView:
        setStep(RegistrationStep.FaceVerification);
        break;
      case RegistrationStep.FaceVerification:
        setStep(RegistrationStep.ContractSigned);
        break;
      case RegistrationStep.ContractSigned:
        onRegistrationComplete();
        break;
      default:
        break;
    }
  }, [step, onRegistrationComplete]);
  
   const handleIdTypeSelection = (type: 'smart_card' | 'certificate') => {
      updateFormData('idType', type);
      if (type === 'smart_card') {
        setStep(RegistrationStep.SmartCardUpload);
      } else {
        setStep(RegistrationStep.CertificateUpload);
      }
   };

  const handleBack = useCallback(() => {
    switch (step) {
      case RegistrationStep.PhoneNumber:
        setStep(RegistrationStep.Intro);
        break;
      case RegistrationStep.Otp:
        setStep(RegistrationStep.PhoneNumber);
        break;
      case RegistrationStep.NationalId:
        setStep(RegistrationStep.Otp);
        break;
      case RegistrationStep.DateOfBirth:
        setStep(RegistrationStep.NationalId);
        break;
      case RegistrationStep.IdTypeSelection:
        setStep(RegistrationStep.DateOfBirth);
        break;
      case RegistrationStep.SmartCardUpload:
      case RegistrationStep.CertificateUpload:
        setStep(RegistrationStep.IdTypeSelection);
        break;
      case RegistrationStep.AddressAndBusiness:
        if (formData.idType === 'smart_card') setStep(RegistrationStep.SmartCardUpload);
        else setStep(RegistrationStep.CertificateUpload);
        break;
      case RegistrationStep.AddressConfirm:
        setStep(RegistrationStep.AddressAndBusiness);
        break;
      case RegistrationStep.BankAccount:
        setStep(RegistrationStep.AddressConfirm);
        break;
      case RegistrationStep.BankAccountConfirm:
        setStep(RegistrationStep.BankAccount);
        break;
      case RegistrationStep.Success:
        setStep(RegistrationStep.BankAccountConfirm);
        break;
      case RegistrationStep.ContractView:
        setStep(RegistrationStep.Success);
        break;
       case RegistrationStep.FaceVerification:
        setStep(RegistrationStep.ContractView);
        break;
      case RegistrationStep.ContractSigned:
        onBackToWelcome();
        break;
      default:
        onBackToWelcome();
        break;
    }
  }, [step, formData.idType, onBackToWelcome]);

  useEffect(() => {
    if (step === RegistrationStep.FaceVerification) {
        setVerificationStatus('scanning'); // Reset on step entry
        const timer = setTimeout(() => {
            setVerificationStatus('success');
            setTimeout(() => {
                handleNext();
            }, 1500); // Wait 1.5 sec on success message before moving on
        }, 3000); // Simulate 3s scan

        return () => clearTimeout(timer);
    }
  }, [step, handleNext]);


  const renderStep = () => {
    switch (step) {
      case RegistrationStep.Intro:
        return (
          <Layout onBack={onBackToWelcome}>
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">کسب و کار حرفه‌ای، ابزار حرفه‌ای میخواد</h2>
              <p className="text-gray-400 mb-10">برای شروع، مراحل زیر را دنبال کنید.</p>
              <div className="w-full max-w-xs my-8">
                <StepTracker steps={REGISTRATION_STEPS} currentStepId={step} />
              </div>
            </div>
            <div className="pb-4">
              <button onClick={handleNext} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors">شروع</button>
            </div>
          </Layout>
        );
      
      case RegistrationStep.PhoneNumber:
        const isPhoneNumberValid = formData.phoneNumber.startsWith('09') && formData.phoneNumber.length === 11;
        return (
           <Layout onBack={handleBack}>
              <h2 className="text-xl font-bold mb-4 text-center text-white">ورود یا ثبت‌نام</h2>
              <p className="text-gray-400 mb-6 text-center">لطفا شماره موبایل خود را وارد کنید.</p>
              <input
                type="tel"
                dir="ltr"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                placeholder="09123456789"
                className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white transition-colors"
              />
               <div className="mt-auto pt-4">
                 <button onClick={handleNext} disabled={!isPhoneNumberValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ادامه</button>
               </div>
           </Layout>
        );

      case RegistrationStep.Otp:
        const isOtpValid = formData.otp.length === 6;
        return (
          <Layout onBack={handleBack}>
            <h2 className="text-xl font-bold mb-2 text-center text-white">کد تایید</h2>
            <p className="text-gray-400 mb-6 text-center">کد ۶ رقمی ارسال شده به شماره {formData.phoneNumber} را وارد کنید.</p>
            <OtpInput
              length={6}
              value={formData.otp}
              onChange={(value) => updateFormData('otp', value)}
            />
            <div className="mt-auto pt-4">
              <button onClick={handleNext} disabled={!isOtpValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">تایید</button>
            </div>
          </Layout>
        );
        
       case RegistrationStep.NationalId:
        const isNationalIdValid = formData.nationalId.length === 10;
        return (
           <Layout onBack={handleBack}>
              <h2 className="text-xl font-bold mb-4 text-center text-white">کد ملی</h2>
              <input
                type="text"
                maxLength={10}
                dir="ltr"
                value={formData.nationalId}
                onChange={(e) => updateFormData('nationalId', e.target.value)}
                className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
              />
               <div className="mt-auto pt-4">
                 <button onClick={handleNext} disabled={!isNationalIdValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ادامه</button>
               </div>
           </Layout>
        );

      case RegistrationStep.DateOfBirth:
        return (
          <Layout onBack={handleBack}>
            <h2 className="text-xl font-bold mb-4 text-center text-white">تاریخ تولد</h2>
            <div className="flex justify-around items-center px-4 mb-2 text-gray-400 text-sm">
                <span className="w-1/3 text-center">سال</span>
                <span className="w-1/3 text-center">ماه</span>
                <span className="w-1/3 text-center">روز</span>
            </div>
            <div className="flex justify-center items-center h-48 flex-row-reverse">
              <div className="flex-1"><WheelPicker items={days} selectedValue={formData.dob.day} onSelect={(v) => updateFormData('dob', {...formData.dob, day: Number(v)})} /></div>
              <div className="flex-1"><WheelPicker items={months} selectedValue={formData.dob.month} onSelect={(v) => updateFormData('dob', {...formData.dob, month: Number(v)})} /></div>
              <div className="flex-1"><WheelPicker items={years} selectedValue={formData.dob.year} onSelect={(v) => updateFormData('dob', {...formData.dob, year: Number(v)})} /></div>
            </div>
             <div className="mt-auto pt-4">
              <button onClick={handleNext} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors">ادامه</button>
            </div>
          </Layout>
        );
      
      case RegistrationStep.IdTypeSelection:
        return (
            <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">انتخاب مدرک شناسایی</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div onClick={() => handleIdTypeSelection('smart_card')} className="p-4 bg-green-500/10 text-green-300 rounded-2xl flex flex-col items-center justify-center space-y-3 cursor-pointer aspect-square hover:bg-green-500/20 transition-colors">
                        <IdCardIcon className="w-12 h-12" />
                        <span className="font-semibold text-sm">کارت ملی هوشمند</span>
                    </div>
                    <div onClick={() => handleIdTypeSelection('certificate')} className="p-4 bg-blue-500/10 text-blue-300 rounded-2xl flex flex-col items-center justify-center space-y-3 cursor-pointer aspect-square hover:bg-blue-500/20 transition-colors">
                        <DocumentIcon className="w-12 h-12" />
                        <span className="font-semibold text-sm">گواهی کارت ملی</span>
                    </div>
                </div>
            </Layout>
        );

      case RegistrationStep.SmartCardUpload:
        const isSmartCardFormValid = !!formData.smartCardFront && !!formData.smartCardBack;
        return (
            <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">کارت ملی هوشمند</h2>
                <div className="space-y-6">
                   <FileUploadBox title="تصویر روی کارت ملی" file={formData.smartCardFront} onFileChange={(file) => updateFormData('smartCardFront', file)} />
                   <FileUploadBox title="تصویر پشت کارت ملی" file={formData.smartCardBack} onFileChange={(file) => updateFormData('smartCardBack', file)} />
                </div>
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} disabled={!isSmartCardFormValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ادامه</button>
                </div>
            </Layout>
        );

      case RegistrationStep.CertificateUpload:
         const isCertificateFormValid = formData.certificateCode.toUpperCase().match(/^[A-Z][0-9]{9}$/) && !!formData.birthCertificate;
        return (
            <Layout onBack={handleBack}>
                 <h2 className="text-xl font-bold mb-6 text-center text-white">گواهی و شناسنامه</h2>
                 <div className="space-y-6">
                    <div>
                         <label className="font-semibold text-gray-300 mb-2 block">کد گواهی کارت ملی هوشمند</label>
                         <input
                            type="text"
                            dir="ltr"
                            maxLength={10}
                            value={formData.certificateCode}
                            onChange={(e) => updateFormData('certificateCode', e.target.value)}
                            placeholder="A123456789"
                            className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                        />
                         <p className="text-xs text-gray-500 mt-1 text-right">کاراکتر اول باید حرف بزرگ انگلیسی باشد.</p>
                    </div>
                   <FileUploadBox title="تصویر صفحه اول شناسنامه" file={formData.birthCertificate} onFileChange={(file) => updateFormData('birthCertificate', file)} />
                </div>
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} disabled={!isCertificateFormValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ادامه</button>
                </div>
            </Layout>
        );

      case RegistrationStep.AddressAndBusiness:
        const isAddressFormValid = formData.postalCode.length === 10 && !!formData.businessCategory;
        return (
          <Layout onBack={handleBack}>
              <h2 className="text-xl font-bold mb-6 text-center text-white">کدپستی و صنف</h2>
              <div className="space-y-6">
                <div>
                  <label className="font-semibold text-gray-300 mb-2 block">کد پستی</label>
                  <input
                    type="text"
                    maxLength={10}
                    dir="ltr"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                    className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                  />
                </div>
                <div>
                   <label className="font-semibold text-gray-300 mb-2 block">صنف</label>
                   <SearchableSelect 
                     options={BUSINESS_CATEGORIES}
                     value={formData.businessCategory}
                     onChange={(value) => updateFormData('businessCategory', value)}
                     placeholder="جستجو در اصناف..."
                   />
                </div>
              </div>
               <div className="mt-auto pt-4">
                <button onClick={handleNext} disabled={!isAddressFormValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ادامه</button>
              </div>
          </Layout>
        );

      case RegistrationStep.AddressConfirm:
         return (
             <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">تایید آدرس</h2>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="font-semibold text-gray-300">آدرس استعلام شده:</p>
                    <p className="text-gray-200 mt-2">{formData.address}</p>
                </div>
                <button className="text-blue-400 font-semibold mt-4 text-sm">ویرایش آدرس</button>
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors">تایید و ادامه</button>
                </div>
             </Layout>
         );
      
      case RegistrationStep.BankAccount:
        const isBankInfoValid = formData.bankInfo.length > 15; // Basic length check for card/shaba
         return (
             <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">اطلاعات حساب بانکی</h2>
                 <input
                    type="text"
                    dir="ltr"
                    value={formData.bankInfo}
                    onChange={(e) => updateFormData('bankInfo', e.target.value)}
                    placeholder="شماره کارت یا شبا"
                    className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                  />
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} disabled={!isBankInfoValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">استعلام حساب</button>
                </div>
             </Layout>
         );
         
      case RegistrationStep.BankAccountConfirm:
          const isNameMatch = formData.accountHolderName === 'علی علوی'; // Mock logic
         return (
             <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">تایید اطلاعات حساب</h2>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-3">
                    <InfoRow label="نوع حساب" value="سپرده کوتاه مدت" />
                    <InfoRow label="نام دارنده حساب" value={formData.accountHolderName} />
                    <InfoRow label="شماره شبا" value="IR123456789012345678901234" />
                    <InfoRow label="نام بانک" value="سامان" />
                </div>
                 {!isNameMatch && (
                     <p className="text-red-500 text-sm mt-4 text-center">نام دارنده حساب با اطلاعات هویتی شما مغایرت دارد. لطفا یک حساب به نام خودتان وارد کنید.</p>
                 )}
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} disabled={!isNameMatch} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover disabled:bg-slate-700 disabled:cursor-not-allowed">تایید</button>
                </div>
             </Layout>
         );
    
     case RegistrationStep.Success:
        return (
          <Layout onBack={handleBack}>
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold text-green-400 mb-4">اطلاعات شما با موفقیت دریافت شد</h2>
              <p className="text-gray-300 mb-8">اطلاعات ارسالی تا ساعات دیگر بررسی و امکان امضای قرارداد برای شما فراهم میشود.</p>
               <div className="w-full max-w-xs my-8">
                <StepTracker steps={REGISTRATION_STEPS} currentStepId={RegistrationStep.AddressConfirm} />
              </div>
            </div>
             <div className="pb-4">
              <button onClick={handleNext} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors">ادامه</button>
            </div>
          </Layout>
        );

      case RegistrationStep.ContractView:
          return (
             <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">امضای قرارداد</h2>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 h-64 overflow-y-auto">
                    <p className="text-sm leading-relaxed text-gray-300">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد...</p>
                </div>
                <div className="mt-6">
                    <label htmlFor="agree-toggle" className="flex items-center cursor-pointer justify-center">
                        <div className="relative">
                             <input type="checkbox" id="agree-toggle" className="sr-only" checked={hasAgreedToContract} onChange={() => setHasAgreedToContract(!hasAgreedToContract)} />
                             <div className={`block w-12 h-6 rounded-full transition-colors ${hasAgreedToContract ? 'bg-primary' : 'bg-slate-600'}`}></div>
                             <div className="dot absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                        </div>
                        <span className="mr-3 text-gray-300 text-sm">مفاد قرارداد را خوانده و مورد تایید می باشد</span>
                    </label>
                    <style>{`
                        #agree-toggle:checked ~ .dot {
                            transform: translateX(-1.5rem);
                        }
                    `}</style>
                </div>
                 <div className="mt-auto pt-4">
                  <button onClick={handleNext} disabled={!hasAgreedToContract} className="w-full py-3 px-6 text-white bg-green-600 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">تایید و امضا قرارداد</button>
                </div>
             </Layout>
          );
      
      case RegistrationStep.FaceVerification:
        return (
            <Layout onBack={handleBack}>
                <h2 className="text-xl font-bold mb-6 text-center text-white">احراز هویت</h2>
                <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="relative w-64 h-80 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-64 border-4 border-dashed border-white/50 rounded-[50%] animate-pulse"></div>
                        </div>
                        {verificationStatus === 'success' && (
                            <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center text-white z-10">
                                <CheckCircleIcon className="w-20 h-20" />
                            </div>
                        )}
                    </div>
                    <p className="text-gray-300 mt-6 text-center font-semibold text-lg">
                        {verificationStatus === 'scanning' ? 'در حال اسکن چهره...' : 'احراز هویت با موفقیت انجام شد'}
                    </p>
                     <p className="text-gray-400 mt-2 text-center text-sm">
                        {verificationStatus === 'scanning' && 'لطفا چهره خود را ثابت در کادر نگه دارید.'}
                    </p>
                </div>
            </Layout>
        );


      case RegistrationStep.ContractSigned:
        return (
            <Layout onBack={null}>
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                  <h2 className="text-2xl font-bold text-green-400 mb-4">تبریک! به جمع حرفه‌ای‌ها خوش آمدید.</h2>
                  <p className="text-gray-300 mb-8">ثبت‌نام شما با موفقیت تکمیل شد و حساب کاربری شما فعال است.</p>
                   <div className="w-full max-w-xs my-8">
                     <StepTracker steps={REGISTRATION_STEPS} currentStepId={RegistrationStep.ContractSigned} />
                   </div>
                </div>
                <div className="pb-4">
                  <button onClick={handleNext} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors">ورود به اپلیکیشن</button>
                </div>
            </Layout>
        );

      default:
        return <div>مرحله نامشخص</div>;
    }
  };

  return <div className="h-screen w-full">{renderStep()}</div>;
};

// Helper components defined outside the main component body
const FileUploadBox: React.FC<{title: string; file: File | null; onFileChange: (file: File) => void;}> = ({title, file, onFileChange}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Cleanup function to avoid memory leaks
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
        }
    }
    return (
        <div>
            <label className="font-semibold text-gray-300 mb-2 block">{title}</label>
            <div 
                onClick={() => inputRef.current?.click()} 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors bg-slate-900 overflow-hidden"
            >
                <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                {previewUrl && file ? (
                     <div className="relative w-full h-full">
                        <img src={previewUrl} alt={`پیش‌نمایش ${file.name}`} className="w-full h-full object-contain" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center">
                           <p className="text-xs text-white truncate">{file.name}</p>
                        </div>
                     </div>
                ) : (
                    <div className="text-center text-gray-400">
                        <UploadIcon />
                        <p className="mt-2 text-sm">بارگذاری از گالری یا دوربین</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoRow: React.FC<{label: string; value: string}> = ({label, value}) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">{label}:</span>
        <span className="font-semibold text-gray-100">{value}</span>
    </div>
);


export default RegistrationFlow;