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
import { AddCategory } from './AddCategory';
import { EditCategory } from './EditCategory';




function ServiceCategory() {
  const TABLE_HEAD = ["Image", "Category", "Description", "Edit", "Delete"];

  const [categories, setCategories] = useState([]);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/service/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);




  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/service/categories/delete/${id}/`);
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
              Category list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all category
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            
          <AddCategory />
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
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="p-4">
                  <div>
                    <img src={category.category_img} style={{ maxWidth: '100px' }} />
                  </div>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray">
                    {category.category_name}
                  </Typography>
                </td>
                <td className="p-4 ">
                  <Typography variant="small" color="blue-gray">
                    {category.category_des}

                  </Typography>
                </td>

                <td className='p-4'>
                  <EditCategory category={category} />
                </td>

                <td className="p-4">
                  <Button variant="outlined" color="red" onClick={() => handleDelete(category.id)}>
                    Delete Category
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

export default ServiceCategory;