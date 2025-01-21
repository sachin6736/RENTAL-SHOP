
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<User/>}/>
    <Route path='/getusers' element={<UserList/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
