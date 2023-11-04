import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Input } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function ServiceTimeModal({ booking }) {
    const [serviceDate, setServiceDate] = useState('');
    const [serviceTime, setServiceTime] = useState('');
    const bookingId = booking;

    const handleUpdateServiceDateTime = () => {
        if (!bookingId) {
            toast.error('Booking ID is required.');
            return;
        }

        if (!serviceDate || !serviceTime) {
            toast.error('Service Date and Time are required.');
            return;
        }

        const inputDateTime = new Date(`${serviceDate}T${serviceTime}`);
        const currentDateTime = new Date();

        if (inputDateTime <= currentDateTime) {
            toast.error('Service Date and Time must be after the current time.');
            return;
        }

        axios.patch(`http://localhost:8000/booking/update-service-date-time/${bookingId}/`, {
            service_date: serviceDate,
            service_time: serviceTime,
        })
            .then(response => {
                toast.success('Service Date and Time updated successfully.');
                setOpen(false)
                console.log('Service Date and Time updated:', response.data);
            })
            .catch(error => {
                toast.error('Error updating Service Date and Time.');
                console.error('Error updating Service Date and Time:', error);
            });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <div>

            <Button onClick={handleOpen} variant="gradient" size='sm'>
                Add time & date
            </Button>
            <Dialog open={open} handler={handleOpen} size='xs'>
                <DialogHeader>Update Service Date and Time</DialogHeader>
                <DialogBody>
                    
                    <div className="mb-4">
                        <input
                            type="date"
                            placeholder="Service Date"
                            onChange={(e) => setServiceDate(e.target.value)}
                            value={serviceDate}
                            className="border border-blue-gray-300 rounded-md w-full p-2"
                            min={currentDateTime.substring(0, 10)}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="time"
                            placeholder="Service Time"
                            onChange={(e) => setServiceTime(e.target.value)}
                            value={serviceTime}
                            className="border border-blue-gray-300 rounded-md w-full p-2"
                            min={currentDateTime.substring(11, 16)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleUpdateServiceDateTime}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default ServiceTimeModal