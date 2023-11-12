import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Rating,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { BookingUrl } from "../../../constants/constants";
import { toast } from "react-toastify";

function FeedBackModal({open, handleOpen, user, booking, employee}) {

  const [formData, setFormData] = useState({
    titile: "",
    content: "",
    rating: 0,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post(`${BookingUrl}/add-feedback/`, {...formData, user, booking, employee})
     .then((response) => {
       console.log('feedback added successfully', response.data);
       setFormData({
        titile: "",
        content: "",
       })
       setOpen(false);
     })
     .catch((error) => {
      toast.error('error adding feedback')
      console.log('error adding feedback', error);
     })
  }

  return (
    <>
      <Dialog open={open} size="xs">
        <DialogHeader>Add your Feedback</DialogHeader>
        <DialogBody className="flex flex-col gap-6">
          <Rating 
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
          />
          <Input
            label="Titile"
            name="titile"
            value={formData.titile}
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
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default FeedBackModal


