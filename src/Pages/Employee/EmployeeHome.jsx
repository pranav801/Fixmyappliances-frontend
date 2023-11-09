 import React, { useEffect, useState } from 'react'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'
import EmployeeSideBar from '../../components/employee/home/EmployeeSideBar'
import EmployeeDashboard from '../../components/employee/dashboard/EmployeeDashboard'
import { decodedToken } from '../../Context/auth'
import axios from 'axios'
import PasswordChangeModal from '../../components/employee/profile/PasswordChangeModal'
import { EmployeeUrl } from '../../constants/constants'

function EmployeeHome() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const token = decodedToken('employeeJwt')

    useEffect(()=>{
        axios.get(`${EmployeeUrl}/password-check/${token.employee}`)
        .then((res) => {
            console.log('ressssult', res.data);
            if (!res.data.isChangePassword) {
                console.log('Handle Open');
                handleOpen()
            }
        })
    },[])


    return (
        <div>
            {
                open &&
                <PasswordChangeModal open={open} handleOpen={handleOpen} userid={token.id}/>
            }
            <div className='flex flex-col h-screen'>
                <EmployeeNavBar />
                <div className='flex flex-1 pt-20'>
                    <EmployeeSideBar />
                    <div className='flex-1 px-4  overflow-y-auto'>

                        {/* <h1 className="text-4xl">Employee Home</h1> */}
                        <EmployeeDashboard />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeHome
