import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


function ProductCard() {
  const [products, setProducts] = useState([]);
  const { productCategory } = useParams()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/service/product/products/${productCategory}/`);
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
      {products.map((prod) => (

        <Link to={`/products/details/${prod.product_name}`} >

          <Card className="max-w-[18rem] overflow-hidden m-4">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
              <div style={{ width: '18rem', height: '18rem' }}>
                <img
                  src={'http://localhost:8000' + prod.product_img}
                  alt="ui/ux review check"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="blue-gray">
                {prod.product_name}
              </Typography>
              <Typography variant="lead" color="gray" className="mt-3 font-thin text-md">
                {prod.product_des}
              </Typography>
            </CardBody>
          </Card>

        </Link>

      ))}
    </>
  )
}

export default ProductCard