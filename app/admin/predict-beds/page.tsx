"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const predictions = [
  { Patient_ID: "P1", Predicted_Stay: 9 },
  { Patient_ID: "P2", Predicted_Stay: 10 },
  { Patient_ID: "P3", Predicted_Stay: 8 },
  { Patient_ID: "P4", Predicted_Stay: 8 },
  { Patient_ID: "P5", Predicted_Stay: 10 },
  { Patient_ID: "P6", Predicted_Stay: 13 },
  { Patient_ID: "P7", Predicted_Stay: 8 },
  { Patient_ID: "P8", Predicted_Stay: 9 },
  { Patient_ID: "P9", Predicted_Stay: 10 },
  { Patient_ID: "P10", Predicted_Stay: 9 },
];

export default function Predictform() {
  const [predictedStay, setPredictedStay] = useState<number | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const router = useRouter(); // Initialize router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomPrediction =
      predictions[Math.floor(Math.random() * predictions.length)];
    setPredictedStay(randomPrediction.Predicted_Stay);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
      <Card className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
        {/* Go to Dashboard Button (Top-Left) */}
        <Button
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 p-3 text-white rounded-lg"
          onClick={() => router.push("/admin/dashbored")}
        >
          Go to Dashboard
        </Button>
        {/* Beds Available (Aligned to Right) */}
        <div className="ml-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold">
          Total Beds Available Today: <span className="text-green-600">80</span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Admin Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input type="number" placeholder="Age" required className="p-3" />
          <Select>
            <SelectTrigger className="p-3">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Male</SelectItem>
              <SelectItem value="1">Female</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="p-3">
              <SelectValue placeholder="Type of Admission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">OPD</SelectItem>
              <SelectItem value="1">Emergency</SelectItem>
            </SelectContent>
          </Select>

          {/* Checkboxes */}
          {[
            "Diabetes Mellitus",
            "Hypertension",
            "Coronary Artery Disease",
            "Prior CMP",
            "Chronic Kidney Disease",
            "Raised Cardiac Enzymes",
            "Severe Anaemia",
            "Anaemia",
            "Acute Coronary Syndrome",
            "STEMI",
            "Heart Failure",
            "Acute Kidney Injury",
          ].map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={label} />
              <label htmlFor={label} className="text-gray-800">
                {label}
              </label>
            </div>
          ))}

          {/* Numeric Inputs */}
          {[
            { placeholder: "Hemoglobin (e.g., 12.5)", step: "0.1" },
            { placeholder: "Total Leukocyte Count (e.g., 8.2)", step: "0.1" },
            { placeholder: "Platelets" },
            { placeholder: "Glucose" },
            { placeholder: "Urea" },
            { placeholder: "Creatinine (e.g., 1.44)", step: "0.1" },
            { placeholder: "Ejection Fraction %" },
            { placeholder: "Lab Risk Score (e.g., 0.26)", step: "0.01" },
          ].map((input, index) => (
            <Input
              key={index}
              type="number"
              step={input.step || "1"}
              placeholder={input.placeholder}
              required
              className="p-3"
            />
          ))}

          {/* Select Fields */}
          <Select>
            <SelectTrigger className="p-3">
              <SelectValue placeholder="Day of Week" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={isWeekend}
              onChange={(checked) => setIsWeekend(checked)}
            />

            <span className="text-gray-800">Is Weekend</span>
          </div>

          <Select>
            <SelectTrigger className="p-3">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }).map((_, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {new Date(2024, index, 1).toLocaleString("en-US", {
                    month: "long",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Auto-Disabled Checkboxes */}
          {["Season Spring", "Season Summer", "Season Winter"].map(
            (season, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={season} disabled />
                <label htmlFor={season} className="text-gray-500">
                  {season} (Auto)
                </label>
              </div>
            )
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="col-span-1 md:col-span-2 bg-indigo-500 hover:bg-indigo-600 p-3 text-white rounded-lg"
          >
            Submit
          </Button>
        </form>

        {/* Prediction Result */}
        {predictedStay !== null && (
          <p className="mt-4 text-lg font-semibold text-center text-gray-800">
            Predicted Bed Stay: {predictedStay} days
          </p>
        )}
        {/* Go to Dashboard Button */}
        {/* <div className="mt-6 flex justify-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 p-3 text-white rounded-lg"
            onClick={() => router.push("/admin/dashbored")}
          >
            Go to Dashboard
          </Button>
        </div> */}
      </Card>
    </div>
  );
}
