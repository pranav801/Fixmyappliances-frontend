import React, { useEffect, useState } from 'react'
import { decodedToken } from '../../../Context/auth'
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import PasswordChangeModal from './PasswordChangeModal';
import { EmployeeUrl } from '../../../constants/constants';

function EmployeeProfileLayout() {
    const token = decodedToken('employeeJwt')

    const [empData, setEmpData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedEmpData, setUpdatedEmpData] = useState({});

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const fetchEmpData = () => {
        axios
            .get(`${EmployeeUrl}/employeeDetail/` + token.id)
            .then((response) => {
                console.log('empData: ', response.data);
                setEmpData(response.data);
            })
            .catch((err) => {
                console.log('error: ', err);
                toast.error(err.response.data);
            });
    };


    useEffect(() => {open
        fetchEmpData();
    }, [token.id]);

    const handleEditClick = () => {
        setIsEditMode(true);
        setUpdatedEmpData({ ...empData });
    };

    const handleSaveClick = () => {
        axios
            .patch(`${EmployeeUrl}/profile-edit/` + token.id, updatedEmpData)
            .then((response) => {
                setIsEditMode(false);
                setEmpData(response.data);
                console.log(response.data);
                fetchEmpData()


            })

            .catch((err) => {
                console.log('error: ', err);
                toast.error(err.response.data);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmpData({
            ...updatedEmpData,
            [name]: value,
        });
    };
    return (
        <div>
            <div className="p-4 font-bold">
                <h1>Profile Info</h1>
            </div>
            {empData && (
                <div className="px-6 pb-10">
                    <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                        <h4>First name</h4>
                        {isEditMode ? (
                            <input
                                type="text"
                                name="first_name"
                                value={updatedEmpData.first_name?updatopenedEmpData.first_name:empData.employee?.first_name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{empData.employee?.first_name}</h4>
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
                                value={updatedEmpData.employee.last_name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{empData.employee?.last_name}</h4>
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
                                value={empData.employee.email}

                            />
                        ) : (
                            <h4>{empData.employee?.email}</h4>
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
                                value={updatedEmpData.employee.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <h4>{empData.employee?.phone}</h4>
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
            <div className='p-5'>
                <h1 className='text-light-blue-800 cursor-pointer underline' onClick={handleOpen} >Change password</h1>
                <PasswordChangeModal open={open} handleOpen={handleOpen} userid={token.id}/>

            </div>
            <div className="p-4 font-bold">
                <h1>Professional Info</h1>
            </div>
            <div className="px-6 pb-10">
                <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                    <h4>Service Category</h4>
                    <h4>{empData.category?.category_name}</h4>
                </div>
            </div>
            <div className="px-6 pb-10">
                <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                    <h4>Service Products</h4>
                    {empData.product?.map((prod) => (
                        <h4 key={prod.id}>{prod.product_name}</h4>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default EmployeeProfileLayout