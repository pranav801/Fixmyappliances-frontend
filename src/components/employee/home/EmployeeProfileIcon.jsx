import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  PowerIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { getLocal } from "../../../Context/auth";
import { toast } from "react-toastify";

function EmployeeProfileIcon() {

  const localResponse = getLocal('employeeJwt');
  const navigate = useNavigate()


  const handleLogOut = () => {
    localStorage.removeItem('employeeJwt');
    toast.success('Succesfully Logged Out')
    navigate('/employee/login')
  }

  return (
    <Menu >
      <MenuHandler  >
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer w-9 h-9"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            <Link to='' >My profile</Link>
          </Typography>
        </MenuItem>
        
        <MenuItem className="flex items-center gap-2 ">
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          {localResponse ? <Typography variant="small" className="font-normal" onClick={handleLogOut}>
            Logout
          </Typography> : <Typography variant="small" className="font-normal">
            <Link to='/employee/login'>Login</Link>
          </Typography>}

        </MenuItem>
      </MenuList>
    </Menu>
  );
}


export default EmployeeProfileIcon