"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!userId || !password) {
      setMessage("Enter User ID and Password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://record-keeping-ruby.vercel.app/api/auth",
        {
          userId,
          password,
        }
      );
      console.log(response);
      localStorage.setItem("userId", userId); // Store user ID
      router.push("/patients/upload-documents"); // Redirect to dashboard
    } catch (error) {
      setMessage("Invalid credentials or error occurred.");
    }
  };

  return (
    <div className="flex-center min-h-screen bg-dark-900 text-light-200 px-4">
      <div className="sub-container w-full max-w-md p-6 rounded-xl bg-dark-800 shadow-lg">
        <h1 className="header text-center">Login</h1>

        <div className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="shad-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shad-input"
          />

          <button onClick={handleLogin} className="shad-primary-btn w-full">
            Login / Register
          </button>

          {message && (
            <p className="text-14-regular text-center text-red-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
