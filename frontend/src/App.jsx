
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';
import Dashboard from './pages/Dashboard';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/getusers' element={<UserList/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
