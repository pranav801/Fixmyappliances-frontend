import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { decodedToken } from "../../../Context/auth";
import { useEffect, useState } from "react";
import RegisterCompliantModal from "../complaint/RegisterCompliantModal";
import { BookingUrl } from "../../../constants/constants";
import FeedBackModal from "../feedback/FeedBackModal";


const TABLE_HEAD = ["Booking Id", "Employee", "Address", "Product", "Service", "Service Charge", "Booking Date", "Service Date", "Status"];


function BookingList() {
    const token = decodedToken('userJwt')
    const [booking, setBooking] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
  
    const fetchBookingData = () => {
        axios.get(`${BookingUrl}/bookings-list/` + token.id)
            .then(response => {
                setBooking(response.data)
                console.log('result booking:   ', response.data);
            })
            .catch(err => {
                console.log('error: ', err);
                toast.error(err.response.data)
            })
    }
    useEffect(() => {
        fetchBookingData();
    },[]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Booking List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all your orders
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <RegisterCompliantModal user={token.id} />
                    </div>
                </div>

            </CardHeader>
            <CardBody className="overflow-hidden px-5 ">
                <div className="w-full overflow-x-auto">
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
                        </thead>error
                        <tbody>
                            {booking.map((book, index) => {
                                const isLast = index === book.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={book.id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.booking_id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                {book.employee.employee?.profile_image ?
                                                    <Avatar src={book.employee.employee.profile_image} alt='no image' size="sm" />
                                                    :
                                                    <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />

                                                }
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {book.employee.employee?.first_name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {book.employee.employee?.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
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
                                                    {book.address.city}, PIN: {book.address.pincode}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.booked_product.product_name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.booked_service.service_name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.booking_amount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.date_of_booking}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {book.service_date ? book.service_date : 'update soon'}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {book.service_time ? book.service_time : ''}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={book.status}
                                                        color='gray'
                                                    />
                                                </div>
                                                {book?.status == 'completed' ?
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue"
                                                            className="font-normal underline p-4 cursor-pointer"
                                                            onClick={handleOpen}
                                                        >
                                                            feedback
                                                        </Typography>
                                                        <FeedBackModal open={open} handleOpen={handleOpen} user={token.id} booking={book.id} employee={book.employee.id} />
                                                    </div>
                                                    : ''
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                            )}
                        </tbody>
                    </table>
                </div>
            </CardBody>

        </Card>
    );
}

export default BookingList;