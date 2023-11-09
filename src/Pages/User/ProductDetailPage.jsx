import React, { useEffect, useState } from 'react'
import ProductDetail from '../../components/user/service/ProductDetail'
import UserNavBar from '../../components/user/home/UserNavBar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewRatingCard from '../../components/user/review/ReviewRatingCard';
import ReviewModal from '../../components/user/review/ReviewModal';
import { decodedToken } from '../../Context/auth';

function ProductDetailPage() {
    const [service, setService] = useState({});
    const { productService } = useParams()
    const user = decodedToken('userJwt')
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
            <div className='flex justify-evenly scroll-pt-16'>

                <div className='justify-center'>
                    <h1 className='text-3xl ' >{service?.service_product?.product_name}</h1>
                    <img src={'http://localhost:8000' + service?.service_product?.product_img} alt="" className='w-96 pt-10 pb-20' />

                    <h3>{service?.service_product?.product_des}</h3>
                </div>
                <div className='ps-20'>
                    <ProductDetail />
                </div>

            </div>
            <div className='flex w-100 flex-row ps-40 pt-10 gap-7'>
                <div className='w-20 pt-14'>
                    {
                        service &&
                        <ReviewModal product={service?.service_product?.id} user={user?.id} />
                    }
                </div>

                <ReviewRatingCard productID={service?.service_product?.id} />

            </div>
        </div>
    )
}

export default ProductDetailPage