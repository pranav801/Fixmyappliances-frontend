import React, { useState } from 'react'
import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { decodedToken } from '../../../Context/auth';
import { BaseUrl } from '../../../constants/constants';

function AddressAdd({ backButton }) {

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        pincode: '',
        house_name: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        user: ''
    });
    const token = decodedToken('userJwt');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            'user': token.id
        });
    };


    const handleSave = async () => {

        await axios.post(`${BaseUrl}/api/address/`, formData)
            .then(response => {
                console.log('Address saved');
                backButton();

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };


    return (
        <>
            <div className='flex flex-col gap-5 w-[20rem]'>
                <Input
                    label="Full Name"
                    name="fullname"
                    onChange={handleChange}
                />
                <Input
                    label="Phone number"
                    name="phone"
                    onChange={handleChange}
                />
                <Input
                    label="Pincode"
                    name="pincode"
                    onChange={handleChange}
                />
                <Input
                    label="House Name"
                    name="house_name"
                    onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-5 w-[20rem]'>
                <Input
                    label="Street"
                    name="street"
                    onChange={handleChange}
                />
                <Input
                    label="Landmark"
                    name="landmark"
                    onChange={handleChange}
                />
                <Input
                    label="City"
                    name="city"
                    onChange={handleChange}
                />
                <Input
                    label="State"
                    name="state"
                    onChange={handleChange}
                />
            </div>
            <div className='flex justify-end w-full gap-5'>

                <Button variant="outlined" color="blue" onClick={backButton}>
                    Back
                </Button>

                <Button variant="outlined" color="green" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </>
    )
}

export default AddressAdd