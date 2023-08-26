import React from 'react'
import { Link } from 'react-router-dom'

function HomepageNav() {

    return ( 
        <div>
            <div class="bg-clr bg-opacity-70 shadow-md rounded-full border border-gray-500 w-full max-w-md mx-auto float-right me-4 mt-4">
                <div class="flex justify-between items-center  p-4">
                    <Link to='employee/login'><h1 class="text-sm font-semibold text-gray-800">Register as a Professional</h1></Link>
                    <a href="#" class="text-gray-600 hover:text-gray-800">Help</a>
                    <Link to='/login'><h1 class="text-sm text-decoration-line: underline underline-offset-2 font-semibold text-gray-800 cursor-pointer "  >Login/Register</h1></Link>
                </div>
                
            </div>


        </div>
    )
}

export default HomepageNav