// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const Dashboard = () => {
//   const [prescriptions, setPrescriptions] = useState<string[]>([]);
//   const [reports, setReports] = useState<string[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadType, setUploadType] = useState("prescription");
//   const [message, setMessage] = useState("");
//   const router = useRouter();
//   const userId =
//     typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   useEffect(() => {
//     if (!userId) {
//       router.push("/patients/upload-documents/login");
//       return;
//     }
//     fetchRecords();
//   }, [userId]);

//   const fetchRecords = async () => {
//     try {
//       const response = await axios.get(
//         `https://record-keeping-ruby.vercel.app/api/records/${userId}`
//       );
//       setPrescriptions(response.data.prescriptions);
//       setReports(response.data.reports);
//     } catch (error) {
//       setMessage("Error fetching records.");
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("userId", userId!);
//     formData.append("type", uploadType);

//     try {
//       const response = await axios.post(
//         "https://record-keeping-ruby.vercel.app/api/upload",
//         formData
//       );
//       setMessage(response.data.message);
//       fetchRecords(); // Refresh records after upload
//     } catch (error) {
//       setMessage("Error uploading file.");
//     }
//   };

//   return (
//     <div className="flex-center min-h-screen bg-dark-900 text-light-200 px-4">
//       <div className="sub-container w-full max-w-md p-6 rounded-xl bg-dark-800 shadow-lg">
//         <h1 className="header text-center">Dashboard</h1>

//         <div className="text-center my-4">
//           <h2 className="text-lg font-semibold">Your Prescriptions</h2>
//           {prescriptions.map((url, index) => (
//             <p key={index}>
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 View Prescription {index + 1}
//               </a>
//             </p>
//           ))}

//           <h2 className="text-lg font-semibold mt-4">Your Reports</h2>
//           {reports.map((url, index) => (
//             <p key={index}>
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400"
//               >
//                 View Report {index + 1}
//               </a>
//             </p>
//           ))}
//         </div>

//         <div className="flex flex-col gap-4">
//           <select
//             value={uploadType}
//             onChange={(e) => setUploadType(e.target.value)}
//             className="shad-input"
//           >
//             <option value="prescriptions">Upload Prescription</option>
//             <option value="reports">Upload Report</option>
//           </select>

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="shad-input"
//           />

//           <button onClick={handleUpload} className="shad-primary-btn w-full">
//             Upload
//           </button>

//           {message && (
//             <p className="text-14-regular text-center text-green-400">
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [prescriptions, setPrescriptions] = useState<string[]>([]);
  const [reports, setReports] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadType, setUploadType] = useState("prescriptions");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) {
      router.push("/patients/upload-documents/login");
      return;
    }
    fetchRecords();
  }, [userId]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `https://record-keeping-ruby.vercel.app/api/records/${userId}`
      );
      setPrescriptions(response.data.prescriptions);
      setReports(response.data.reports);
    } catch (error) {
      setMessage("Error fetching records.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId!);
    formData.append("type", uploadType);
    formData.append("fileName", fileName || file.name);

    try {
      const response = await axios.post(
        "https://record-keeping-ruby.vercel.app/api/upload",
        formData
      );
      setMessage(response.data.message);
      fetchRecords(); // Refresh records after upload
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="flex-center min-h-screen bg-dark-900 text-light-200 px-4">
      <div className="sub-container w-full max-w-md p-6 rounded-xl bg-dark-800 shadow-lg">
        <h1 className="header text-center">Dashboard</h1>

        <div className="text-center my-4">
          <h2 className="text-lg font-semibold">Your Prescriptions</h2>
          {prescriptions.map((url, index) => (
            <p key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                View Prescription {index + 1}
              </a>
            </p>
          ))}

          <h2 className="text-lg font-semibold mt-4">Your Reports</h2>
          {reports.map((url, index) => (
            <p key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                View Report {index + 1}
              </a>
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="shad-input"
          >
            <option value="prescriptions">Upload Prescription</option>
            <option value="reports">Upload Report</option>
          </select>

          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setFileName(e.target.files?.[0]?.name || "");
            }}
            className="shad-input"
          />

          <input
            type="text"
            placeholder="Enter file name (optional)"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="shad-input"
          />

          <button onClick={handleUpload} className="shad-primary-btn w-full">
            Upload
          </button>

          {message && (
            <p className="text-14-regular text-center text-green-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
