import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  description: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, description }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
  );
};

export default ResultCard;
