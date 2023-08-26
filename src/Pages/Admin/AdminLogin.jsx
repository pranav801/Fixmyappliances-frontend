import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../../services/adminApi'
import isLogged from '../../Context/auth'

function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Admin Login'
        const response = isLogged('adminJwt')
        if (response && response == 'admin') {
            navigate('/admin/dashboard')
        }
    }, [navigate])



    // Email validation function
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleAdminLogin = async () => {
        if (email.trim() === '') {
            toast.error('Enter email')
        } else if (!isValidEmail(email.trim())) {
            toast.warn('Enter a valid email')
        } else if (password.trim === '') {
            toast.error('Enter your password')
        } else {
            try {
                adminLogin({ email, password }).then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem('adminJwt', JSON.stringify(res.data.token))
                        toast.success('Login succesfull')
                        navigate('/admin/home')
                    }
                }).catch((error) => {
                    toast.error(error.response.data.message)
                    if (error.response.status === 401) {
                        navigate('/login')
                    }
                })
            } catch (error) {
                toast.error('An error occured.Please try again')
            }
        }
    }
    return (
        <div>
            <Helmet>
                <title>Admin Login</title>
            </Helmet>

            <div className="flex items-center  h-screen justify-center">
                <div className="flex justify-end">
                    <div className="w-full md:w-96 p-8 border border-gray-600">
                        <form className="flex flex-col gap-4">
                            <h1 className="text-black text-3xl mb-4 font-semibold">Admin Login</h1>

                            <label htmlFor="username" className="text-black text-lg font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="px-4 py-2 border border-gray-600"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <label htmlFor="password" className="text-black text-lg font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="px-4 py-2 border border-gray-600"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />

                        

                            <div className="flex items-center justify-between">
                                <button
                                    className="flex items-center justify-center mx-auto my-5 py-2 px-4 w-40 bg-gray border border-gray-200 rounded-lg text-gray-700 font-semibold shadow-lg transform transition hover:scale-105 focus:outline-none"
                                    type="button"
                                    onClick={() => {
                                        handleAdminLogin()
                                    }}
                                >login
                                </button>
                                
                            </div>

                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
