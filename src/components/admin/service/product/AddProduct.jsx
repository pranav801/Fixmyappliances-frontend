import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react";
import axios from "axios";
import { ServiceUrl } from "../../../../constants/constants";

export function AddProduct() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [categories, setCategories] = useState([])
    const [product_name, setProductName] = useState('');
    const [product_cat, setProductCat] = useState('');
    const [product_des, setProductDes] = useState('');
    const [product_img, setProductImg] = useState(null)

    const callSetCategories = () => {
        axios.get('http://localhost:8000/service/category/').then((response) => {
            setCategories(response.data)
        }).catch((error) => {
            console.error('Error fetching categories:', error);
        })

    }
    useEffect(() => {
        callSetCategories()
    }, [])
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('product_name', product_name);
            formData.append('product_cat', product_cat);
            formData.append('product_des', product_des);
            formData.append('product_img', product_img);
            
            try {
                await axios.post(`${ServiceUrl}/product/create/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setProductName('');
                setProductCat('');
                setProductDes('');
                setProductImg(null);
                handleOpen()
                callSetCategories()

            } catch (error) {
                console.log('Error adding product', error);
                alert('Error adding product');
            }
        };

        return (
            <>
                <Button onClick={handleOpen}>Add Product</Button>
                <Dialog open={open} handler={handleOpen}>
                    <div className="flex items-center justify-between">
                        <DialogHeader>Add New Product</DialogHeader>
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
                                <div className="w-full">
                                    <Select onChange={(e) => { setProductCat(e) }} label="Select Category">
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <Option value={category.id} >{category.category_name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <Input label="Product name" onChange={(e) => setProductName(e.target.value)} />
                                <Textarea label="Description" onChange={(e) => setProductDes(e.target.value)} />
                                <Input label="Image" type="file" onChange={(e) => setProductImg(e.target.files[0])} />
                            </div>
                        </form>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="outlined" color="red" onClick={handleOpen}>
                            Close
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
