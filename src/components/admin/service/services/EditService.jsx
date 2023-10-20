import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";

export function EditService({ service }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [serviceName, setServiceName] = useState(service.service_name || '');
  const [serviceDes, setServiceDes] = useState(service.service_des || '');
  const [serviceImg, setServiceImg] = useState(null);

  const handleImageChange = (e) => {
    setServiceImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('service_name', serviceName);
    formData.append('service_des', serviceDes);
    formData.append('service_img', serviceImg);

    try {
      await axios.put(`http://localhost:8000/service/categories/edit/${service.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setServiceName('');
      setServiceDes('');
      setServiceImg(null);
   
    } catch (error) {
      console.error('Error updating service', error);
      alert('Error updating service');
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit Service</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="Service name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
            <Textarea label="Description" value={serviceDes} onChange={(e) => setServiceDes(e.target.value)} />
            <label className="block text-sm font-medium text-gray-700">Service Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Update Service
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
