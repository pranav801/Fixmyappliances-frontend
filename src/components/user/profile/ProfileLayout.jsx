import React, { useEffect, useState } from 'react'
import { decodedToken } from '../../../Context/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

function ProfileLayout() {
    const token = decodedToken('userJwt')
    console.log(token);
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchUserData = () => {
            axios.get('http://localhost:8000/api/user-profile-detail/' + token.id)
                .then(response => {
                    setUserData(response.data);
                    console.log('result userdata:   ', response.data);
                })
                .catch(err => {
                    console.log('error: ', err);
                    toast.error(err.response.data);
                });
        };

        fetchUserData();
    }, [token.id]);
    
    return (
        <div>
            <div className='p-4 font-bold' >
                <h1>Profile Info</h1>
            </div>
            {userData && (

                <div className="px-6">
                    <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>First name</h4>
                        <h4>{userData.first_name}</h4>
                        <h4 className='text-indigo-600' >Edit</h4>
                    </div>
                    <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Last name</h4>
                        <h4>{userData.last_name}</h4>
                        <h4 className='text-indigo-600' >Edit</h4>
                    </div>
                    <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Email </h4>
                        <h4>{userData.email}</h4>
                        <h4 className='text-indigo-600' >Edit</h4>
                    </div>
                    <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Phone Number</h4>
                        { userData.phone ? <h4>{userData.phone}</h4> : '----' }
                        <h4 className='text-indigo-600' >Edit</h4>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileLayout