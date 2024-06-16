
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
 
// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
// Task create for login and register
function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
 
         </Routes>
    </Router>
    
  );
}
 
export default App;
 