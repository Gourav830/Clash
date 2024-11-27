'use client'

import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvtar from '../common/userAvtar';
import LogoutModal from '../auth/logoutModal';

const NavBar = () => {
    const [open,setOpen] = useState(false);
    return (
        <>
<LogoutModal open={open} setOpen={setOpen} />
        <nav className='flex justify-between items-center h-14 p-2 w-full'>
            
            <h1 className=" text-4xl font-extrabold bg-gradient-to-r from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <DropdownMenu>
  <DropdownMenuTrigger>< UserAvtar/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpen(true)} >Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


        </nav>
        </>
    
    );
}

export default NavBar;
