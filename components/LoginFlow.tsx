import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';

interface LoginFlowProps {
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

enum LoginStep {
  PhoneNumber,
  Otp,
}

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


const LoginFlow: React.FC<LoginFlowProps> = ({ onBackToWelcome, onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>(LoginStep.PhoneNumber);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleNext = () => {
    if (step === LoginStep.PhoneNumber) {
      setStep(LoginStep.Otp);
    } else {
      // Login logic would go here. For now, it simulates success and navigates to the main app.
      console.log('Login successful (simulated)');
      onLoginSuccess();
    }
  };

  const handleBack = () => {
    if (step === LoginStep.Otp) {
      setStep(LoginStep.PhoneNumber);
    } else {
      onBackToWelcome();
    }
  };

  const renderStep = () => {
    switch (step) {
      case LoginStep.PhoneNumber:
        const isPhoneNumberValid = phoneNumber.startsWith('09') && phoneNumber.length === 11;
        return (
          <Layout onBack={handleBack}>
            <h2 className="text-xl font-bold mb-4 text-center text-white">ورود به حساب کاربری</h2>
            <p className="text-gray-400 mb-6 text-center">شماره موبایل خود را وارد کنید.</p>
            <input
              type="tel"
              dir="ltr"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09123456789"
              className="w-full px-4 py-3 text-lg text-center bg-slate-800 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white transition-colors"
            />
            <div className="mt-auto pt-4">
              <button onClick={handleNext} disabled={!isPhoneNumberValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ارسال کد تایید</button>
            </div>
          </Layout>
        );
      case LoginStep.Otp:
        const isOtpValid = otp.length === 6;
        return (
          <Layout onBack={handleBack}>
            <h2 className="text-xl font-bold mb-2 text-center text-white">کد تایید</h2>
            <p className="text-gray-400 mb-6 text-center">کد ۶ رقمی ارسال شده به شماره {phoneNumber} را وارد کنید.</p>
            <OtpInput
              length={6}
              value={otp}
              onChange={setOtp}
            />
            <div className="mt-auto pt-4">
              <button onClick={handleNext} disabled={!isOtpValid} className="w-full py-3 px-6 text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed">ورود</button>
            </div>
          </Layout>
        );
    }
  };
  
  return <div className="h-screen w-full">{renderStep()}</div>;
};

export default LoginFlow;