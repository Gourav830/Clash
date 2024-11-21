'use client'
import React from 'react';

import { registerAction } from '@/actions/authActions';
import SubmitBtn from '@/components/common/submitBtn';
import { Input } from '@/components/ui/input';
import { useFormState } from 'react-dom';
import { Label } from '@/components/ui/label';
const Register = () => {
    const initalState = {
        status:0,
        message:"",
        errors:{},
    }
    const [state,formAction] = useFormState(registerAction,initalState);
    return (
        <div>
              <form action={formAction}>
                    <div className='mt-4'>
                        <Label htmlFor='Name' >Name</Label>
                        <Input id='Name' name='name' placeholder='Enter Your name' type='text'/>
                    
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='email' >Email</Label>
                        <Input id='email' name='email' placeholder='Enter Your Email' type='email' />
                    <span className='text-red-500'>{state.errors?.email}</span>
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='Password' >Password</Label>
                        <Input id='Password' name='password' placeholder='Enter Your Password' type='password' />
                  
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='ConfirmPassword' >ConfirmPassword</Label>
                        <Input id='ConfirmPassword' name='confirmpassword' placeholder='Confirm  Your Password' type='password' />
          
                    </div>

                    <div className='mt-4'>
                        <SubmitBtn />
                    </div>
                </form>
        </div>
    );
}

export default Register;
