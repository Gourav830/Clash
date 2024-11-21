
import SubmitBtn from '@/components/common/submitBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen font-bold'>
            <div className='w-[550px] bg-white rounded-xl px-10 shadow-md py-5'>
            <h1 className=" text-4xl md:text-4xl lg:text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
            <h1 className='text-3xl font-bold '> Login </h1>
            <p>Welcome Back</p>

                <form action="">
                    <div className='mt-4'>
                        <Label htmlFor='email' >Email</Label>
                        <Input id='email' name='email' placeholder='Enter Your Email' type='email' />
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='Password' >Password</Label>
                        <Input id='Password' name='password' placeholder='Enter Your Password' type='password' />
                  <div className="text-right font-bold">  <Link href="forget-password text-right"> Forgot Password?</Link></div>
                    </div>

                    <div className='mt-4'>
                        <SubmitBtn />
                    </div>
                </form>
                    <p className='text-center mt-2'> Don't have an account? <Link href='/register'>Register</Link></p>
            
            </div>
            </div>
    );
}

export default Page;
