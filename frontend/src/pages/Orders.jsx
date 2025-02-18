import React, { useState, useEffect } from 'react'
import axios from "axios"
import OrderUpdate from './OrderUpdate'
import { useNavigate } from 'react-router-dom'

const OrderList = () => {

  const [orders, setOrders] = useState([])
  useEffect(()=>{
    const fetchRental = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rental/getrental")
        console.log("API Response", response.data)
        setOrders(response.data)
      } catch (error) {
        console.log("Error fetching data", error)
      }
    }

    fetchRental()
  }, [])


  
  
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleStatusChange = (id, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    )
  }

  const navigate = useNavigate()
  // const handleClick = () => navigate('/OrderUpdate')


  const handleclick = order => {
    setSelectedOrder(order)
    navigate(`/OrderUpdate/${order._id}`, {state: {order}})
  }

  return (
    <div className='w-full h-full flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200'>
      <div className='w-3/4 mt-6 p-4 bg-white shadow-lg rounded-lg'>
        <table className='w-full border-collapse'>
          {/* Table Header */}
          <thead>
            <tr className='bg-blue-600 text-white text-left'>
              <th className='p-3 w-1/6'>Order ID</th>
              <th className='p-3 w-1/3'>Customer</th>
              <th className='p-3 w-1/4'>Total Price (₹)</th>
              <th className='p-3 w-1/4'>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`text-gray-700 text-left ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
                onClick={() => handleclick(order)}
              >
                <td className='p-3 border'>{order._id}</td>
                <td className='p-3 border'>{order.user.name}</td>
                <td className='p-3 border'>₹{order.amount}</td>
                <td className='p-3 border'>
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order.id, e.target.value)}
                    className='p-2 border rounded-md bg-white focus:outline-none'
                  >
                    <option value='Pending'>Pending</option>
                    <option value='Processing'>Processing</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && <OrderUpdate order = {selectedOrder}/>}
            
    </div>
  )
}

export default OrderList
