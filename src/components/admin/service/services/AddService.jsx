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

export function AddService() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [products, setProducts] = useState([])
    const [service_name, setServiceName] = useState('');
    const [service_product, setServiceProduct] = useState('');
    const [service_des, setServiceDes] = useState('');
    const [service_img, setServiceImg] = useState(null)

    const callSetProducts = () => {
        axios.get('http://localhost:8000/service/product/').then((response) => {
            setProducts(response.data)
        }).catch((error) => {
            console.error('Error fetching products:', error);
        })

    }
    useEffect(() => {
        callSetProducts()
    }, [])
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('service_name', service_name);
            formData.append('service_product', service_product);
            formData.append('service_des', service_des);
            formData.append('service_img', service_img);
            console.log('name : ', service_name);
            console.log('cate : ', service_product);
            console.log('Des : ', service_des);
            console.log('img : ', service_img);
            try {
                await axios.post('http://localhost:8000/service/services/create/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setServiceName('');
                setServiceProduct('');
                setServiceDes('');
                setServiceImg(null);
                handleOpen()
                callSetProducts()
                
            } catch (error) {
                console.log('Error adding service', error);
                alert('Error adding service');
            }
        };

        return (
            <>
                <Button onClick={handleOpen}>Add Service</Button>
                <Dialog open={open} handler={handleOpen}>
                    <div className="flex items-center justify-between">
                        <DialogHeader>Add New Service</DialogHeader>
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
                                    <Select onChange={(e) => { setServiceProduct(e) }} label="Select Product">
                                        {
                                            products.map((product) => {
                                                return (
                                                    <Option value={product.id} >{product.product_name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <Input label="Service name" onChange={(e) => setServiceName(e.target.value)} />
                                <Textarea label="Description" onChange={(e) => setServiceDes(e.target.value)} />
                                <Input label="Image" type="file" onChange={(e) => setServiceImg(e.target.files[0])} />
                            </div>
                        </form>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="outlined" color="red" onClick={handleOpen}>
                            Close
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleSubmit}>
                            Add Service
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
