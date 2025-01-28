
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './pages/Usercreation';
import UserList from './pages/UserList';
import Userform from './pages/Userform'

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<User/>}/>
    <Route path='/getusers' element={<UserList/>}/>
    <Route path='/userform' element={<Userform/>} />
  </Routes>
  </BrowserRouter>
}

export default App
