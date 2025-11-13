import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, min, max, onChange, unit }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 flex justify-between items-center">
        <span>{label}</span>
        <span className="font-bold text-blue-600">{value} {unit}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-blue-600"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
};

export default SliderInput;