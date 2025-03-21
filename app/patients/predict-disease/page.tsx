"use client";
import axios from "axios"; // ✅ Third-party libraries next
import { useState, useEffect } from "react"; // ✅ React first
import Select, { StylesConfig } from "react-select"; // ✅ Third-party

const customStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff", // Light background
    color: "#000", // Dark text
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
        ? "#e6e6e6"
        : "#fff",
    color: "#000",
  }),
};

const PredictDisease = () => {
  type Symptom = {
    value: string;
    label: string;
  };

  const [symptomsList, setSymptomsList] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  type Prediction = {
    predicted_disease: string;
    top_3_predictions: { disease: string; probability: string }[];
  };

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch symptoms list from backend
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(
          "https://disease-detection2.onrender.com/symptoms"
        );
        console.log("Fetched Symptoms:", response.data);
        setSymptomsList(response.data.symptoms);
      } catch (err) {
        setError("Failed to fetch symptoms list.");
      }
    };
    fetchSymptoms();
  }, []);

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post(
        "https://disease-detection2.onrender.com/predict",
        {
          symptoms: selectedSymptoms.map((s) => s.value),
        }
      );

      setPrediction(response.data);
    } catch (err) {
      setError("Error predicting disease. Try again.");
    }

    setLoading(false);
  };
  const formattedSymptoms = symptomsList.map((symptom) => ({
    label: String(symptom).replace("_", " ").toUpperCase(), // Convert to readable text
    value: symptom,
  }));

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-lg p-6 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-center text-xl font-bold mb-4">
          Disease Prediction
        </h1>

        <div className="flex flex-col gap-4">
          {symptomsList.length === 0 ? (
            <p className="text-gray-400">Loading symptoms...</p>
          ) : (
            <Select
              options={formattedSymptoms} // Always use full list
              isMulti
              onChange={(selectedOptions) =>
                setSelectedSymptoms(selectedOptions as Symptom[])
              }
              value={selectedSymptoms}
              placeholder="Select symptoms..."
              styles={customStyles}
              className="shad-input"
            />
          )}

          <button
            onClick={handlePredict}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>

          {error && <p className="text-center text-red-400">{error}</p>}

          {prediction && (
            <div className="mt-4 p-4 rounded-lg bg-gray-700 shadow-md">
              <h2 className="text-center text-lg font-bold text-green-400">
                Predicted Disease: {prediction.predicted_disease}
              </h2>
              <h3 className="text-md mt-2 text-center">
                Other Possible Diseases:
              </h3>
              <ul className="list-disc pl-5 mt-2">
                {prediction.top_3_predictions.map((item, index) => (
                  <li key={index} className="text-white">
                    {item.disease} -{" "}
                    <span className="text-green-300 font-bold">
                      {item.probability}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictDisease;
