import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';
import Dashboard from './pages/Dashboard';
import RentalForm from './pages/RentalForm';
import AddTool from './pages/AddTool'
import ToolsList from './pages/ToolsList';
import OrderUpdate from './pages/OrderUpdate'
import Orders from './pages/Orders'

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/usercreation' element={<User/>}/>
    <Route path="/edituser/:id" element={<User />} />
    <Route path='/getusers' element={<UserList/>}/>
    <Route path='/rentalform' element={<RentalForm/>}/>
    <Route path='/addtool' element={<AddTool/>}/>
    <Route path='/toolslist' element={<ToolsList/>}/>
    <Route path='/OrderUpdate' element={<OrderUpdate/>}/>
    <Route path='/OrderUpdate/:id' element={<OrderUpdate/>}/>
    {/* <Route path='/Orders' element={<Orders/>}/> */}
  </Routes>
  </BrowserRouter>
}

export default App
