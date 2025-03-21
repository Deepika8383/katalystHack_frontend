// import { useEffect } from "react";
// import { useRouter } from "next/router";

// const Home = () => {
//   const router = useRouter();
//   const user = { name: "John Doe", isLoggedIn: true }; // Replace with actual authentication logic

//   // Redirect to login if user is not authenticated
//   useEffect(() => {
//     if (!user.isLoggedIn) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
//       <p className="text-gray-600 mb-6">Choose an option below:</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <button
//           onClick={() => router.push("/new-appointment")}
//           className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//         >
//           📅 New Appointment
//         </button>

//         <button
//           onClick={() => router.push("/upload-documents")}
//           className="p-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
//         >
//           📂 Upload Documents
//         </button>

//         <button
//           onClick={() => router.push("/check-disease")}
//           className="p-4 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
//         >
//           🩺 Check Disease
//         </button>
//       </div>

//       <button
//         onClick={() => router.push("/logout")}
//         className="mt-6 p-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Home;
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
