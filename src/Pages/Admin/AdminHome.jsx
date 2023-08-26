import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function AdminHome() {
    const navigate = useNavigate()

    return (
        <div>
            <Helmet>
                <title>Admin Dashboard | Fixmyappliances</title>
            </Helmet>


            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl">Admin Dashboard</h1>
            </div>
        </div>
    )
}

export default AdminHome