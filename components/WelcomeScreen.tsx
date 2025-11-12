import React from 'react';

interface WelcomeScreenProps {
  onStartRegistration: () => void;
  onStartLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartRegistration, onStartLogin }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <svg
          className="w-24 h-24 mb-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        <h1 className="text-3xl font-bold text-white">به سپ بیز خوش آمدید</h1>
        <p className="mt-2 text-lg text-gray-400">پلتفرم مدیریت کسب و کار حرفه‌ای شما</p>
      </main>
      <footer className="p-6">
        <div className="flex items-center justify-center space-x-6 space-x-reverse">
          <button 
            onClick={onStartLogin}
            className="flex-1 py-3 px-6 text-center text-gray-200 bg-transparent border-2 border-slate-600 rounded-lg font-semibold shadow-sm hover:bg-slate-800 transition-colors"
          >
            ورود
          </button>
          <button
            onClick={onStartRegistration}
            className="flex-1 py-3 px-6 text-center text-white bg-primary rounded-lg font-semibold shadow-md bg-primary-hover transition-colors"
          >
            ثبت نام
          </button>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;