import React, { useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", total: 150, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 200, status: "Processing" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      <h2 className="bg-blue-800 w-full py-4 text-center text-2xl font-bold text-white uppercase tracking-wider shadow-md">
        Order List
      </h2>
      
      {/* Table Container */}
      <div className="w-3/4 mt-6 p-4 bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3 w-1/6">Order ID</th>
              <th className="p-3 w-1/3">Customer</th>
              <th className="p-3 w-1/4">Total Price (₹)</th>
              <th className="p-3 w-1/4">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`text-gray-700 text-left ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.customer}</td>
                <td className="p-3 border">₹{order.total}</td>
                <td className="p-3 border">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="p-2 border rounded-md bg-white focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
