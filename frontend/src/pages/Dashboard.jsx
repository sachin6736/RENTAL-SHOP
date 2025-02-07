import React, { useState } from 'react'
import Users from './UserList'
import Tools from './Tools'
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
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Dashboard' ? 'bg-blue-100 text-black rounded-md' : ''
            }`}
            onClick={() => setActiveComponent('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Users' ? 'bg-blue-100 text-black rounded-md' : ''
            }`}
            onClick={() => setActiveComponent('Users')}
          >
            User List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Tools' ? 'bg-blue-100 text-black rounded-md' : ''
            }`}
            onClick={() => setActiveComponent('Tools')}
          >
            Tools List
          </div>
          <div
            className={`p-3 cursor-pointer hover:bg-blue-200 rounded-md ${
              activeComponent === 'Orders' ? 'bg-blue-100 text-black rounded-md' : ''
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
