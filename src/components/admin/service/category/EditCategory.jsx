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

export function EditCategory({ category }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [categoryName, setCategoryName] = useState(category.category_name || '');
  const [categoryDes, setCategoryDes] = useState(category.category_des || '');
  const [categoryImg, setCategoryImg] = useState(null);

  const handleImageChange = (e) => {
    setCategoryImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('category_des', categoryDes);
    formData.append('category_img', categoryImg);

    try {
      await axios.put(`http://localhost:8000/service/categories/edit/${category.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCategoryName('');
      setCategoryDes('');
      setCategoryImg(null);
      setOpen(false); 
   
    } catch (error) {
      console.error('Error updating category', error);
      alert('Error updating category');
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit Category</Button>
      <Dialog open={open} handler={handleOpen}>
        <form  onSubmit={handleSubmit}>
        <DialogBody divider>
       
          <div className="grid gap-6">
            <Input label="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            <Textarea label="Description" value={categoryDes} onChange={(e) => setCategoryDes(e.target.value)} />
            <label className="block text-sm font-medium text-gray-700">Category Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green"  type="submit">
            Update Category
          </Button>
        </DialogFooter>
        </form>

      </Dialog>
    </>
  );
}
