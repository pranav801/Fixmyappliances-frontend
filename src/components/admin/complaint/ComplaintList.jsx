import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,

} from "@material-tailwind/react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BookingUrl } from '../../../constants/constants';


function ComplaintList() {
    const TABLE_HEAD = ["Booking Id", "Customer", "Email", "Phone", "Subject", "Content", "Status"];

    const [complaint, setComplaint] = useState([]);

    

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(`${BookingUrl}/complaint-list-admin/`);
                setComplaint(response.data);
            } catch (error) {
                console.error('Error fetching complaint:', error);
            }
        };

        fetchComplaint();
    }, []);


    const handleStatusChange = (e, bookingId) => {
        const selectedStatus = e.target.value;

        axios.patch(`${BookingUrl}/update-complaint-status/${bookingId}/`, {
            status: selectedStatus
        })
            .then(response => {
                toast.success('Status updated:', response.data)
                // fetchComplaint()
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
                            Complaint list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all complaints
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
                        {complaint.map((complaint) => (
                            <tr key={complaint.id}>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {complaint.booking_id}
                                    </Typography>
                                </td>
                                <td className='p-4'>
                                    <div className="flex items-center gap-3">
                                        {complaint.user?.profile_image ?
                                            <Avatar src={complaint.user.profile_image} alt='no image' size="sm" />
                                            :
                                            <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />

                                        }
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {complaint.user.first_name} {complaint.user.last_name}
                                            </Typography>

                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray">
                                        {complaint.user.email}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {complaint.user.phone}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {complaint.subject}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {complaint.content}
                                    </Typography>
                                </td>
                                <td className='p-4'>
                                    <select
                                        id="tasks"
                                        className="border cursor-pointer border-black rounded-md"
                                        onChange={(e) => handleStatusChange(e, complaint.booking_id)}
                                        value={complaint.status}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="solved">Solved</option>
                                    </select>
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

export default ComplaintList;

