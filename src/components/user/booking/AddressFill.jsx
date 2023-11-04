import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressAdd from './AddressAdd';
import AddressSelect from './AddressSelect';
import { decodedToken } from '../../../Context/auth';

function AddressFill({ open, handleOpen, serviceId }) {

    const navigate = useNavigate()
    const [selectedAddress, setSelectedAddress] = useState();

    const [action, setAction] = useState(1);
    const handleAction = (value) => setAction(action === 1 ? 0 : 1);

    const handleAddress = (address_id) => setSelectedAddress(address_id);

    const handleSubmit = async () => {
        handleOpen();
        console.log(serviceId);
        navigate(`/service/booking/listemployee/${serviceId}`)
    };

    const [addrs, setAddrs] = useState([]);

    const token = decodedToken('userJwt')
    useEffect(() => {
        const user = token.id
        console.log('token user',user);
        const fetchAddress = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/address/select/${user}`)
                console.log('user address:  ', res.data);
                setAddrs(res.data);
            } catch (error) {
                console.error('error:', error)
            }

        }
        fetchAddress();
    }, [])

    return (
        <div>
            <Dialog open={open}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Add Address Details</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer" 
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider className=''>
                    {action == 1 ?

                        <div className="flex flex-col justify-center gap-12 p-5">
                            {addrs?.map((adrs) => (
                                <AddressSelect selectAddress={handleAddress} address={adrs} />
                            ))}

                            <Button onClick={handleAction} className='w-1/4'>Add new address</Button>
                        </div>
                        :
                        <div className="flex flex-row flex-wrap justify-center gap-12 p-5">

                            <AddressAdd backButton={handleAction} />
                        </div>

                    }

                </DialogBody>
                <DialogFooter className="space-x-2">

                    <Button disabled={selectedAddress ? false : true} variant="gradient" color="green" onClick={handleSubmit}>
                        Continue
                    </Button>

                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default AddressFill;








