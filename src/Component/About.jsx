import React from "react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">About Us</h2>
      <p className="text-lg mb-4">
        Welcome to <span className="font-semibold">MediCare</span>, a healthcare
        platform dedicated to providing top-notch medical services and expert
        consultations.
      </p>
      <p className="text-lg mb-4">
        Our mission is to bridge the gap between patients and healthcare
        providers by offering seamless online consultations, appointment
        scheduling, and trusted medical advice.
      </p>
      <p className="text-lg mb-4">
        We believe in accessible and quality healthcare for everyone. With a
        team of experienced doctors, advanced technology, and a patient-first
        approach, we aim to redefine modern medical assistance.
      </p>
      <p className="text-lg font-semibold text-blue-500">
        Your health, our priority.
      </p>
    </div>
  );
}
