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
import { ServiceUrl } from "../../../../constants/constants";

export function EditProduct({ product }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [productName, setProductName] = useState(product.product_name || '');
  const [productDes, setProductDes] = useState(product.product_des || '');
  const [productImg, setProductImg] = useState(null);

  const handleImageChange = (e) => {
    setProductImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_des', productDes);
    formData.append('product_img', productImg);

    try {
      await axios.put(`${ServiceUrl}/categories/edit/${product.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProductName('');
      setProductDes('');
      setProductImg(null);
   
    } catch (error) {
      console.error('Error updating product', error);
      alert('Error updating product');
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit Product</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="Product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <Textarea label="Description" value={productDes} onChange={(e) => setProductDes(e.target.value)} />
            <label className="block text-sm font-medium text-gray-700">Product Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Update Product
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
