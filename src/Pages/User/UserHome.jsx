import React, { useState } from 'react';
import HomepageNav from '../../components/user/HomepageNav';
import img from '../../assets/logo.png';
import ServiceCard from '../../components/user/service/ServiceCard';
import HomeFooter from '../../components/user/home/HomeFooter';
import CategoryCard from '../../components/user/service/CategoryCard';

function UserHome() {
  // const [service,setService] = useState([]);

  
  return (
    <>
      <div className="w-full h-96" style={{backgroundImage:'url(https://alltechappliance.com/wp-content/uploads/2019/02/Washing-Machine-being-Repaired-in-Portland-880x350.jpeg)',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      <div className='flex justify-between'>
        <img src={img} className='w-14 h-14 ms-4 mt-4 mLatestt-4 rounded-md cursor-pointer'  alt="" />
        <HomepageNav />
      </div>
      </div>
      <div className='w-10/12 ps-96'>
        <CategoryCard/>
      </div>
      <div className='text-center text-4xl font-sans font-semibold pt-8'>
        <h1>Newly added Services </h1>
      </div>
        <div className='pt-10 ps-8 pb-10' >
          <ServiceCard/>
        </div>
        <HomeFooter/>
    </>
  );
}

export default UserHome;
