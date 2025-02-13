import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const OrderForm = () => {
  const location = useLocation()
  const order = location.state?.order || {
    id: '',
    customer: '',
    phone: '',
    items: [],
    date: '',
    total: 0,
    status: ''
  }

  const [updatedOrder, setUpdatedOrder] = useState(() => ({
    id: order.id || '',
    customer: order.customer || '',
    phone: order.phone || '',
    items: Array.isArray(order.items) ? order.items : [],
    date: order.date || '',
    total: order.total || 0,
    discount: order.discount || 0,
    status: order.status || ''
  }))

  const totalAmount = updatedOrder.total - (updatedOrder.discount || 0)

  const handleChange = e => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('Updated Order:', updatedOrder)
    alert('Order Updated Successfully!')
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
            disabled
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Customer Name:</label>
          <input
            type='text'
            value={updatedOrder.customer}
            disabled
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Phone:</label>
          <input
            type='text'
            value={updatedOrder.phone}
            disabled
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Items:</label>
          <ul className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'>
            {updatedOrder.items?.length > 0 ? (
              updatedOrder.items.map((item, index) => (
                <li key={index} className='text-gray-700'>
                  {item.item} (x{item.count})
                </li>
              ))
            ) : (
              <li className='text-gray-500'>No items available</li>
            )}
          </ul>
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Date:</label>
          <input
            type='text'
            value={updatedOrder.date}
            disabled
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed'
          />
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Order Status:</label>
          <select
            name='orderStatus'
            value={updatedOrder.status}
            onChange={handleChange}
            className='w-full p-2 border rounded-md bg-white'
          >
            <option value='Pending'>Pending</option>
            <option value='Processing'>Processing</option>
            <option value='Shipped'>Shipped</option>
            <option value='Delivered'>Delivered</option>
          </select>
        </div>

        <div>
          <label className='text-gray-600 text-sm'>Amount (₹):</label>
          <input
            type='text'
            value={updatedOrder.total}
            disabled
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
            disabled
            className='w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed font-bold'
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
