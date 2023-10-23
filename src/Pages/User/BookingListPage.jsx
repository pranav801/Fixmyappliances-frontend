import React from 'react'
import UserNavBar from '../../components/user/home/UserNavBar'
import BookingList from '../../components/user/home/booking/BookingList'

function BookingListPage() {
  return (
    <div>
        <UserNavBar/>
        <div className='p-10'>

        <BookingList/>
        </div>
    </div>
  )
}

export default BookingListPage;