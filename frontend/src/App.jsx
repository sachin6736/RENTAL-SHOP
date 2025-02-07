import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Users from './pages/Usercreation'
import Dashboard from './pages/Dashboard'
import Tools from './pages/Tools'
import Users from './pages/UserList'
import Orders from './pages/Orders'
import Usercreation from './pages/Usercreation'
import RentalForm from './pages/RentalForm';
import AddTool from './pages/AddTool'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/createuser' element={<Usercreation/>}/>
        <Route path='/Users' element={<Users />} />
        <Route path='/Tools' element={<Tools />} />
        <Route path='/giverent' element={< RentalForm/>}/>
        <Route path='/addtool' element={<AddTool/>}/>
        <Route path='/Orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
