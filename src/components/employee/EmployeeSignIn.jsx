import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function EmployeeSignIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const [loggedIn, setLoggedIn] = useState(false); // To track login status

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        // Perform the login logic here
        // You can make an API request to your Django backend for authentication

        // Example API request using axios
        axios.post('http://localhost:8000/emp/login/', {
            email,
            password,
        })
        .then((response) => {
            if (response.status === 200) {
                setLoggedIn(true);
                console.log(response.data);

                localStorage.setItem('employeeJwt', response.data.access);
                // localStorage.setItem('refreshToken', response.data.refresh_token);
                navigate('../employee/home/')
            } else {
                setLoggedIn(false);
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            setLoggedIn(false);
        });
    };

    return (
        <div>
            <h2 className='pt-5 '>SignIn Here if you are already registered &#x1F447;</h2>

            <div className="w-72 pt-5">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    value={email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-72 pt-5">
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    value={password}
                    onChange={handleInputChange}
                />
            </div>

            <div className="w-72 pt-5">
                <button className='w-72 h-8 bg-gray-400 rounded-lg' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default EmployeeSignIn;
