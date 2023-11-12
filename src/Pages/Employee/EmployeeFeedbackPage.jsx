import React from 'react'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'
import EmployeeSideBar from '../../components/employee/home/EmployeeSideBar'
import EmployeeFeedbackList from '../../components/employee/feedback/EmployeeFeedbackList'

function EmployeeFeedbackPage() {
    return (
        <div>
            <div className='flex flex-col h-screen'>
                <EmployeeNavBar />
                <div className='flex flex-1 pt-20'>
                    <EmployeeSideBar />
                    <div className='flex-1 px-4  overflow-y-auto'>
                        <EmployeeFeedbackList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeFeedbackPage