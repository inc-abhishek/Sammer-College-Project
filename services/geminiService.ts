import { GoogleGenAI, Type } from "@google/genai";
import { PredictionInput, PredictionResult, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function predictRisk(inputs: PredictionInput): Promise<PredictionResult> {
  const model = "gemini-2.5-flash";

  const prompt = `
    Analyze the following traffic and environmental data to predict the accident risk.
    - Number of Vehicles: ${inputs.numVehicles}
    - Number of Injuries: ${inputs.numInjuries}
    - Points of Interest (POIs) nearby: ${inputs.poiCount}
    - Temperature (°C): ${inputs.temperature}
    - Population Density (per km²): ${inputs.populationDensity}
    - Average Income Level (0-100 scale): ${inputs.incomeLevel}
    - Number of Schools nearby: ${inputs.schoolCount}
    - Weather Condition: ${inputs.weatherCondition}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are an AI simulating an XGBoost classifier for urban traffic accident risk prediction. Your task is to analyze the provided features and output a risk assessment in a structured JSON format. Do not provide any explanations or text outside of the JSON structure. The risk probability should be a percentage between 0 and 100. The confidence score should be between 0.0 and 1.0.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              enum: [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH],
              description: "The predicted risk level.",
            },
            riskProbability: {
              type: Type.NUMBER,
              description: "The probability of an accident occurring, as a percentage (0-100).",
            },
            confidenceScore: {
              type: Type.NUMBER,
              description: "The model's confidence in the prediction (0.0-1.0).",
            },
            clusterAssignment: {
              type: Type.INTEGER,
              description: "The assigned geographic risk cluster (e.g., 1, 2, or 3).",
            },
          },
          required: ["riskLevel", "riskProbability", "confidenceScore", "clusterAssignment"],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Ensure probability is within bounds
    result.riskProbability = Math.max(0, Math.min(100, result.riskProbability));
    
    return result as PredictionResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let message = "An unexpected error occurred while communicating with the AI model.";
    if (error instanceof Error) {
        message = error.message;
    }
    throw new Error(`AI Prediction Failed: ${message}`);
  }
}