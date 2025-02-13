import React, { useState } from "react";

const OrderForm = ({order}) => {

    const [updatedOrder, setUpdatedOrder] = useState(order)

//   const [order, setOrder] = useState({
//     orderId: "ORD123456",
//     customerName: "John Doe",
//     phone: "9876543210",
//     orderItems: "Laptop, Mouse",
//     orderDate: "2025-02-13",
//     orderStatus: "Pending",
//     amount: 1500, // Total without discount
//     discount: 0,
//   });

  const totalAmount = order.amount - order.discount;

  const handleChange = (e) => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Order:", updatedOrder);
    alert("Order Updated Successfully!");
  };

  return (
    // <div className="w-1/2 h-auto mx-auto bg-white shadow-md rounded-lg p-6">
    //   <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>

    //   <div className="">
    //     <div>
    //       <label className="text-gray-600 text-sm">Order ID:</label>
    //       <input
    //         type="text"
    //         value={order.orderId}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Customer Name:</label>
    //       <input
    //         type="text"
    //         value={order.customerName}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Phone:</label>
    //       <input
    //         type="text"
    //         value={order.phone}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Order Items:</label>
    //       <input
    //         type="text"
    //         value={order.orderItems}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Order Date:</label>
    //       <input
    //         type="text"
    //         value={order.orderDate}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Order Status:</label>
    //       <select
    //         name="orderStatus"
    //         value={order.orderStatus}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-md bg-white"
    //       >
    //         <option value="Pending">Pending</option>
    //         <option value="Processing">Processing</option>
    //         <option value="Shipped">Shipped</option>
    //         <option value="Delivered">Delivered</option>
    //       </select>
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Amount (₹):</label>
    //       <input
    //         type="text"
    //         value={order.amount}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm">Discount (₹):</label>
    //       <input
    //         type="number"
    //         name="discount"
    //         value={order.discount}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded-md bg-white"
    //         min="0"
    //         max={order.amount}
    //       />
    //     </div>

    //     <div>
    //       <label className="text-gray-600 text-sm font-semibold">Total Amount (₹):</label>
    //       <input
    //         type="text"
    //         value={totalAmount}
    //         disabled
    //         className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed font-bold"
    //       />
    //     </div>

    //     <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-2">
    //       Submit Order
    //     </button>
    //   </div>
    // </div>
    <h1>{updatedOrder.customer}</h1>
  );
};

export default OrderForm;
