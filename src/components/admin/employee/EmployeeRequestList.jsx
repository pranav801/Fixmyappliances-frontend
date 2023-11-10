import React, { useState, useEffect } from 'react';
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
} from "@material-tailwind/react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminUrl } from '../../../constants/constants';


function EmployeeRequestList() {
  const TABLE_HEAD = ["Name", "Email", "Phone", "Pincode", "Category", "Accept", "Reject"];

  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployeeData = () => {
    axios.get(`${AdminUrl}/employeeRequest/`)
      .then(response => {
        setEmployeeData(response.data);
        
        console.log(response.data);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // const handleManageUser = (userId) => {
  //   // Implement your adminManageUser logic here
  //   // You may want to make an API call or perform other actions
  // };

  
  const handleAccept = (employeeId) => {
    axios.patch(`${AdminUrl}/employeeRequest/${employeeId}/accept/`)
      .then(response => {
        toast.success(response.data.message);
        fetchEmployeeData(); // Refresh the employee list
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };
  
  const handleReject = (employeeId) => {
    axios.patch(`${AdminUrl}/employeeRequest/${employeeId}/reject/`)
      .then(response => {
        toast.success(response.data.message);
        fetchEmployeeData(); // Refresh the employee list
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });action
  };
  


  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Employee Request list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all employee requests
              </Typography>
            </div>
            {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
              />
            </div> */}
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
              {employeeData.map((emp, index) => {
                const isLast = index === employeeData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={emp.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {emp.employee.first_name}
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
                            {emp.employee.email}
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
                            {emp.employee.phone}
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
                            {emp.pincode}
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
                          {emp.category.category_name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                    <div className="flex flex-col">
                      {emp.isVerified ? <p>Accepted</p>
                      :
                  <button className="bg-green-400 rounded-lg" onClick={() =>handleAccept(emp.id)}>Accept</button>
                      }
                </div>
                    </td>
                    <td className={classes}>
                    <div className="flex flex-col">
                      {emp.isVerified ? 
                  <button className="bg-red-400 rounded-lg" onClick={() =>handleReject(emp.id)}>Reject</button>
                  : <p>Rejected</p>
                      }
                </div>
                    </td>
                    
                  </tr>
                );
              })}
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
  );
}

export default EmployeeRequestList;
