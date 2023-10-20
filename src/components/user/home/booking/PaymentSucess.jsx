import React, { useEffect } from 'react'
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { Link, useParams } from 'react-router-dom';
import image from "../../../../assets/payment-success.png"
import axios from 'axios';

function PaymentSucess() {

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const booking = urlParams.get("booking");
        
        axios.patch(`http://localhost:8000/booking/payment-success/${booking}/`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    },[])
    

    return (
        <div>
            <div className="pt-20 min-h-screen bg-gray-50 ">

                <div className="flex flex-col gap-5 w-4/12 bg-white mx-auto mt-28 border rounded-xl shadow-lg items-center text-center p-6">
                    <Avatar
                        src={image}
                        variant="rounded"
                        alt="success"
                        size="xxl"
                        className="bg-blue-gray-50/50 object-contain"
                    />
                    <Typography variant="h5" color="green">
                        Payment Succesfully Completed
                    </Typography>

                    <Typography color="blue-gray">
                        Your payment for the work have been succesfully completed and the employee will contact you soon.
                    </Typography>


                    <Typography color="blue-gray">
                        Enjoy and stay connected!
                    </Typography>

                    <Typography variant="h6" color="green">
                        Thank You!
                    </Typography>
                    <Link to='/' ><Button>Continue </Button></Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSucess