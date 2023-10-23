import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { BaseUrl } from '../../../constants/constants';
import { Link } from 'react-router-dom';

function ServiceCard({ service }) {

  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/service/services/list');
        setServices(response.data);
        console.log('services: ',response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchServices();
  }, []);

  const lastFourServices = services.slice(-4);

  return (
    <div className='flex justify-evenly' >
      {lastFourServices.map((service) => (
        <Link to={`/products/details/${service.service_product.product_name}`} key={service.id}>
          <Card className="mt-6 w-96 " >
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={service.service_img}
              alt="service-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {service.service_name}
            </Typography>
            <Typography>
              {service.service_des}
            </Typography>
          </CardBody>
        </Card></Link>
      ))}
    </div>
  );
}

export default ServiceCard;
