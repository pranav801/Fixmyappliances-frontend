import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

function ServiceCard({ service }) {

  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/service/services/list');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className='flex justify-evenly' >
      {services.map((service) => (
        <Card className="mt-6 w-96 " key={service.id}>
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
        </Card>
      ))}
    </div>
  );
}

export default ServiceCard;
