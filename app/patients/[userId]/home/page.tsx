"use client";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-black-900 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-32-bold mb-6">Patient Home</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          className="bg-dark-400 hover:bg-dark-500 text-white py-3 px-6 rounded-lg text-16-semibold w-full"
          onClick={() => router.push("/patients/upload-documents/login")}
        >
          Your Records
        </button>
        <button
          className="bg-dark-400 hover:bg-dark-500 text-white py-3 px-6 rounded-lg text-16-semibold w-full"
          onClick={() => router.push("/patients/${userId}/new-appointment")}
        >
          New Appointment
        </button>
        <button
          className="bg-dark-400 hover:bg-dark-500 text-white py-3 px-6 rounded-lg text-16-semibold w-full"
          onClick={() => router.push("/patients/predict-disease")}
        >
          Predict Disease
        </button>
      </div>
    </div>
  );
};

export default Home;
