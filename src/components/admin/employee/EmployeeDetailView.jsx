import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
function EmployeeDetailView() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const [employee,setEmployee] = useState([])
  // const fetchEmployee = (emp) => {
  //   axios.get(`http://localhost:8000/emp/employeeDetailView/${emp}/`)
  //     .then(response => {
  //       setEmployee(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(err => {
  //       toast.error(err.response.data.message);
  //     });
  // };

  // useEffect(() => {
  //   fetchEmployee();
  // }, []);

  return (
    <>
      
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Employee Details.</DialogHeader>
        <DialogBody divider>
        {employee.map((emp) => {
          <div key={emp.id}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h2 className="pb-3">Personal data</h2>
              <div className="w-72">
                <Input label="First Name" value={emp.employee.first_name} disabled/>
              </div>
            </div>
          </div>
          </div>
        })}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EmployeeDetailView;