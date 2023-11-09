import React, { useEffect, useState } from 'react';
import { decodedToken } from '../../../Context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { BaseUrl } from '../../../constants/constants';

function ProfileLayout() {
    const token = decodedToken('userJwt');
    const [userData, setUserData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({});


    const fetchUserData = () => {
        axios.get(`${BaseUrl}/api/user-profile-detail/` + token.id)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => {
                console.log('error: ', err);
                toast.error(err.response.data);
            });
    };


    useEffect(() => {
        fetchUserData();
    }, [token.id]);

    const handleEditClick = () => {
        setIsEditMode(true);
        setUpdatedUserData({ ...userData });
    };

    const handleSaveClick = () => {
        axios
            .patch(`${BaseUrl}/api/users-profile-update/` + token.id, updatedUserData)
            .then((response) => {
                setIsEditMode(false);
                setUserData(response.data);
                fetchUserData()


            })

            .catch((err) => {
                console.log('error: ', err);
                toast.error(err.response.data);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({
            ...updatedUserData,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="p-4 font-bold">
                <h1>Profile Info</h1>
            </div>
            {userData && (
                <div className="px-6 pb-10">
                    <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>First name</h4>
                        {isEditMode ? (
                            <input
                                type="text"
                                name="first_name"
                                value={updatedUserData.first_name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{userData.first_name}</h4>
                        )}
                        {isEditMode ? null : (
                            <span className="text-indigo-600 cursor-pointer" onClick={handleEditClick}>
                                Edit
                            </span>
                        )}
                    </div>
                    <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Last name</h4>
                        {isEditMode ? (
                            <input
                                type="text"
                                name="last_name"
                                value={updatedUserData.last_name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{userData.last_name}</h4>
                        )}
                        {isEditMode ? null : (
                            <span className="text-indigo-600 cursor-pointer" onClick={handleEditClick}>
                                Edit
                            </span>
                        )}
                    </div>
                    <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Email id</h4>
                        {isEditMode ? (
                            <input
                                type="text"
                                name="phone"
                                disabled
                                value={userData.email}

                            />
                        ) : (
                            <h4>{userData.email}</h4>
                        )}
                        {isEditMode ? null : (
                            <span className="text-indigo-600 cursor-pointer" onClick={handleEditClick} >

                            </span>
                        )}
                    </div>
                    <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>Phone number</h4>
                        {isEditMode ? (
                            <input
                                type="text"
                                name="phone"
                                value={updatedUserData.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{userData.phone}</h4>
                        )}
                        {isEditMode ? null : (
                            <span className="text-indigo-600 cursor-pointer" onClick={handleEditClick}>
                                Edit
                            </span>
                        )}
                    </div>
                    {isEditMode ? (
                        <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-end">
                            <Button onClick={handleSaveClick}>Save</Button>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default ProfileLayout;
