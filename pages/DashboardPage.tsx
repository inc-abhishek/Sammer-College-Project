import React from 'react';
import { ConstructionIcon } from '../components/icons';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <ConstructionIcon className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Under Construction</h1>
      <p className="mt-2 text-gray-600 max-w-lg">
        Our team is currently developing this page. Soon, you'll find interactive charts and key metrics about urban mobility and traffic safety right here.
      </p>
    </div>
  );
};

export default DashboardPage;
