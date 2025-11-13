export enum WeatherCondition {
  CLEAR = "Clear",
  CLOUDY = "Cloudy",
  RAIN = "Rain",
  SNOW = "Snow",
  FOG = "Fog",
}

export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface PredictionInput {
  numVehicles: number;
  numInjuries: number;
  poiCount: number;
  temperature: number;
  populationDensity: number;
  incomeLevel: number; // Represented as a range 0-100 for simplicity
  schoolCount: number;
  weatherCondition: WeatherCondition;
}

export interface PredictionResult {
  riskLevel: RiskLevel;
  riskProbability: number;
  confidenceScore: number;
  clusterAssignment: number;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  inputs: PredictionInput;
  result: PredictionResult;
}
