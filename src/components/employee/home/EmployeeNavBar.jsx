import React from 'react'
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import EmployeeProfileIcon from './EmployeeProfileIcon';
import { Link } from 'react-router-dom';


function EmployeeNavBar() {
  

  return (
      <Navbar className="fixed mx-auto bg-gray-200 max-w-full px-6 py-3 rounded-none border-0 z-20">
      <div className="flex mx-auto max-w-screen-2xl items-center justify-between text-light">
        <Link to='/employee/home' ><Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 md:text-2xl font-bold text-gray-800"
        >
         Fixmyappliances
        </Typography></Link>
        <EmployeeProfileIcon/>
        
        
      </div>
      
    </Navbar>
  )
}

export default EmployeeNavBar


