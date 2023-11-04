import React from 'react'
import ProfileLayout from '../../components/user/profile/ProfileLayout'
import UserProfileImage from '../../components/user/profile/UserProfileImage'
import UserNavBar from '../../components/user/home/UserNavBar'


function ProfilePage() {
    return (
        <>
            <div className=''>
                <UserNavBar />
            </div>
            <main className="mt-80 w-full ">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64 border-2 border-gray-200">
                        <div className="px-6 ">
                            <div className="flex justify-center ">
                                <div className="w-full px-10 flex justify-start  " >
                                    <div className="relative w-40 h-40">
                                        <UserProfileImage />
                                    </div>
                                </div>
                            </div>
                            <ProfileLayout />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfilePage