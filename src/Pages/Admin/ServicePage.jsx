import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'
import ServiceList from '../../components/admin/service/services/ServiceList'

function ServicePage() {
  return (
    <div>
            <Helmet>
                <title>ServiceManagement | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 flex-row px-4 mt-24 overflow-y-auto'>
                        <ServiceList />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ServicePage