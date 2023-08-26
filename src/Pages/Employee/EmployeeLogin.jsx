import React from 'react'
import { Input, Button } from "@material-tailwind/react";
import image from '../../images/Untitled.png'
import { employeeAxiosInstance } from '../../utils/axiosUtils';

const adminLogin = (email) => {
    return employeeAxiosInstance.post("register/", email, {
      withCredentials: true,
    }).then((response)=>{
        console.log(response.data);
    })
  };

function EmployeeLogin() {
    const [email, setEmail] = React.useState("");
    const onChange = ({ target }) => setEmail(target.value);

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
                        onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={email ? "gray" : "blue-gray"}
                        disabled={!email}
                        className="!absolute right-1 top-1 rounded"
                        onClick={()=>adminLogin({email})}
                    >
                        Send
                    </Button>
                </div>

                <h2 className='text-2xl font-bold text-gray-500 pt-96 ms-70'>Change your life with FixMyAppliences ❤️</h2>

            </div>
            <div className="bg-white flex flex-col justify-center items-center md:w-1/2">

                <img src={image} alt="Company Logo" className="w-96 h-96 object-contain mb-4" />

            </div>
        </div>

    )
}

export default EmployeeLogin