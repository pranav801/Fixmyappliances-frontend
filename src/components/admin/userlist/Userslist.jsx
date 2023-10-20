import React, { useState, useEffect } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,

} from "@material-tailwind/react";
import { adminManageUser, adminUserDetails } from '../../../services/adminApi'
import axios from 'axios';
import { toast } from 'react-toastify';



function Userslist() {
 

  const TABLE_HEAD = ["First name", "Last name", "Email", "Phone", "Status", "Action"];

  const [users, setUsers] = useState([])
  const [usersFound, setUsersFound] = useState(true);


  useEffect(() => {
    listUsers()
  }, [])



  const handleManageUser = (userId) => {

    adminManageUser(userId).then((res) => {
      listUsers()
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  };

  async function listUsers() {
    adminUserDetails()
      .then((res) => {
        setUsers(res.data);
        setUsersFound(res.data.length > 0);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  async function searchUser(keyword) {
    const request = await axios.get(
      `http://localhost:8000/su/adminsearchUser/?search=${keyword}`
    );
    setUsers(request.data);
    setUsersFound(request.data.length > 0);
  }


  return (
    <div>
      <Card className="h-full w-full ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all users
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row w-full md:w-72">
              <Input
                onChange={e => searchUser(e.target.value)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
              />
            </div>
          </div>
          
        </CardHeader>
        <CardBody className="">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>


              {users.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center ">
                  {usersFound ? (
                        <span className="text-xl text-gray-500">Loading...</span>
                      ) : (
                        <span className="text-2xl text-gray-800">No users found</span>
                      )}
                  </td>
                </tr>
              ) : (
                users.map(
                  (user, index) => {
                    const isLast = index === user.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={user.email}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">

                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {user.first_name}
                              </Typography>

                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">

                            <div className="flex flex-col">

                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {user.last_name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">

                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {user.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {user.phone}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={user.is_active ? "online" : "offline"}
                              color={user.is_active ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <button className='w-1/2  rounded-full' type='button' onClick={() => handleManageUser(user.id)}>
                              {user.is_active ?
                                <p className='text-white border-2 rounded-full text-center bg-gray-700 hover:bg-white hover:text-gray-700 hover:border-red-700 w-full p-1'>Block</p>
                                : <p className='text-white rounded-full text-center bg-green-900 hover:bg-white md:w-full border-2 hover:text-gray-700 hover:border-green-700 p-1'>Unblock</p>
                              }
                            </button>
                          </Typography>
                        </td>

                      </tr>
                    );
                  },
                )
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Userslist








