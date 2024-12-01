import React from 'react';
import NavBar from '../../../../components/base/navBar';
import { fetchClase } from '@/fetch/clashFetch';
const Page = async ({params}:{params:{id:number}}) => {
    const clash :ClashType|null= await fetchClase(params.id)
    // console.log(clash);
    return (
        <div className='container'>
            <NavBar/>
            <div className="mt-4">
                <h1 className='text-2xl lg:text-4xl font-extrabold'>{clash.title}</h1>
                <p className='text-lg lg:text-xl font-semibold'>{clash?.description}</p>
            
            </div>

        </div>
    );
}

export default Page;
