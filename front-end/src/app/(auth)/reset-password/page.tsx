"use client";
import React, { Suspense } from 'react';
import ResetPass from '@/components/auth/resetPass';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen font-bold'>
            <div className='w-[550px] bg-white rounded-xl px-10 shadow-md py-5'>
                <h1 className="text-4xl md:text-4xl lg:text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
                    Clash
                </h1>
                <h1 className='text-3xl font-bold'>Reset Password</h1>

                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPass />
                </Suspense>
            </div>
        </div>
    );
}

export default Page;
