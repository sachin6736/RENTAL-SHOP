import React, { useState, useEffect } from 'react'
import Users from './UserList'
import Tools from './ToolsList'
import Orders from './Orders'
import RentalForm from './RentalForm'

// import '../App.css'

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard')

  // Check for incoming state when component mounts
  useEffect(() => {
    const location = window.history.state // Accessing window history state
    if (location && location.activeComponent) {
      setActiveComponent(location.activeComponent) // Set active component based on navigation state
    }
  }, [])

  return (
    <div className='dashboard'>
      <h1 className='bg-blue-800 w-full py-4 text-center shadow-md'>
        Dashboard
      </h1>
      <div className='contents'>
        <div className='sidebar'>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Dashboard'
                ? 'bg-blue-100 text-black rounded-md'
                : ''
            }`}
            onClick={() => setActiveComponent('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Users'
                ? 'bg-blue-100 text-black rounded-md'
                : ''
            }`}
            onClick={() => setActiveComponent('Users')}
          >
            User List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Tools'
                ? 'bg-blue-100 text-black rounded-md'
                : ''
            }`}
            onClick={() => setActiveComponent('Tools')}
          >
            Tools List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Orders'
                ? 'bg-blue-100 text-black rounded-md'
                : ''
            }`}
            onClick={() => setActiveComponent('Orders')}
          >
            Order List
          </div>
        </div>
        <div className='details max-w-6xl mx-auto p-4 overflow-hidden'>
          {/* <div className='p-4'> */}
          {activeComponent === 'Dashboard' && <RentalForm />}
          {activeComponent === 'Users' && <Users />}
          {activeComponent === 'Tools' && <Tools />}
          {activeComponent === 'Orders' && <Orders />}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
