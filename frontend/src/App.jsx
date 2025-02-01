
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';
import RentalForm from './pages/RentalForm';
import AddTool from './pages/AddTool';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<User/>}/>
    <Route path='/getusers' element={<UserList/>}/>
    <Route path='/rentalform' element={<RentalForm/>}/>
    <Route path='/addtool' element={<AddTool/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
