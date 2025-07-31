
import React from 'react';
import HeroSection from '../components/base/heroSection';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
export default async  function app(){
  return (
    <div>
      <HeroSection/>
    </div>
  );
}

