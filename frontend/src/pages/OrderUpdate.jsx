import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Orders from './Orders'

const OrderForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order || {
    id: '',
    customer: '',
    phone: '',
    items: [],
    date: '',
    total: 0,
    status: '',
    note: ''
  }

  const [updatedOrder, setUpdatedOrder] = useState(() => ({
    id: order._id || '',
    customer: order.user?.name || 'Unknown',
    phone: order.user?.phone || 'Unknown',
    items: Array.isArray(order.tools) ? order.tools.map(tool => tool.name) : [],
    date: order.rentedAt || '',
    total: order.amount || 0,
    discount: order.discount || 0,
    status: order.status || '',
    note: order.note || ''
  }))

  const totalAmount = updatedOrder.total - (updatedOrder.discount || 0)

  const handleChange = e => {
    e.preventDefault()
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    console.log('updating orderid: ', updatedOrder.id)
    try {
      const response = await axios.put(
        `http://localhost:3000/rental/update/${updatedOrder.id}`,
        {
          status: updatedOrder.status,
          discount: updatedOrder.discount,
          amount: totalAmount,
          note: updatedOrder.note
        }
      )

      console.log('Order updated successfully', response.data)
      navigate('/', { state: { updatedOrder: response.data } })
      alert('Order Updated Successfully!')
    } catch (error) {
      console.error(
        'Error updating order:',
        error.response ? error.response.data : error.message
      )
    }
  }

  console.log(updatedOrder)

  return (
    <div className='w-1/2 h-auto mx-auto bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
        Order Details
      </h2>

      <div className=''>
        <div>
          <label className='text-gray-600 text-sm'>Order ID:</label>
          <input
            type='text'
            value={updatedOrder.id}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Customer Name:</label>
          <input
            type='text'
            value={updatedOrder.customer}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Phone:</label>
          <input
            type='text'
            value={updatedOrder.phone}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Items:</label>

          <ul className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'>
            {order?.tools?.map(tool => (
              <p key={tool._id}>
                Tool: {tool.toolId.name} | Count: {tool.count}
              </p>
            ))}
          </ul>
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Date:</label>
          <input
            type='text'
            value={updatedOrder.date}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Status:</label>
          <select
            name='status'
            value={updatedOrder.status}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-white'
          >
            <option value='rented'>Rented</option>
            <option value='returned'>Returned</option>
            <option value='missing'>Missing</option>
          </select>
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Amount (₹):</label>
          <input
            type='text'
            value={updatedOrder.total}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Discount (₹):</label>
          <input
            type='number'
            name='discount'
            value={updatedOrder.discount}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-white'
            min='0'
            max={order.total}
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm font-semibold'>
            Total Amount (₹):
          </label>
          <input
            type='text'
            value={totalAmount}
            readOnly
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed font-bold'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm font-semibold'>Note :</label>
          <input
            type='text'
            value={updatedOrder.note}
            onChange={handleChange}
            name='note'
            className='w-full p-2 border rounded-md bg-white'
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-2'
        >
          Submit Order
        </button>
      </div>
    </div>
  )
}

export default OrderForm
