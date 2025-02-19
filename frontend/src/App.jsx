import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';
import Dashboard from './pages/Dashboard';
import RentalForm from './pages/RentalForm';
import AddTool from './pages/AddTool'
import ToolsList from './pages/ToolsList';

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
  </Routes>
  </BrowserRouter>
}

export default App
