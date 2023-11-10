import React, { useState } from 'react'
import { Input, Button, Spinner } from "@material-tailwind/react";
import image from '../../images/Untitled.png'
import { employeeAxiosInstance } from '../../utils/axiosUtils';
import { toast } from 'react-toastify';
import EmployeeSignIn from '../../components/employee/EmployeeSignIn';


function EmployeeLogin() {
    const [email, setEmail] = React.useState("");

    const [isLoading, setIsLoading] = useState(false);

    const employeeLogin = (email) => {
        setIsLoading(true)
        employeeAxiosInstance.post("register/", email, {
            withCredentials: true,
        }).then((response) => {
            setIsLoading(false)
            toast.success(response.data.msg)
            console.log(response.data);
        }).catch((error) => {
            setIsLoading(false)
            console.log(error);
            toast.error('some error occoured')
        })
    };


    return (

        <div className="flex flex-col md:flex-row h-screen">

            <div className="bg-white-200 md:w-1/2 flex flex-col pt-52 ps-40 ">
                <h1 className="text-5xl font-bold text-gray-500">Earn More, Earn Respect Safe Ensured</h1>
                <h1 className="text-2xl font-bold text-gray-500 mb-4 mt-8">Join 500+ partners across various states in India.  </h1>

                <div className="relative flex w-full max-w-[24rem] " >
                    <Input
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={email ? "gray" : "blue-gray"}
                        disabled={!email || isLoading}
                        className="!absolute right-1 top-1 rounded"
                        onClick={() => employeeLogin({ email })}
                    > {isLoading ? <Spinner className='h-4 w-4' /> : 'Send'}

                    </Button>
                </div>
                <div>
                    <EmployeeSignIn />
                </div>
                <h2 className='text-2xl font-bold text-gray-500 pt-32 ms-70'>Change your life with FixMyAppliences ❤️</h2>

            </div>
            <div className="bg-white flex flex-col justify-center items-center md:w-1/2">

                <img src={image} alt="Company Logo" className="w-96 h-96 object-contain mb-4" />

            </div>
        </div>

    )
}

export default EmployeeLogin