import React from 'react';
import { ConstructionIcon } from '../components/icons';

const HotspotsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 5rem)' }}>
      <ConstructionIcon className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Hotspots Page Under Construction</h1>
      <p className="mt-2 text-gray-600 max-w-lg">
        This section is being built to visualize accident hotspots on an interactive map. Stay tuned for data tables, filtering capabilities, and geographic cluster analysis.
      </p>
    </div>
  );
};

export default HotspotsPage;