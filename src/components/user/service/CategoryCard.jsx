import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { Link } from 'react-router-dom';


function CategoryCard() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/service/category/');
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className='flex justify-evenly pt-5' >
      {category.map((cat) => (
        <Link to = {`/products/${cat.category_name}`} >
        <Card
          shadow={false}
          className="relative grid h-[6rem] w-full max-w-[16rem] items-end justify-center overflow-hidden text-center" key={cat.id}
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
            style={{ backgroundImage: `url(${cat.category_img})` }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </CardHeader>
          <CardBody className="relative py-14 px-6 md:px-12">
            <Typography
              variant="h3"
              color="white"
              className="mb-6 font-medium leading-[1.5] text-gray-500"
            >
              {cat.category_name}
            </Typography>


          </CardBody>
        </Card>
        </Link>
        
      ))}
    </div>
  )
}

export default CategoryCard;