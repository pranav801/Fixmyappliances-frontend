import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/user/service/ProductCard'
import UserNavBar from '../../components/user/home/UserNavBar'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ProductList() {
  const [products, setProducts] = useState([]);
  const { productCategory } = useParams()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/service/product/products/${productCategory}/`);
        setProducts(response.data[0]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
        <UserNavBar/>
        <div>
          <h1 className='text-3xl font-semibold text-blue-gray-700 ps-14 pt-10'>{products?.product_cat?.category_name} </h1>
        </div>
        <div className='w-full p-8 flex flex-row flex-wrap'>
        <ProductCard/>
        </div>
    </div>
  )
}

export default ProductList