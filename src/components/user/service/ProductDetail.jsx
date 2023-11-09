import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import AddressFill from '../booking/AddressFill';
import { getLocal } from '../../../Context/auth';
import { BaseUrl, ServiceUrl } from '../../../constants/constants';


function ProductDetail() {

    const [services, setServices] = useState([]);
    const { productService } = useParams()
    const navigate = useNavigate()
    const token = getLocal('userJwt');

    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (serviceId) => {
        if(token){
            setSelectedServiceId(serviceId);
            setOpen(!open);

        }else{
            navigate('/login')
        }
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${ServiceUrl}/product/detail/${productService}`);
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            {services.map((service) => (
                <Card className="w-full max-w-[30rem] flex-row h-auto m-10" key={service.id}>
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-2/5 shrink-0 rounded-r-none"
                    >
                        <img
                            src={service.service_img}
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                        
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            {service.service_name}
                        </Typography>

                        <Typography color="gray" className="mb-4 font-normal max-w-[16rem] ">
                            {service.service_des} 
                        </Typography>
                        <Typography variant="h6" color="black" className="mb-2 uppercase">
                            ₹ {service.service_charge} /-
                        </Typography>
                            <Button onClick={handleOpen} variant="text" className="flex items-center gap-2">
                                Book
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                            {token && <AddressFill open={open} handleOpen={handleOpen} serviceId = {service.id} />}
                        
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}

export default ProductDetail