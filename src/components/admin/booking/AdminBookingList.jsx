import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    Chip,

} from "@material-tailwind/react";
import axios from 'axios';
import { BookingUrl } from '../../../constants/constants';


function AdminBookingList() {
    const TABLE_HEAD = ["Booking Id","Customer", "Employee", "Address", "Product", "Service", "Service charge", "Status"];

    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${BookingUrl}/admin-booking-list/`);
                setBooking(response.data);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchBooking();
    }, []);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Booking list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all bookings
                        </Typography>
                    </div>

                </div>
            </CardHeader>
            <CardBody className=" px-0">
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
                        {booking.map((book) => (
                            <tr key={book.id}>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {book.booking_id}
                                    </Typography>
                                </td>
                                <td className='p-4'>
                                    <div className="flex items-center gap-3">
                                        {book.user?.profile_image ?
                                            <Avatar src={book.user.profile_image} alt='no image' size="sm" />
                                            :
                                            <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />

                                        }
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.user.first_name} {book.user.last_name}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {book.user.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div className="flex items-center gap-3">
                                        {book.employee?.employee?.profile_image ?
                                            <Avatar src={book.employee.employee?.profile_image} alt='no image' size="sm" />
                                            :
                                            <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />

                                        }
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.employee.employee.first_name} {book.employee.employee.last_name}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {book.employee.employee.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {book.address.house_name}, {book.address.street}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {book.address.city}, {book.address.state},Pincode: {book.address.pincode}
                                        </Typography>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray">
                                        {book.booked_product.product_name}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {book.booked_service.service_name}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {book.booking_amount}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <div className='max-w-fit'>

                                    <Chip variant="ghost" size='sm' value={book.status} />
                                    </div>
                                </td>
                            </tr>
                        ))}
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
    );
}

export default AdminBookingList;

