"use client";
// import { Select } from "@radix-ui/react-select";
import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { StylesConfig } from "react-select";

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#222",
    borderColor: "#555",
    minHeight: "45px",
    maxHeight: "150px",
    overflowY: "auto",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#444",
    borderRadius: "8px",
    padding: "3px 6px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "bold",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    ":hover": {
      backgroundColor: "#ff4d4d",
      color: "white",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#000",
    backgroundColor: state.isSelected ? "#007bff" : "#fff",
    ":hover": {
      backgroundColor: "#ddd",
    },
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-lg p-6 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-center text-xl font-bold mb-4">
          Disease Prediction
        </h1>

        <div className="flex flex-col gap-4">
          {/* <Select
            options={symptomsList.map((symptom) => ({
              value: symptom,
              label: symptom,
            }))}
            isMulti
            onChange={setSelectedSymptoms}
            placeholder="Select symptoms..."
            styles={customStyles}
            className="shad-input"
          /> */}
          <Select
            options={symptomsList.map((symptom) => ({
              value: symptom.value,
              label: symptom.label,
            }))}
            isMulti
            onChange={(newValue) => setSelectedSymptoms(newValue as Symptom[])}
            placeholder="Select symptoms..."
            styles={customStyles}
            className="shad-input"
          />

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
