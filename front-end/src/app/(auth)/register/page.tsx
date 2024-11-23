
import Register from '@/components/auth/register';
import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen font-bold'>
            <div className='w-[550px] bg-white rounded-xl px-10 shadow-md py-5'>
            <h1 className=" text-4xl md:text-4xl lg:text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
            <h1 className='text-3xl font-bold '> Register </h1>
            <p>Welcome To Clash App</p>

              <Register/>
                    <p className='text-center mt-2'> Already have an account? <Link href='/login'>Login</Link></p>
            
            </div>
            </div>
    );
}

export default Page;
