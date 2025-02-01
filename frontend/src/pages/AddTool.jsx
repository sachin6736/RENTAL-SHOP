import React, { useState } from "react";

export default function AddTool() {
  const [toolData, setToolData] = useState({
    name: "",
    count: "",
    price: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setToolData({ ...toolData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/createtools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toolData),
      });

      if (res.status === 201) {
        alert("Tool added successfully!");
        setToolData({
          name: "",
          count: "",
          price: "",
        });
      } else {
        alert("Failed to add tool. Please try again.");
      }
    } catch (error) {
      console.error("Error adding tool:", error);
      alert("An error occurred while adding the tool.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      <header className="bg-blue-800 w-full py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Tools Rental Shop
        </h1>
        <p className="text-sm text-blue-200">Add Tools to the Inventory</p>
      </header>

      <div className="flex flex-col justify-center items-center mt-8 p-6 bg-white shadow-lg rounded-md border border-gray-300 max-w-md w-full">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Add Tool</h2>

        <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            value={toolData.name}
            placeholder="Tool Name"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="count"
            value={toolData.count}
            placeholder="Tool Count"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="price"
            value={toolData.price}
            placeholder="Tool price"
            onChange={handleChange}
          />

          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
            type="submit"
          >
            Add Tool
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Tools Rental Shop. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
