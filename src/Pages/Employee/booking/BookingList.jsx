import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Chip,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { decodedToken } from "../../../Context/auth";
import ServiceTimeModal from "./ServiceTimeModal";


const TABLE_HEAD = ["Booking Id", "Customer", "Address", "Product", "Service", "Booking Date", "Service Date", "Status", "update"];


function BookingList() {
    const token = decodedToken('employeeJwt')
    const [booking, setBooking] = useState([])
    const fetchBookingData = () => {
        axios.get('http://localhost:8000/booking/booking-list-employee/' + token.employee)
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
    }, []);

    const handleStatusChange = (e, bookingId) => {
        const selectedStatus = e.target.value;

        axios.patch(`http://localhost:8000/booking/update-booking-status/${bookingId}/`, {
            status: selectedStatus
        })
            .then(response => {
                toast.success('Status updated:', response.data)
                fetchBookingData()
                console.log('Status updated:', response.data);
            })
            .catch(error => {
                toast.error('Error updating status:', error)
                console.error('Error updating status:', error);
            });
    };


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
                                                    {book.user.first_name}
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
                                                {book.address.city}, {book.address.state}
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
                                            {book.date_of_booking}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {book.service_date ? 
                                        
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {book.service_date}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal "
                                            >
                                                {book.service_time}
                                            </Typography>
                                        </div>
                                        :
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            -
                                        </Typography>
                                    }
                                    </td>



                                    <td className={classes}>
                                        <select
                                            id="tasks"
                                            className="border cursor-pointer border-black rounded-md"
                                            onChange={(e) => handleStatusChange(e, book.id)} // Pass the booking ID
                                            value={book.status}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className={classes}>
                                        <ServiceTimeModal booking={book.id} />
                                    </td>
                                </tr>
                            );
                        },
                        )}
                    </tbody>
                </table>
            </CardBody>

        </Card>
    );
}

export default BookingList;