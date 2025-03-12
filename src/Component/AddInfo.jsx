import { useState } from "react";
import React from "react";

const AddInfo = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    disease: "",
    symptoms: [],
    medicines: [{ name: "", dose: "" }],
  });

  // Handle input change for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding new symptom
  const handleSymptomAdd = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, e.target.value],
      });
      e.target.value = ""; // Clear input field
    }
  };

  // Handle removing a symptom
  const removeSymptom = (index) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter((_, i) => i !== index),
    });
  };

  // Handle medicine name and dose changes
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][field] = value;
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  // Add new medicine input
  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: "", dose: "" }],
    });
  };

  // Remove medicine input
  const removeMedicine = (index) => {
    setFormData({
      ...formData,
      medicines: formData.medicines.filter((_, i) => i !== index),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Medical Consultation Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date and Time Inputs */}
        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Disease Input */}
        <div>
          <label className="block text-gray-700 font-medium">Disease</label>
          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter diagnosed disease"
          />
        </div>

        {/* Symptoms Array Input */}
        <div>
          <label className="block text-gray-700 font-medium">Symptoms</label>
          <input
            type="text"
            placeholder="Enter symptom and press Enter"
            onKeyDown={handleSymptomAdd}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap mt-2">
            {formData.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full mr-2 mt-2 flex items-center"
              >
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ✖
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Medicines and Dose Inputs */}
        <div>
          <label className="block text-gray-700 font-medium">Medicines Prescribed</label>
          {formData.medicines.map((medicine, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={medicine.name}
                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                placeholder="Medicine Name"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={medicine.dose}
                onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                placeholder="Dosage (e.g., 2x/day)"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMedicine}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
          >
            + Add Medicine
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInfo;
