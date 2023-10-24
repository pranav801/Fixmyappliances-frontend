import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLocal } from '../../Context/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 

function HomepageNav() {
    const token = getLocal('userJwt')
    const navigate = useNavigate()
  
    const handleLogOut = () => {
      localStorage.removeItem('userJwt');
      toast.success('Succesfully Logged Out',{position: toast.POSITION.TOP_CENTER})
      navigate('/')
      
    }

    return ( 
        <div>
            <div className="bg-re shadow-md rounded-full border border-gray-600 w-full max-w-md mx-auto float-right me-4 mt-4">
                <div className="flex justify-between items-center  p-4">
                    <Link to='employee/login'><h1 className="text-sm font-semibold text-gray-800">Register as a Professional</h1></Link>
                    <a href="#" className="text-gray-600 hover:text-gray-800">Help</a>
                    {token ? 
                    <div className=''>
                    <h1 className="text-sm text-decoration-line: underline underline-offset-2 font-semibold text-gray-800 cursor-pointer " onClick={handleLogOut} >Logout</h1>
                    </div>
                    : 
                    <Link to='/login'><h1 className="text-sm text-decoration-line: underline underline-offset-2 font-semibold text-gray-800 cursor-pointer "  >Login/Register</h1></Link>
                }
                </div>
                
            </div>


        </div>
    )
}

export default HomepageNav