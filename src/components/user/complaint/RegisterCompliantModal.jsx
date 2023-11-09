import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { BookingUrl } from "../../../constants/constants";

function RegisterComplaintModal({ user }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: "",
    subject: "",
    content: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post(`${BookingUrl}/register-complaint/`, { ...formData, user })
      .then((response) => {
        console.log("Complaint registered successfully.", response.data);
        setFormData({
          booking_id: "",
          subject: "",
          content: "",
        });
        setOpen(false);
      })
      .catch((error) => {
        toast(error.response.data.error)
        console.error("Error registering complaint:", error);
      });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Complaints
      </Button>

      <Dialog open={open} handler={handleOpen} size="sm" >
        <DialogHeader>Register your complaints</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <Input
            label="booking_id"
            name="booking_id"
            value={formData.booking_id}
            onChange={handleInput}
          />
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInput}
          />
          <Textarea
            label="Content"
            name="content"
            value={formData.content}
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
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default RegisterComplaintModal;
