import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin';
import SidebarAdmin from '../../components/admin/home/SidebarAdmin';
import ReviewList from '../../components/admin/review/ReviewList';



function ReviewListPage() {
  return (
    <div>
            <Helmet>
                <title>Admin ReviewManagement | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 px-4 mt-24 overflow-y-auto'>
                       <ReviewList/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ReviewListPage;

