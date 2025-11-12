import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationFlow from './components/RegistrationFlow';
import LoginFlow from './components/LoginFlow';
import MainApp from './components/MainApp';

type View = 'welcome' | 'registering' | 'login' | 'loggedIn';

const App: React.FC = () => {
  const [view, setView] = useState<View>('welcome');

  const renderCurrentView = () => {
    switch (view) {
      case 'registering':
        return <RegistrationFlow onBackToWelcome={() => setView('welcome')} onRegistrationComplete={() => setView('login')} />;
      case 'login':
        return <LoginFlow onBackToWelcome={() => setView('welcome')} onLoginSuccess={() => setView('loggedIn')} />;
      case 'loggedIn':
        return <MainApp onLogout={() => setView('welcome')} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStartRegistration={() => setView('registering')} onStartLogin={() => setView('login')} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans">
      {renderCurrentView()}
    </div>
  );
};

export default App;