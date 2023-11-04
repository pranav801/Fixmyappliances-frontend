import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserPrivateRoutes from '../protectedRoutes/UserPrivateRoutes'
import ListEmployee from '../components/user/booking/ListEmployee'
import PaymentSucess from '../components/user/booking/PaymentSucess'
import ProfilePage from '../Pages/User/ProfilePage'
import BookingListPage from '../Pages/User/BookingListPage'
import MessagePage from '../Pages/User/MessagePage'
import PageNotFound from '../Pages/PageNotFound'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route element={<UserPrivateRoutes route={"/login"} />}>
                    <Route path='service/booking/listemployee/:serviceId' element={<ListEmployee />} />
                    <Route path='service/payment/' element={<PaymentSucess />} />
                    <Route path='userprofile/' element={<ProfilePage />} />
                    <Route path='bookings/' element={<BookingListPage />} />
                    <Route path='messages/' element={<MessagePage />} />
                    <Route path='messaging/' element={<MessagePage />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default UserRoutes