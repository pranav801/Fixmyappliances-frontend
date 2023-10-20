import React from 'react'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'
import { Helmet } from 'react-helmet'
import EmployeeRequestList from '../../components/admin/employee/EmployeeRequestList'


function EmployeeReqListPage() {
  return (
    <div>
            <Helmet>
                <title>Admin EmployeeRequestManagement | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 px-4 mt-24 overflow-y-auto'>
                       <EmployeeRequestList/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EmployeeReqListPage

