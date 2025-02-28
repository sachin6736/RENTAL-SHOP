import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OrderUpdate from './OrderUpdate'
import { useNavigate, useLocation } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchCustomer, setSearchCustomer] = useState('')
  const [searchTool, setSearchTool] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/rental/getrental'
        )
        console.log('API Response', response.data)
        setOrders(response.data)
        setFilteredOrders(response.data)
      } catch (error) {
        console.log('Error fetching data', error)
      }
    }
    fetchRental()
  }, [location.pathname])

  // Update orders based on navigation state
  useEffect(() => {
    if (location.state?.updatedOrder) {
      const updatedOrder = location.state.updatedOrder
      const updatedOrder = location.state.updatedOrder
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      )
      )
    }
  }, [location.state])


   // Handle filtering logic
  useEffect(() => {
    let filtered = orders

    if (searchCustomer) {
      filtered = filtered.filter(order =>
        order.user.name.toLowerCase().includes(searchCustomer.toLowerCase())
      )
    }

    if (searchTool) {
      filtered = filtered.filter(order =>
        order.tools.some(tool =>
          tool.toolId.name.toLowerCase().includes(searchTool.toLowerCase())
        )
      )
    }

    if (searchDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.rentedAt).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
        return orderDate === searchDate; // Matches with input date format
      });
    }
    
    
    

    setFilteredOrders(filtered)
  }, [searchCustomer, searchTool, searchDate, orders])

  }, [location.state])

  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleclick = order => {
    setSelectedOrder(order)
    navigate(`/OrderUpdate/${order._id}`, { state: { order } })
  }

  return (
    <div className='w-full h-full flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200'>


       {/* Filters */}
       <div className='flex gap-4 my-4'>
        <input
          type='text'
          placeholder='Search Customer'
          value={searchCustomer}
          onChange={e => setSearchCustomer(e.target.value)}
          className='p-2 border border-gray-400 rounded'
        />
        <input
          type='text'
          placeholder='Search Tool'
          value={searchTool}
          onChange={e => setSearchTool(e.target.value)}
          className='p-2 border border-gray-400 rounded'
        />
        <input
          type='date'
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
          className='p-2 border border-gray-400 rounded'
        />
      </div>

      {/* Orders Table */}
      <div className='w-3/4 mt-6 p-4 bg-white shadow-lg rounded-lg overflow-y-auto scrollbar-none'>
        <table className='w-full border-collapse'>
          {/* Table Header */}
          <thead>
            <tr className='bg-blue-600 text-white text-left'>
              {/* <th className='p-3 w-1/6'>Order ID</th> */}
              <th className='p-3 w-1/3'>Customer</th>
              <th className='p-3 w-1/4'>Total Price (₹)</th>
              <th className='p-3 w-1/4'>Status</th>
              <th className='p-3 w-1/4'>Note</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id || order._id}
                className={`text-gray-700 text-left ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
                onClick={() => handleclick(order)}
              >
                {/* <td className='p-3 border'>{order._id}</td> */}
                <td className='p-3 border'>{order.user.name}</td>
                <td className='p-3 border'>₹{order.amount}</td>
                <td className='p-3 border'>{order.status}</td>
                <td className='p-3 border note-cell'>
                  {order.note || 'No note'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && <OrderUpdate order={selectedOrder} />}
      {selectedOrder && <OrderUpdate order={selectedOrder} />}
    </div>
  )
}

export default OrderList
