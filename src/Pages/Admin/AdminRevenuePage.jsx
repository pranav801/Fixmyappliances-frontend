import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'
import RevenueList from '../../components/admin/revenue/RevenueList'

function AdminRevenuePage() {
  return (
    <div>
        <Helmet>
                <title>RevenueManagement | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 px-4 mt-24 overflow-y-auto'>
                        <RevenueList/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AdminRevenuePage