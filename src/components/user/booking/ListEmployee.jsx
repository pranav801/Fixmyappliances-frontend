import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    Button,
    Rating,
} from "@material-tailwind/react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { decodedToken } from '../../../Context/auth';
import { BookingUrl } from '../../../constants/constants';
import UserNavBar from '../home/UserNavBar';



function ListEmployee() {
    const token = decodedToken('userJwt');
    const user = token.id;
    const [employees, setEmployees] = useState([]);
    const {serviceId} = useParams();
    console.log('serviceid',serviceId);
    useEffect(() => {
        axios.get(`${BookingUrl}/employees/available/${user}/`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });
    }, [user]);

    const handleSelect = async(employeeId) => {
        
        const bookingData = {
            'user': user,
            'employee': employeeId,
            'service': serviceId,
        }
        console.log(bookingData);
        
        axios.post(`${BookingUrl}/employees/create/`,bookingData)
          .then(response => {
            window.location.href = response.data;
            toast.success(response.data.message);
            
          })
          .catch(err => {
            console.log(err);
            toast.error(err.response.data.message);
          });
        
      };


    return (
        <div className='flex flex-col items-center '>
            <UserNavBar/>

            <h2 className='pb-10 text-2xl'>List of Employees on your location</h2>
            {employees.map((emp) => (

                <Card className="w-2/4 mb-8" key={emp.id} >
                    <List>
                        <ListItem>

                            <div className='flex  justify-evenly items-center w-full'>
                                {emp.employee.profile_image ?
                                    <ListItemPrefix>
                                        <Avatar variant="circular" alt="candice" src={'http://localhost:8000' + emp.employee.profile_image} />
                                    </ListItemPrefix>
                                    :
                                    <ListItemPrefix>
                                        <Avatar variant="circular" alt="qwe" src='https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' />
                                    </ListItemPrefix>
                                }
                                <Typography color="gray" className="font-normal ps-6">
                                    {emp.employee.first_name}
                                </Typography>
                                <Typography color="gray" className="font-normal ps-6">
                                    {emp.employee.email}
                                </Typography>
                                <Typography color="gray" className="font-normal ps-6">
                                    {emp.category.category_name}
                                </Typography>
                                
                                <div className='ps-6 '>
                                {emp.product.map((product) => (
                                    <Typography key={product.id} color="gray" className="font-normal ">
                                        {product.product_name},
                                    </Typography>
                                ))}
                                
                                </div>
                                <div className='ps-6'>
                                    <Rating value={emp.rating} readonly />
                                </div>
                                <Button className='bg-black text-white ps-6' onClick={() =>handleSelect(emp.id)} >
                                    Select
                                </Button>
                            </div>
                        </ListItem>
                    </List>
                </Card>

            ))}
            

        </div>
    );
}

export default ListEmployee;
