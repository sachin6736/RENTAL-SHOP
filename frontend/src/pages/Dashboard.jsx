import React from 'react'
// import '../App.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className="contents">
            <div className="sidebar">
                <div className="side-dashboard">Dashboard</div>
                <div className="side-users-list">User List</div>
                <div className="side-tool-list">Tools List</div>
                <div className="side-order-list">Order List</div>
            </div>
            <div className="details">

            </div>
        </div>
    </div>
  )
}

export default Dashboard