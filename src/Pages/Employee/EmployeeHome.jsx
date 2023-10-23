import React from 'react'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'
import EmployeeSideBar from '../../components/employee/home/EmployeeSideBar'

function EmployeeHome() {
    return (
        <div>

            <div className='flex flex-col h-screen'>
                <EmployeeNavBar />
                <div className='flex flex-1'>
                    <EmployeeSideBar />
                    <div className='flex-1 px-4  overflow-y-auto'>

                        <div className="flex justify-center items-center h-screen">
                            <h1 className="text-4xl">Employee Home</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeHome
