import React, { useEffect, useState } from 'react';
import { Card, CardBody, Rating, Typography } from '@material-tailwind/react';
import axios from 'axios';

function AdminDashboard() {
    const [data, setData] = useState({
        users: 0,
        employee_count: 0,
        employee_request_count: 0,
        complaints_pending: 0,
        rating: { avg_rating: 0 },
        products_count: 0,
        service_count: 0,
        booking_count: 0,
        completed_work: 0,
        total_income: { total_booking_amount: 0 },
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/su/dashboard/') 
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const value = Math.floor(data.rating.avg_rating);
    
    return (
        <div className="flex flex-col justify-center items-center w-full mt-32 gap-10">
            <div className="flex flex-col justify-center gap-10">
                <div className="flex flex-row w-full justify-center gap-10" >

                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Users
                        </Typography>
                        <Typography variant='h1'>{data.users}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Employees
                        </Typography>
                        <Typography variant='h1'>{data.employee_count}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Employee Requests
                        </Typography>
                        <Typography variant='h1'>{data.employee_request_count}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Complaints Pending
                        </Typography>
                        <Typography variant='h1'>{data.complaints_pending}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Average Rating
                        </Typography>
                        <Typography variant='h1'>{data.rating.avg_rating}</Typography>
                        
                        <Rating value= {value} readonly />
                    </CardBody>
                </Card>
                </div>
                <div className="flex flex-row w-full justify-center gap-10" >

                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Products 
                        </Typography>
                        <Typography variant='h1'>{data.products_count}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Service 
                        </Typography>
                        <Typography variant='h1'>{data.products_count}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Bookings
                        </Typography>
                        <Typography variant='h1'>{data.booking_count}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Completed Work
                        </Typography>
                        <Typography variant='h1'>{data.completed_work}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Total Income
                        </Typography>
                        <Typography variant='h1'>{data.total_income.total_booking_amount}</Typography>
                    </CardBody>
                </Card>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
