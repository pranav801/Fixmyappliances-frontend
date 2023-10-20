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

export function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [category_name, setCategoryName] = useState('');
  const [category_des, setCategoryDes] = useState('');
  const [category_img, setCategoryImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', category_name);
    formData.append('category_des', category_des);
    formData.append('category_img', category_img);

    try {
      await axios.post('http://localhost:8000/service/categories/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCategoryName('');
      setCategoryDes('');
      setCategoryImg(null);



    } catch (error) {
      console.error('Error adding category', error);
      alert('Error adding category');
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Category</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add New Category</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <Input label="Category name" onChange={(e) => setCategoryName(e.target.value)} />
              <Textarea label="Description" onChange={(e) => setCategoryDes(e.target.value)} />
              <Input label="Image" type="file" onChange={(e) => setCategoryImg(e.target.files[0])} />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Add Category
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
