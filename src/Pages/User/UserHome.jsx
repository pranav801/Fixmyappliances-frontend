import React, { useEffect, useState } from 'react';
import HomepageNav from '../../components/user/HomepageNav';
import img from '../../assets/logo.png';
import ServiceCard from '../../components/user/service/ServiceCard';
import HomeFooter from '../../components/user/home/HomeFooter';
import CategoryCard from '../../components/user/service/CategoryCard';
import UserNavBar from '../../components/user/home/UserNavBar';
import image from '../../assets/banner-home.jpg';

function UserHome() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      if (scrollTop >= 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="w-full h-96 relative" style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        {isSticky ? (
          <div className="sticky top-0 z-50 w-full">
            <UserNavBar />
          </div>
        ) : (
          <div className='flex justify-between'>
            <img src={img} className='w-14 h-14 ms-4 mt-4 mLatestt-4 rounded-md cursor-pointer' alt="" />
            <HomepageNav />
          </div>
        )}
      </div>
      <div className='w-10/12 ps-96'>
        <CategoryCard />
      </div>
      <div className='text-center text-4xl font-sans font-semibold pt-8'>
        <h1>Newly added Services</h1>
      </div>
      <div className='pt-10 ps-8 pb-10'>
        <ServiceCard />
      </div>
      <HomeFooter />
    </>
  );
}

export default UserHome;