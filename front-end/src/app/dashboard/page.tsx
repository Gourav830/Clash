import React from 'react';
import NavBar from '../../components/base/navBar';
import AddClash from '../../components/clash/addClash';
import { authOptions, customSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { fetchClases } from '../../fetch/clashFetch';
import ClashCard from '@/components/clash/clashCard';

const Page = async  () => {
    const session:customSession|null = await getServerSession(authOptions)
    const clashes:Array<ClashType> | [] = await fetchClases(session?.user?.token!);
    // console.log(clashes);
    return (
        <div className='container'>
            <NavBar />
            <div className='text-end mt-10' >
                <AddClash user={session?.user!}/>
            </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 '>
                  {clashes.length > 0 && clashes.map((item,index)=>
                <ClashCard key={index} clash={item} token={session?.user?.token!}/>
                
                )}

                </div>



        </div>
    );
}

export default Page;
