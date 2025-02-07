import React, { useState } from 'react'
import Users from './UserList'
import Tools from './ToolsList'
import Orders from './Orders'

// import '../App.css'

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard')

  return (
    <div className='dashboard'>
      <h1 className='bg-blue-800 w-full py-4 text-center shadow-md'>
        Dashboard
      </h1>
      <div className='contents'>
        <div className='sidebar'>
          <div
            className={`p-3 cursor-pointer hover:bg-gray-300 ${
              activeComponent === 'Dashboard' ? 'bg-gray-400' : ''
            }`}
            onClick={() => setActiveComponent('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-gray-300 ${
              activeComponent === 'Users' ? 'bg-gray-400' : ''
            }`}
            onClick={() => setActiveComponent('Users')}
          >
            User List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-gray-300 ${
              activeComponent === 'Tools' ? 'bg-gray-400' : ''
            }`}
            onClick={() => setActiveComponent('Tools')}
          >
            Tools List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-gray-300 ${
              activeComponent === 'Orders' ? 'bg-gray-400' : ''
            }`}
            onClick={() => setActiveComponent('Orders')}
          >
            Order List
          </div>
        </div>
        <div className='details'>
          <div className='details p-4 w-3/4'>
            {activeComponent === 'Dashboard' && (
              <h2 className='text-xl'>Welcome to Dashboard</h2>
            )}
            {activeComponent === 'Users' && <Users />}
            {activeComponent === 'Tools' && <Tools />}
            {activeComponent === 'Orders' && <Orders />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
