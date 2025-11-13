# Urban Mobility & Traffic Safety: AI-Powered Accident Risk Prediction

## Project Overview

This web application is an intelligent traffic safety platform that uses a simulated machine learning model to predict traffic accident risk in real-time. It provides a user-friendly interface for city planners, traffic authorities, or students to analyze how different environmental, traffic, and socio-economic factors contribute to road safety.

The core of the application is a powerful risk prediction engine that leverages the Google Gemini API to simulate the output of a sophisticated XGBoost classifier, delivering instant, data-driven insights.

---

## Key Features

- **AI-Powered Risk Prediction:** Utilizes the Gemini API to simulate an ML model that predicts accident risk level (Low, Medium, High), probability, and confidence score.
- **Interactive Input Form:** A clean and intuitive UI with sliders and dropdowns allows users to adjust 13 different features, including traffic volume, weather conditions, POI density, and more.
- **Real-Time Results:** Instantly view the prediction results in a clear, color-coded display that highlights the overall risk.
- **Prediction History:** Automatically saves and displays the last 10 predictions, allowing for easy comparison and analysis of different scenarios.
- **Responsive Design:** The application is fully responsive and optimized for a seamless experience on desktops, tablets, and mobile devices.
- **Modern Tech Stack:** Built with the latest frontend technologies for a fast, reliable, and maintainable application.

---

## Technology Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS for a utility-first, responsive design
- **AI & Backend Simulation:** Google Gemini API (`gemini-2.5-flash`)
- **Build Tool:** Vite (via in-browser modules and CDN)

---

## How It Works

The application simulates a full-stack ML pipeline directly in the browser:

1.  **User Input:** The user adjusts various parameters on the `RiskPredictionPage` using interactive form controls.
2.  **API Service Call:** When the "Predict Risk" button is clicked, the input data is sent to the `geminiService`.
3.  **Prompt Engineering:** The service constructs a detailed prompt that instructs the Gemini model to act as a simulated XGBoost classifier. It passes the user's input as features to be analyzed.
4.  **Structured Output:** The API call includes a strict `responseSchema`. This forces the Gemini API to return its analysis in a clean, predictable JSON format, containing `riskLevel`, `riskProbability`, `confidenceScore`, and `clusterAssignment`.
5.  **Display Results:** The frontend receives the structured JSON data, updates the application's state, and displays the prediction results and adds the transaction to the history table.

This approach cleverly uses a powerful Large Language Model (LLM) to simulate the behavior of a specialized machine learning model without needing to train, host, and maintain a separate backend infrastructure.

---

## File Structure

The project is organized into a clean and logical structure:

```
/
├── index.html                  # Main HTML entry point, includes CDN links
├── index.tsx                   # React application root
├── App.tsx                     # Main app component and layout
├── README.md                   # Project documentation
│
├── pages/
│   └── RiskPredictionPage.tsx  # The core page for prediction functionality
│
├── components/
│   ├── SliderInput.tsx         # Reusable slider component
│   ├── SelectInput.tsx         # Reusable dropdown component
│   ├── ResultCard.tsx          # Component for displaying a single result metric
│   ├── PredictionHistoryTable.tsx # Table for showing past predictions
│   └── icons.tsx               # SVG icon components
│
├── services/
│   └── geminiService.ts        # Logic for interacting with the Gemini API
│
└── types.ts                    # TypeScript type definitions and enums
```
