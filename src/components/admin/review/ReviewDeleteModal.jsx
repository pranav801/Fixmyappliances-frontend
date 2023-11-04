import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";

function ReviewDeleteModal({ pk }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDelete = () => {
        
        axios.delete(`http://127.0.0.1:8000/booking/review-delete/${pk}/`, {
            })
            .then(response => {
                if (response.status === 204) {
                    toast('Review deleted successfully.');
                } else {
                    toast('Failed to delete the review.');
                }
                handleOpen();
            })
            .catch(error => {
                toast('An error occurred while deleting the review.');
                console.error('An error occurred:', error);
                handleOpen();
            });
    }

    return (
        <>
            <IconButton variant="text" size='lg' onClick={handleOpen}>
                <i className="fas fa-trash" />
            </IconButton>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Delete Review</DialogHeader>
                <DialogBody>
                    Confirm deleting Review
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
                    <Button variant="gradient" color="green" onClick={handleDelete}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
export default ReviewDeleteModal;
