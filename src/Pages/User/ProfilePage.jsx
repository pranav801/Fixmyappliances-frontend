import React from 'react'
import ProfileLayout from '../../components/user/profile/ProfileLayout'


function ProfilePage() {
    return (
        <>

            <main className="mt-96 w-full ">
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
                        <ProfileLayout/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfilePage