import React, { useState ,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Usercreation() {
  const { id } = useParams(); 
  console.log(id);
  
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Proceed");
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    phone: "",
    aadhar: "",
    profession: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/getuser/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);
  console.log(formData);
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:3000/user/edituser/${id}` 
      : "http://localhost:3000/user/createuser"; 

    const method = id ? "PUT" : "POST";
     
    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      

      if (res.status === 401) {
        setButtonText("All fields necessary");
      } else if (res.status === 200 || res.status === 201) {
        setButtonText(id ? "User Updated" : "User Created");
        setTimeout(() => navigate("/"), 1500); // Redirect after success
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      <header className="bg-blue-800 w-full py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Tools Rental Shop
        </h1>
        <p className="text-sm text-blue-200">Efficient and affordable tool rentals</p>
      </header>
      <div className="flex flex-col justify-center items-center mt-8 p-4 bg-white shadow-lg rounded-md border border-gray-300 max-w-md w-full">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">
        {id ? "Edit User" : "User Creation"}
      </h2>
        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="adress"
            value={formData.adress}
            placeholder="Enter Address"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Enter Phone Number"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="aadhar"
            value={formData.aadhar}
            placeholder="Enter Aadhar Number"
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="profession"
            value={formData.profession}
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
