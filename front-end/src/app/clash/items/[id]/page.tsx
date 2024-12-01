import React from 'react';
import NavBar from '../../../../components/base/navBar';
const Page = ({params}:{params:{id:number}}) => {
    return (
        <div className='container'>
            <NavBar/>
            <div className="mt-4">
                <h1 className='text-2xl lg:text-4xl font-extrabold'>Class Title</h1>
                <p className='text-lg lg:text-xl font-semibold'>Clash Description</p>
            
            </div>

        </div>
    );
}

export default Page;
