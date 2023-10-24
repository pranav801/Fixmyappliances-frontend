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
import UsersList from './Pages/Admin/UsersList'
import Category from './Pages/Admin/Category'
import ProductPage from './Pages/Admin/ProductPage'
import ServicePage from './Pages/Admin/ServicePage'
import EmployeeFormPage from './Pages/Employee/EmployeeFormPage'
import EmployeeReqListPage from './Pages/Admin/EmployeeReqListPage'
import EmployeeSignIn from './components/employee/EmployeeSignIn'
import ProductList from './Pages/User/ProductList'
import ProductDetailPage from './Pages/User/ProductDetailPage'
import ListEmployee from './components/user/home/booking/ListEmployee'
import PaymentSucess from './components/user/home/booking/PaymentSucess'
import ProfilePage from './Pages/User/ProfilePage'
import BookingListPage from './Pages/User/BookingListPage'
import MessagePage from './Pages/User/MessagePage'
import EmpBookingListPage from './Pages/Employee/booking/EmpBookingListPage'
import AdminBookingListPage from './Pages/Admin/AdminBookingListPage'
import EmployeeInbox from './Pages/Employee/EmployeeInbox'


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

          <Route path='/products/:productCategory/' element={<ProductList/>} />  
          <Route path='/products/details/:productService/' element={<ProductDetailPage/>} />      

          <Route path='admin/login' element={<AdminLogin />} />
          <Route path='admin/home' element={<AdminHome />} />
          <Route path='admin/userlist' element={<UsersList />} />

          <Route path='admin/employeerequests' element={<EmployeeReqListPage />} />

          <Route path='admin/categorymanagement' element={<Category />} />
          <Route path='admin/productmanagement' element={<ProductPage />} />
          <Route path='admin/servicemanagement' element={<ServicePage/>} />
          <Route path='admin/bookingmanagement' element={<AdminBookingListPage/>} />
          
          <Route path='employee/login' element={<EmployeeLogin />} />
          <Route path='employee/home' element={<EmployeeHome />} />
          <Route path='employee/form' element={<EmployeeFormPage />} />
          <Route path='employee/signin' element={<EmployeeSignIn/>} />
          <Route path='employee/bookinglist' element={<EmpBookingListPage/>} />
          <Route path='/employee/inbox/' element={<EmployeeInbox/>} />

          <Route path='service/booking/listemployee/:serviceId' element={<ListEmployee/>} />
          <Route path='service/payment/' element={<PaymentSucess/>} />

          <Route path='userprofile/' element={<ProfilePage/>} />
          <Route path='bookings/' element={<BookingListPage/>} />
          <Route path='messages/' element={<MessagePage/>} />
          <Route path='messaging/' element={<MessagePage/>} />

          
          
          
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>


    </div>
  )
}

export default App