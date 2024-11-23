
import React from 'react';
import HeroSection from '../components/base/heroSection';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
export default async  function app(){
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session));
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <HeroSection/>
    </div>
  );
}

