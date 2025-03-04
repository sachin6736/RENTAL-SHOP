import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function RentalForm () {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tools: [{ toolId: '', count: '1' }],
    time: 1,
    amount: 0 // Set initial amount to 0
  })

  const [tools, setTools] = useState([])
  const [matchingUsers, setMatchingUsers] = useState([]) // Store the matching users
  const userListRef = useRef(null) // Ref for the matching users list
  const [error,setError]=useState("")

  const [stockError, setStockError] = useState('')

  // Fetch available tools from the backend
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('http://localhost:3000/user/gettools')
        const toolsData = await res.json()
        setTools(toolsData)
      } catch (error) {
        console.log('Error fetching tools:', error)
      }
    }

    fetchTools()
  }, [])

  // Close matching users list if clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (userListRef.current && !userListRef.current.contains(event.target)) {
        setMatchingUsers([]) // Close the list when clicked outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // Clean up the event listener
    }
  }, [])

  // Handle input changes for toolId and count
  const handleChange = (e, index) => {
    const { name, value } = e.target
    const newTools = [...formData.tools]
    newTools[index][name] = value
    setFormData({ ...formData, tools: newTools })
  }

  // Add new tool input field
  const addTool = () => {
    setFormData({
      ...formData,
      tools: [...formData.tools, { toolId: '', count: '' }]
    })
  }

  // Remove tool input field
  const removeTool = index => {
    const newTools = formData.tools.filter((_, i) => i !== index)
    setFormData({ ...formData, tools: newTools })
  }

  // Calculate the total amount based on selected tools and counts
  const calculateAmount = () => {
    let totalAmount = 0
    const rentalDays = parseInt(formData.time) || 1
    formData.tools.forEach(tool => {
      const selectedTool = tools.find(t => t._id === tool.toolId)
      if (selectedTool && tool.count > 0) {
        totalAmount += selectedTool.price * tool.count * rentalDays
      }
    })
    setFormData(prevFormData => ({ ...prevFormData, amount: totalAmount }))
  }

  // Trigger amount calculation on any change in tools or counts
  useEffect(() => {
    calculateAmount()
  }, [formData.tools, formData.time])

  // Search users by name
  const searchUsersByName = async name => {
    try {
      const res = await fetch(
        `http://localhost:3000/rental/search?name=${name}`
      )
      const data = await res.json()
      if (Array.isArray(data)) {
        setMatchingUsers(data) // Store the matching users
      } else {
        setMatchingUsers([]) // Clear matching users if not found
      }
    } catch (error) {
      console.error('Error searching users:', error)
      setMatchingUsers([])
    }
  }

  // Handle name input change
  const handleNameChange = e => {
    const name = e.target.value
    setFormData({ ...formData, name })

    if (name) {
      searchUsersByName(name) // Fetch matching users when the name changes
    } else {
      setMatchingUsers([]) // Clear matching users when name is empty
    }
  }

  // Auto-populate phone number when a user is selected
  const handleUserSelect = user => {
    console.log('Selected User:', user) // Debugging step
    setFormData({ ...formData, name: user.name, phone: user.phone })
    setMatchingUsers([]) // Clear matching users after selection
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStockError('')

    try {
      const response = await fetch('http://localhost:3000/rental/giverent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log('Responce : ', data)

      if (response.ok) {
        alert('Rental created successfully!')
        setFormData({
          name: "",
          phone: "",
          tools: [{ toolId: "", count: "" }],
          time: "",
          amount: 0,
        });
        setError("");
      }if(response.status === 400){
        setError("Error creating rental.");
        console.log("error in stck")
      }
    } catch (error) {
      console.error('Error submitting rental form:', error)
      setStockError('Error submitting rental form.')
    }
  }

  //creating new user
  const navigate = useNavigate()
  const handleClick = () => navigate('/Usercreation')

  return (
    <div className='w-full h-full flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200'>
      <div className='flex flex-col justify-center items-center mt-8 p-6 bg-white shadow-lg rounded-md border border-gray-300'>
        <h2 className='text-xl font-semibold text-blue-800 mb-4'>
          Rental Form
        </h2>

        <form
          className='flex flex-col w-full space-y-4'
          onSubmit={handleSubmit}
        >
          {/* User Info Fields */}
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='name'
            placeholder='Enter Name'
            onChange={handleNameChange} // Handle name input
            value={formData.name}
          />

          {/* Display matching users */}
          {matchingUsers.length > 0 && (
            <div
              ref={userListRef} // Assign the ref to the list container
              className='bg-gray-100 mt-2 p-2 max-h-40 overflow-y-auto border rounded'
            >
              {matchingUsers.map(user => (
                <div
                  key={user._id}
                  className='cursor-pointer hover:bg-blue-100 p-2'
                  onClick={() => handleUserSelect(user)} // Select user from list
                >
                  {`${user.name}-${user.phone}`}
                </div>
              ))}
            </div>
          )}

          {/* phone number should now be autofilled when a user is selected */}
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='phone'
            placeholder='Enter phone Number'
            value={formData.phone || ''} // Ensure phone has a default value (empty string)
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className='w-full max-h-40 overflow-y-auto'>
            {/* Dynamic Tools Input */}
            {formData.tools.map((tool, index) => (
              <div key={index} className='flex space-x-4 items-center'>
                {/* Tool Selection */}
                <select
                  name='toolId'
                  value={tool.toolId}
                  onChange={e => handleChange(e, index)}
                  className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/3'
                >
                  <option value=''>Select Tool</option>
                  {tools.map(toolItem => (
                    <option key={toolItem._id} value={toolItem._id}>
                      {toolItem.name}
                    </option>
                  ))}
                </select>
                <input
                  className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3'
                  type='number'
                  name='count'
                  value={tool.count}
                  placeholder='Enter Count'
                  onChange={e => handleChange(e, index)}
                />
                {/* Add Another Tool Button */}
                <button
                  type='button'
                  onClick={addTool}
                  className='text-blue-500 p-2 ml-2'
                >
                  +
                </button>
                {/* Remove Tool Button */}
                {formData.tools.length > 1 && (
                  <button
                    type='button'
                    onClick={() => removeTool(index)}
                    className='text-red-500 p-2'
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Time & Amount Fields */}
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='time'
            placeholder='Enter Time (e.g., 3 days)'
            value={formData.time}
            onChange={e =>
              setFormData({ ...formData, time: Number(e.target.value) })
            }
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='number'
            name='amount'
            value={formData.amount} // Display the calculated amount
            placeholder='Total Amount'
            readOnly
          />
          {stockError && (
            <p className='text-red-500 font-semibold'>{stockError}</p>
          )}

          {/* Buttons */}
          <div className='flex space-x-4'>
            <button
              className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all w-full'
              type='submit'
            >
              Rent Now
            </button>
            <button
              className='bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all w-full'
              type='button'
              onClick={handleClick}
            >
              New User
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">please check the stocks</p>}

      </div>

      {/* Footer Section */}
      <footer className='mt-8 text-center'>
        <p className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} Tools Rental Shop. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}
