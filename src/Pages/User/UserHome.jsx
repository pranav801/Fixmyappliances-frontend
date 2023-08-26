import React from 'react';
import HomepageNav from '../../components/user/HomepageNav';
import img from '../../assets/logo.png';

function UserHome() {
  return (
    <>
      <div className="w-full h-96" style={{backgroundImage:'url(https://alltechappliance.com/wp-content/uploads/2019/02/Washing-Machine-being-Repaired-in-Portland-880x350.jpeg)',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      <div className='flex justify-between'>
        <img src={img} className='w-14 ms-4 mt-4 rounded-md cursor-pointer'  alt="" />
        <HomepageNav />
      </div>
     
      </div>
    </>
  );
}

export default UserHome;
