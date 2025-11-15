import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RiskPredictionPage from './pages/RiskPredictionPage';
import DashboardPage from './pages/DashboardPage';
import HotspotsPage from './pages/HotspotsPage';
import { LogoIcon } from './components/icons';

function App() {
  const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors";
  const activeLinkClass = "px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50";

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-gray-800">
        <header className="bg-white shadow-md sticky top-0 z-10 h-20">
          <div className="container mx-auto px-6 h-full flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <LogoIcon className="text-blue-600 w-8 h-8" />
                <h1 className="text-xl font-bold text-gray-800">Urban Mobility & Safety</h1>
            </div>
            <nav className="flex space-x-2 md:space-x-4">
              <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>Risk Prediction</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>Dashboard</NavLink>
              <NavLink to="/hotspots" className={({ isActive }) => isActive ? activeLinkClass : linkClass}>Hotspots</NavLink>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RiskPredictionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/hotspots" element={<HotspotsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;