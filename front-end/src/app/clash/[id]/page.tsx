import React from 'react';
import { fetchClase } from '@/fetch/clashFetch';
import Clashing from '../../../components/clash/clashing';
import NavBar from '@/components/base/navBar';

const Page = async ({params}:{params:any}) => {
      const { id } = await params
    const clash :ClashType|null= await fetchClase(id)

    return (
        <div className='container'>
            <NavBar/>
            <div className="mt-4">
                <h1 className='text-2xl lg:text-4xl font-extrabold'>{clash?.title}</h1>
                <p className='text-lg lg:text-xl font-semibold'>{clash?.description}</p>
       

          </div>

          {clash && <Clashing clash={clash!}/>}

        </div>
    );
}

export default Page;
