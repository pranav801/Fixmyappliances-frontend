import React from 'react'
import { Helmet } from 'react-helmet'
import NavbarAdmin from '../../components/admin/home/NavbarAdmin'
import SidebarAdmin from '../../components/admin/home/SidebarAdmin'
import ProductList from '../../components/admin/service/product/ProductList'

function ProductPage() {
  return (
    <div>
            <Helmet>
                <title>ProductManagement | Fixmyappliances</title>
            </Helmet>
            <div className='flex flex-col h-screen'>
                <NavbarAdmin />
                <div className='flex flex-1'>
                    <SidebarAdmin />
                    <div className='flex-1 px-4 mt-24 overflow-y-auto'>
                        <ProductList />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProductPage