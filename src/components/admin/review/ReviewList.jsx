import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    Rating,
    IconButton,

} from "@material-tailwind/react";
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewDeleteModal from './ReviewDeleteModal';
import { BookingUrl } from '../../../constants/constants';


function ReviewList() {
    const TABLE_HEAD = ["Customer", "Email", "Product", "rating", "Subject", "Content", "Delete"];

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BookingUrl}/review-list-admin/`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

   

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Reviews list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all reviews
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
                        {reviews.map((review) => (
                            <tr key={review.id}>

                                <td className='p-4'>
                                    <div className="flex items-center gap-3">
                                        {review.user?.profile_image ?
                                            <Avatar src={review.user.profile_image} alt='no image' size="sm" />
                                            :
                                            <Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg' alt='no profile' size="sm" />
                                        }
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {review.user.first_name} {review.user.last_name}
                                            </Typography>

                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray">
                                        {review.user.email}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {review.product.product_name}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Rating value={review.rating} readonly />
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {review.heading}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {review.content}
                                    </Typography>
                                </td>
                                <td className='p-4'>
                                    
                                    <ReviewDeleteModal pk={review.id} />
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

export default ReviewList;


