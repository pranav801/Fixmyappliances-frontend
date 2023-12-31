import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import AdminDashboard from '../../components/admin/dashboard/AdminDashboard'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'

function AdminHome() {
    

    return (
        <div>
            <Helmet>
                <title>Admin Dashboard | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 px-4  overflow-y-auto'>
                        <AdminDashboard />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome