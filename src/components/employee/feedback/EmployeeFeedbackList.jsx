import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
    Rating,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react'
import { decodedToken } from '../../../Context/auth';
import { BookingUrl } from '../../../constants/constants';
import axios from 'axios';


const TABLE_HEAD = ["Booking Id", "Customer", "Product", "Service","Rating","Titile","Content"];

function EmployeeFeedbackList() {
    const token = decodedToken('employeeJwt')
    const [feedback, setFeedback] = useState([])

    const fetchFeedbackData = () => {
        axios.get(`${BookingUrl}/list-feedback/` + token.employee)
            .then(response => {
                setFeedback(response.data)
                console.log('result feedback:   ', response.data);
            })
            .catch(err => {
                console.log('error: ', err);
                toast.error(err.response.data)
            })
    }
    useEffect(() => {
        fetchFeedbackData();
    },[]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Feedback List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all your feedback
                        </Typography>
                    </div>

                </div>

            </CardHeader>
            <CardBody className="overflow-hidden px-5 ">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.map((feedback, index) => {
                            const isLast = index === feedback.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={feedback.id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {feedback.booking.booking_id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            {feedback.user?.profile_image ?
                                                <Avatar src={feedback.user.profile_image} alt='no image' size="sm" />
                                                :
                                                <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />

                                            }
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {feedback.user.first_name}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {feedback.user.email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {feedback.booking.booked_product.product_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {feedback.booking.booked_service.service_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                      
                                       
                                        <Rating value={feedback.rating} readonly />
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {feedback.titile}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {feedback.content}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        },
                        )}
                    </tbody>
                </table>
            </CardBody>

        </Card>
    )
}

export default EmployeeFeedbackList