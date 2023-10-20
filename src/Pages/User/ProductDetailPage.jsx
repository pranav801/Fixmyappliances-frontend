import React, { useEffect, useState } from 'react'
import ProductDetail from '../../components/user/service/ProductDetail'
import UserNavBar from '../../components/user/home/UserNavBar'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ProductDetailPage() {
    const [service, setService] = useState({});
    const {productService}=useParams()
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/service/product/detail/${productService}`);
              
                setService(response.data[0]);
                console.log('response', response.data[0]);

            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchServices();
    }, []);
    return (
        <div>
            <UserNavBar />
            <div className='flex justify-evenly pt-10'>

                <div className='justify-center'>
                    <h1 className='text-3xl ' >{service?.service_product?.product_name}</h1>
                    <img src={'http://localhost:8000' + service?.service_product?.product_img} alt="" className='w-96 pt-10 pb-20' />
                    
                    <h3>{service?.service_product?.product_des}</h3>
                </div>
                <div className='ps-20'>
                    <ProductDetail />
                </div>
                
            </div>
        </div>
    )
}

export default ProductDetailPage