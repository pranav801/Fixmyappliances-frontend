import React from 'react'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'
import AdminBookingList from '../../components/admin/booking/AdminBookingList'

function AdminBookingListPage() {
  return (
    <div>
        <div>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 flex-row px-4 mt-24 overflow-y-auto'>
                        <AdminBookingList/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminBookingListPage