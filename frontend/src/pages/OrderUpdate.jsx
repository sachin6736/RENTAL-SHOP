import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || {
    _id: "",
    user: { name: "Unknown", phone: "Unknown" },
    tools: [],
    rentedAt: "",
    amount: 0,
    discount: 0,
    status: "rented",
    note: "",
  };

  const [updatedOrder, setUpdatedOrder] = useState({
    id: order._id || "",
    customer: order.user?.name || "Unknown",
    phone: order.user?.phone || "Unknown",
    tools: order.tools || [],
    rentedAt: order.rentedAt || "",
    amount: order.amount || 0,
    discount: order.discount || 0,
    status: order.status || "rented",
    note: order.note || "",
  });

  const [returnData, setReturnData] = useState({});

  const totalAmount = updatedOrder.amount - (updatedOrder.discount || 0);

  // Handle input changes for order details
  const handleChange = (e) => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
  };

  // Handle tool return quantity changes
  const handleReturnChange = (toolId, value) => {
    setReturnData((prev) => ({
      ...prev,
      [toolId]: value,
    }));
  };

  // Submit full return or partial return
  const handleSubmit = async () => {
    try {
      const isFullReturn = updatedOrder.status === "returned";
  
      const returns = updatedOrder.tools
        .map((tool) => {
          const returnedCount = isFullReturn 
            ? tool.count 
            : returnData[tool.toolId._id] 
              ? parseInt(returnData[tool.toolId._id], 10) 
              : 0;
  
          if (returnedCount > 0) {
            return { toolId: tool.toolId._id, returnedCount };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
  
      if (returns.length === 0) {
        alert("No tools selected for return.");
        return;
      }
  
      let response;
      
      if (isFullReturn) {
        response = await axios.put(
          `http://localhost:3000/rental/update/${updatedOrder.id}`,
          {
            status: updatedOrder.status,
            discount: updatedOrder.discount,
            amount: totalAmount,
            note: updatedOrder.note,
            returns,
          }
        );
      } else if (updatedOrder.status === "partially returned") {
        response = await axios.put(`http://localhost:3000/rental/partialreturn`, {
          rentalId: updatedOrder.id,
          returnedTools: returns,
        });
  
        // Adjust the total amount in frontend state
        if (response.data.totalDeduction) {
          setUpdatedOrder((prev) => ({
            ...prev,
            amount: prev.amount - response.data.totalDeduction,
          }));
        }
      } else {
        alert("Invalid status selected!");
        return;
      }
  
      navigate("/", { state: { updatedOrder: response.data } });
      alert("Order Updated Successfully!");
    } catch (error) {
      console.error("Error updating order:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-1/2 h-auto mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>

      <div>
        <label className="text-gray-600 text-sm">Order ID:</label>
        <input type="text" value={updatedOrder.id} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
      </div>

      <div>
        <label className="text-gray-600 text-sm">Customer Name:</label>
        <input type="text" value={updatedOrder.customer} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
      </div>

      <div>
        <label className="text-gray-600 text-sm">Phone:</label>
        <input type="text" value={updatedOrder.phone} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
      </div>

      <div>
        <label className="text-gray-600 text-sm">Order Items:</label>
        <ul className="w-full p-2 border rounded-md bg-gray-100">
          {updatedOrder.tools.map((tool) => (
            <li key={tool.toolId._id}>
              Tool: {tool.toolId.name} | Rented: {tool.count} | Returned: {tool.returnedCount}
            </li>
          ))}
        </ul>
      </div>

      <div>
  <label className="text-gray-600 text-sm">Return Tools:</label>
  {updatedOrder.tools
    .filter((tool) => tool.returnedCount < tool.count)
    .map((tool) => (
      <div key={tool.toolId._id} className="flex gap-2 items-center">
        <span>{tool.toolId.name}:</span>
        <input
          type="number"
          min="0"
          max={tool.count - tool.returnedCount}
          value={returnData[tool.toolId._id] || ""}
          onChange={(e) => handleReturnChange(tool.toolId._id, e.target.value)}
          className="p-2 border rounded-md w-16"
        />
        <span className="text-gray-500 ml-2">
          Price: ₹{tool.toolId.price}
        </span>
      </div>
    ))}
</div>

      <div>
        <label className="text-gray-600 text-sm">Order Date:</label>
        <input type="text" value={updatedOrder.rentedAt} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
      </div>

      <div>
        <label className="text-gray-600 text-sm">Order Status:</label>
        <select
          value={updatedOrder.status}
          onChange={(e) => setUpdatedOrder({ ...updatedOrder, status: e.target.value })}
          className="w-full p-2 border rounded-md bg-white"
        >
          <option value="rented">Rented</option>
          <option value="partially returned">Partially Returned</option>
          <option value="returned">Returned</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      <div>
        <label className="text-gray-600 text-sm">Amount (₹):</label>
        <input type="text" value={updatedOrder.amount} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
      </div>

      <div>
        <label className="text-gray-600 text-sm">Discount (₹):</label>
        <input
          type="number"
          name="discount"
          value={updatedOrder.discount}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-white"
          min="0"
          max={updatedOrder.amount}
        />
      </div>

      <div>
        <label className="text-gray-600 text-sm font-semibold">Total Amount (₹):</label>
        <input type="text" value={totalAmount} readOnly className="w-full p-2 border rounded-md bg-gray-100 font-bold" />
      </div>

      <div>
        <label className="text-gray-600 text-sm font-semibold">Note:</label>
        <input
          type="text"
          value={updatedOrder.note}
          onChange={handleChange}
          name="note"
          className="w-full p-2 border rounded-md bg-white"
        />
      </div>

      {updatedOrder.status === "returned" ? (
  <button
    onClick={handleSubmit}
    className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-2"
  >
    Confirm Full Return
  </button>
) : updatedOrder.status === "partially returned" ? (
  <button
    onClick={handleSubmit}
    className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-md mt-2"
  >
    Process Partial Return
  </button>
) : (
  <button
    onClick={handleSubmit}
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-2"
  >
    Submit Order
  </button>
)}
    </div>
  );
};

export default OrderForm;
