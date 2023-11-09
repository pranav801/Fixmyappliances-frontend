import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { decodedToken } from '../../../Context/auth';
import { EmployeeUrl } from '../../../constants/constants';

function EmployeeDashboard() {
    const [data, setData] = useState({
        pending_booking: 0,
        completed_work: 0,
        confirmed_works: 0,
        commission: 0,
        total_work_charge: 0,
        
    });

    const token = decodedToken('employeeJwt')
    console.log('emp',token.employee);
    useEffect(() => {
        axios.get(`${EmployeeUrl}/employee-dashboard/${token.employee}`) 
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full  gap-10">
            <div className="flex flex-col justify-center gap-10">
                <div className="flex flex-row w-full justify-center gap-10" >

                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Pending Booking
                        </Typography>
                        <Typography variant='h1'>{data.pending_booking}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Confirmed work
                        </Typography>
                        <Typography variant='h1'>{data.confirmed_works}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Completed work
                        </Typography>
                        <Typography variant='h1'>{data.completed_work}</Typography>
                    </CardBody>
                </Card>
               
                </div>
                <div className="flex flex-row w-full justify-center gap-10" >

                <Card className="mt-6 w-64">
                    <CardBody className='ps-20'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Total work charge 
                        </Typography>
                        <Typography variant='h1'>{data.total_work_charge}</Typography>
                    </CardBody>
                </Card>
                <Card className="mt-6 w-64">
                    <CardBody >
                        <Typography variant="h5" color="blue-gray" className="mb-2 ms-20">
                            Bonus 
                        </Typography>
                        <Typography variant='h1' className='ms-20'>{data.commission}</Typography>
                        <Typography className='text-xs' >*You'll receive a 5% bonus on work charges over ₹ 10,000.</Typography>
                    </CardBody>
                </Card>
               
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;



