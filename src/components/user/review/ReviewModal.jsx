import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Rating,
    Input,
    Typography,
} from "@material-tailwind/react";
import img from '../../../assets/add-review.png'
import axios from "axios";
import { toast } from "react-toastify";

const ReviewModal = ({ user, product }) => {
    const [open, setOpen] = useState(false);
    const data = {
        user,
        heading: "",
        content: "",
        rating: 0,
    }
    const [reviewData, setReviewData] = useState(data);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value,
        });
    };

    const handleSubmit = () => {

        axios.post("http://localhost:8000/booking/add-review/", { ...reviewData, product })
            .then((response) => {
                if (response.status === 201) {
                    handleOpen();
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.error("Error adding review:", error);

            });
    };

    return (
        <>
            <div onClick={handleOpen} className="cursor-pointer">
            <img src={img} className="w-16"/>
            <Typography className='' variant='h6'>
                Add your review
            </Typography>
            </div>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Add Review</DialogHeader>
                <DialogBody className="flex flex-col gap-6">
                    <Rating
                        value={reviewData.rating}
                        onChange={(value) => setReviewData({ ...reviewData, rating: value })}
                    />
                    <Input
                        label="Heading"
                        name="heading"
                        value={reviewData.heading}
                        onChange={handleInput}
                    />
                    <Input
                        label="Content"
                        name="content"
                        value={reviewData.content}
                        onChange={handleInput}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default ReviewModal;
