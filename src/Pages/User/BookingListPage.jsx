import React from 'react'
import UserNavBar from '../../components/user/home/UserNavBar'
import BookingList from '../../components/user/booking/BookingList'

function BookingListPage() {
  return (
    <div>
        <UserNavBar/>
        <div className='px-14 '>

        <BookingList/>
        </div>
    </div>
  )
}

export default BookingListPage;