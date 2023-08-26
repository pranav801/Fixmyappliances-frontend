import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import UserLogin from './Pages/Authentication/UserLogin'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import UserHome from './Pages/User/UserHome'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminHome from './Pages/Admin/AdminHome'
import EmployeeLogin from './Pages/Employee/EmployeeLogin'
import EmployeeHome from './Pages/Employee/EmployeeHome'
import PageNotFound from './Pages/PageNotFound'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>

          <Route path='/' element={<UserHome />} />
          <Route path='login/' element={<UserLogin />} />
          <Route path='register/' element={<Signup />} />
          <Route path='forgot-password/' element={<ForgotPassword />} />
          <Route path='reset-password/' element={<ResetPassword />} />         

          <Route path='admin/login' element={<AdminLogin />} />
          <Route path='admin/home' element={<AdminHome />} />
          
          <Route path='employee/login' element={<EmployeeLogin />} />
          <Route path='employee/home' element={<EmployeeHome />} />

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>


    </div>
  )
}

export default App