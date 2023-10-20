import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  
} from "@material-tailwind/react";
import axios from 'axios';
import { AddProduct } from './AddProduct';
import { EditProduct } from './EditProduct';



function ProductList() {
  const TABLE_HEAD = ["Image", "Product", "Category", "Description", "Edit", "Delete"];

  const [products, setProducts] = useState([]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/service/product/');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);




  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/service/product/delete/${id}/`);
      alert('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category', error);
      alert('Error deleting category');
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <AddProduct/>
          
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div> */}
      </CardHeader>
      <CardBody className=" px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-4">
                  <div>
                    <img src={product.product_img} style={{ maxWidth: '100px' }} />
                  </div>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray">
                    {product.product_name}
                  </Typography>
                </td>
                <td className="p-4 ">
                  <Typography variant="small" color="blue-gray">
                    {product.product_cat.category_name}

                  </Typography>
                </td>
                <td className="p-4 ">
                  <Typography variant="small" color="blue-gray">
                    {product.product_des}

                  </Typography>
                </td>

                <td className='p-4'>
                  <EditProduct product={product} />
                </td>

                <td className="p-4">
                  <Button variant="outlined" color="red" onClick={() => handleDelete(product.id)}>
                    Delete Product
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductList;