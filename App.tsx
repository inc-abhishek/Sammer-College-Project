import React from 'react';
import RiskPredictionPage from './pages/RiskPredictionPage';
import { LogoIcon } from './components/icons';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
              <LogoIcon className="text-blue-600 w-8 h-8" />
              <h1 className="text-xl font-bold text-gray-800">Urban Mobility & Traffic Safety</h1>
          </div>
        </div>
      </header>
      <main>
        <RiskPredictionPage />
      </main>
    </div>
  );
}

export default App;