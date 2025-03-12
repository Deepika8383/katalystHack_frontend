import { useState } from "react";
import React from "react";

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    // FormData to send image to backend
    const formData = new FormData();
    formData.append("image", image);

    // Example: Send to a backend API (Replace with actual API endpoint)
    fetch("https://your-api.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => alert("Image uploaded successfully!"))
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Upload Disease Photo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded bg-white"
        />

        {preview && (
          <div className="mt-4">
            <p className="text-gray-700">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default PhotoUpload;
