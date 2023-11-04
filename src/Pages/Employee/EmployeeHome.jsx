import React from 'react'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'
import EmployeeSideBar from '../../components/employee/home/EmployeeSideBar'
import EmployeeDashboard from '../../components/employee/dashboard/EmployeeDashboard'

function EmployeeHome() {
    return (
        <div>

            <div className='flex flex-col h-screen'>
                <EmployeeNavBar />
                <div className='flex flex-1 pt-20'>
                    <EmployeeSideBar />
                    <div className='flex-1 px-4  overflow-y-auto'>

                        
                            {/* <h1 className="text-4xl">Employee Home</h1> */}
                            <EmployeeDashboard/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeHome
