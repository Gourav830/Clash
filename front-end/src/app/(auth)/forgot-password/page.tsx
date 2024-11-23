'use client'
import React from 'react';
import ForgetPass from '../../../components/auth/forgetPass';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen font-bold'>
            <div className='w-[550px] bg-white rounded-xl px-10 shadow-md py-5'>
            <h1 className=" text-4xl md:text-4xl lg:text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
            <h1 className='text-3xl font-bold '> Forget Password </h1>
            <p>It happens .Enter Email</p>
       
               
                  <ForgetPass/>
            
            </div>
            </div>
    );
}

export default Page;
