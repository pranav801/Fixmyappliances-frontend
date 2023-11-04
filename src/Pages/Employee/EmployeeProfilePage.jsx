import React from 'react'
import EmployeeProfileLayout from '../../components/employee/profile/EmployeeProfileLayout'
import EmployeeNavBar from '../../components/employee/home/EmployeeNavBar'

function EmployeeProfilePage() {
    return (
        <div>

           <div className='pb-20' >
           <EmployeeNavBar />
           </div>
            <div>

                <main className="pt-96 w-full ">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64 border-2 border-gray-200">
                            <div className="px-6 ">
                                <div className="flex justify-center ">
                                    <div className="w-full px-10 flex justify-start  " >
                                        <div className="relative w-40 h-40">
                                            <img
                                                alt="User-Dp"
                                                src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                                style={{ borderRadius: '50%' }}
                                                className="w-full h-full align-middle ring-8 ring-gray-200 object-cover bg-white absolute -mt-16 "
                                            />

                                        </div>
                                    </div>
                                </div>
                                <EmployeeProfileLayout />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default EmployeeProfilePage