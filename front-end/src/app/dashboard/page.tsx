import React from 'react';
import NavBar from '../../components/base/navBar';
import AddClash from '../../components/clash/addClash';
import { authOptions, customSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const Page = async  () => {
    const session:customSession|null = await getServerSession(authOptions)
    return (
        <div className='container'>
            <NavBar />
            <div className='text-end mt-10' >
                <AddClash user={session?.user!}/>
            </div>
        </div>
    );
}

export default Page;
