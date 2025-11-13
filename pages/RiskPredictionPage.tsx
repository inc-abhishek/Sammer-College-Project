import React, { useState, useCallback } from 'react';
import { PredictionInput, PredictionResult, PredictionHistoryItem, WeatherCondition, RiskLevel } from '../types';
import { predictRisk } from '../services/geminiService';
import SliderInput from '../components/SliderInput';
import SelectInput from '../components/SelectInput';
import ResultCard from '../components/ResultCard';
import PredictionHistoryTable from '../components/PredictionHistoryTable';
import { AlertTriangleIcon, BotIcon, HistoryIcon, LoaderIcon, ClipboardIcon } from '../components/icons';

const RiskPredictionPage: React.FC = () => {
  const [inputs, setInputs] = useState<PredictionInput>({
    numVehicles: 500,
    numInjuries: 5,
    poiCount: 10,
    temperature: 25,
    populationDensity: 3000,
    incomeLevel: 50,
    schoolCount: 3,
    weatherCondition: WeatherCondition.CLEAR,
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = useCallback((name: keyof PredictionInput, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name: keyof PredictionInput, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value as WeatherCondition }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const predictionResult = await predictRisk(inputs);
      setResult(predictionResult);
      const newHistoryItem: PredictionHistoryItem = {
        id: new Date().toISOString(),
        timestamp: new Date().toLocaleString(),
        inputs,
        result: predictionResult,
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level: RiskLevel | undefined) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-green-500';
      case RiskLevel.MEDIUM: return 'text-yellow-500';
      case RiskLevel.HIGH: return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getRiskBgColor = (level: RiskLevel | undefined) => {
    switch (level) {
      case RiskLevel.LOW: return 'bg-green-100 border-green-500';
      case RiskLevel.MEDIUM: return 'bg-yellow-100 border-yellow-500';
      case RiskLevel.HIGH: return 'bg-red-100 border-red-500';
      default: return 'bg-gray-100 border-gray-400';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">AI-Powered Traffic Safety Analysis</h1>
        <p className="text-lg text-gray-600 mt-2">Use the form below to get a real-time accident risk prediction based on a simulated ML model.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Inputs</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <SliderInput label="Number of Vehicles" value={inputs.numVehicles} min={0} max={1000} onChange={val => handleSliderChange('numVehicles', val)} unit="" />
            <SliderInput label="Number of Injuries" value={inputs.numInjuries} min={0} max={100} onChange={val => handleSliderChange('numInjuries', val)} unit="" />
            <SliderInput label="POI Count" value={inputs.poiCount} min={0} max={50} onChange={val => handleSliderChange('poiCount', val)} unit="POIs" />
            <SliderInput label="Temperature" value={inputs.temperature} min={-10} max={50} onChange={val => handleSliderChange('temperature', val)} unit="°C" />
            <SliderInput label="Population Density" value={inputs.populationDensity} min={0} max={10000} onChange={val => handleSliderChange('populationDensity', val)} unit="per km²" />
            <SliderInput label="Income Level" value={inputs.incomeLevel} min={0} max={100} onChange={val => handleSliderChange('incomeLevel', val)} unit="index" />
            <SliderInput label="School Count" value={inputs.schoolCount} min={0} max={20} onChange={val => handleSliderChange('schoolCount', val)} unit="schools" />
            <SelectInput label="Weather Condition" value={inputs.weatherCondition} onChange={val => handleSelectChange('weatherCondition', val)} options={Object.values(WeatherCondition)} />
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 flex items-center justify-center">
              {isLoading ? <><LoaderIcon className="animate-spin mr-2" /> Predicting...</> : 'Predict Risk'}
            </button>
          </form>
        </div>

        {/* Right Column: Results & History */}
        <div className="lg:col-span-3 space-y-8">
          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><BotIcon className="mr-2" />Prediction Result</h2>
            <div aria-live="polite" aria-atomic="true">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <LoaderIcon className="w-12 h-12 animate-spin mb-4" />
                  <p className="text-lg">AI is analyzing the data...</p>
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center justify-center h-48 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertTriangleIcon className="w-12 h-12 mb-4" />
                  <p className="font-semibold">Prediction Failed</p>
                  <p className="text-sm text-center">{error}</p>
                </div>
              )}
              {result && !isLoading && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`col-span-2 md:col-span-4 p-4 rounded-lg border-2 ${getRiskBgColor(result.riskLevel)}`}>
                      <p className="text-sm font-semibold text-gray-600">Overall Risk Level</p>
                      <p className={`text-4xl font-extrabold ${getRiskColor(result.riskLevel)}`}>{result.riskLevel}</p>
                  </div>
                  <ResultCard label="Risk Probability" value={`${result.riskProbability.toFixed(2)}%`} description="Likelihood of an incident." />
                  <ResultCard label="Confidence Score" value={result.confidenceScore.toFixed(2)} description="Model's certainty." />
                  <ResultCard label="Assigned Cluster" value={`#${result.clusterAssignment}`} description="Geographic risk zone." />
                </div>
              )}
              {!result && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400 bg-slate-50 rounded-lg">
                  <ClipboardIcon className="w-12 h-12 mb-4" />
                  <p className="font-semibold">Awaiting Input</p>
                  <p className="text-sm">Adjust the inputs and click "Predict Risk" to see the results.</p>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
             <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><HistoryIcon className="mr-2" />Prediction History</h2>
             {history.length > 0 ? (
                <PredictionHistoryTable history={history} />
             ) : (
                <p className="text-center text-gray-500 py-8">No predictions made yet.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPredictionPage;