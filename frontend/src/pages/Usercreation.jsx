import React, { useState } from "react";

export default function Usercreation() {
  const [buttonText, setButtonText] = useState("Proceed");
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    phone: "",
    aadhar: "",
    profession: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(res.status ===401){
        setButtonText('all fields necessary')
      }
      if (res.status === 201) {
        setButtonText("User Created");
      }
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      {/* Header Section */}
      <header className="bg-blue-800 w-full py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Tools Rental Shop
        </h1>
        <p className="text-sm text-blue-200">Efficient and affordable tool rentals</p>
      </header>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center mt-8 p-4 bg-white shadow-lg rounded-md border border-gray-300 max-w-md w-full">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          User Creation
        </h2>
        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="adress"
            placeholder="Enter Address"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="aadhar"
            placeholder="Enter Aadhar Number"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="profession"
            placeholder="Enter Profession"
            onChange={handleChange}
          />
          <button
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all"
            type="submit"
          >
            {buttonText}
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
