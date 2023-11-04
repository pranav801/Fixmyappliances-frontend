import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Rating,
} from "@material-tailwind/react";
import axios from "axios";

function ReviewRatingCard({ productID }) {
    // const [product_id, setProductID] = useState(productID);
    const [reviews, setReviews] = useState([]);
    console.log(productID);

    useEffect(() => {
        axios.get(`http://localhost:8000/booking/list-review-product/${productID}/`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, [productID]);

    return (
        <div className='flex max-w-screen-2xl overflow-x-scroll  flex-row gap-5' >
            {reviews.map((review) => {
                return (

                    <Card className="w-[15rem] overflow-hidden" key={review.id} >
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                        >

                        </CardHeader>

                        <CardBody  >
                            <Typography variant="h6" color="blue-gray">
                                {review.heading}
                            </Typography>
                            <Rating value={review.rating} readonly />
                            <Typography variant="small" color="gray" className="mt-3 font-thin"  >
                                {review.content}
                            </Typography>
                        </CardBody>

                        <CardFooter className="flex items-center justify-between -mt-5">
                            <div className="flex items-center ">
                                <Tooltip content={review.user.first_name}>
                                    <Avatar
                                        size="sm"
                                        variant="circular"
                                        alt="natali craig"
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                        className="border-2 border-white hover:z-10"
                                    />
                                </Tooltip>
                                <Typography>{review.user.first_name}</Typography>
                            </div>
                            <Typography className="font-thin" >{review.date}</Typography>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>

    );
}

export default ReviewRatingCard

