import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Users from './pages/Usercreation'
import UserList from './pages/UserList'
import Dashboard from './pages/Dashboard'
import Tools from './pages/Tools'
import Users from './pages/UserList'
import Orders from './pages/Orders'


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Tools' element={<Tools />} />
        <Route path='/Orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
